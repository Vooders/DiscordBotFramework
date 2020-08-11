const Discord = require('discord.js')
const StubClient = require('./StubClient')
const Gen = require('verify-it').Gen
const td = require('testdouble')
const Bot = require('../src/Bot')

describe('Bot', () => {
  const config = {
    token: Gen.string(),
    prefix: '$$'
  }

  const fakeLogger = {
    info: () => null
  }

  const testCommands = 'test/commands/'

  describe('stop()', () => {
    verify.it('should destroy the client', () => {
      const mockClient = td.object(StubClient)
      const bot = new Bot(config, 'test/commands/', mockClient)
      bot.stop()
      td.verify(mockClient.destroy())
    })

    verify.it('should log "Stopping bot"', () => {
      const mockClient = td.object(StubClient)
      const mockLogger = td.object(fakeLogger)
      const bot = new Bot(config, 'test/commands/', mockClient, mockLogger)
      bot.stop()
      td.verify(mockLogger.info('Stopping bot'))
    })
  })

  describe('start()', () => {
    verify.it('should set a handler for ready event', () => {
      const mockClient = td.object(StubClient)
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      td.verify(mockClient.on('ready', td.matchers.isA(Function)))
      mockClient.destroy()
    })

    verify.it('should set a handler for message event', () => {
      const mockClient = td.object(StubClient)
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      td.verify(mockClient.on('message', td.matchers.isA(Function)))
    })

    verify.it('should call login with the token from config', () => {
      const mockClient = td.object(StubClient)
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      td.verify(mockClient.login(config.token))
    })
  })

  describe('actions', () => {
    describe('getArgs', () => {
      verify.it('should return an array', () => {
        const bot = new Bot(config, testCommands, StubClient)
        bot.actions.getArgs('').should.be.an('array')
      })
  
      verify.it('should return all words after the command', Gen.array(Gen.word, 5), (args) => {
        const content = `$$someCommand ${args.join(' ')}`
        const bot = new Bot(config, testCommands, StubClient)
        bot.actions.getArgs(content).should.eql(args)
      })
  
      verify.it('should return and empty array if no args', () => {
        const content = `$$someCommand`
        const bot = new Bot(config, testCommands, StubClient)
        bot.actions.getArgs(content).should.eql([])
      })
    })

    describe('validCommand', () => {
      verify.it('should return true if the author is not a bot and command starts with prefix', () => {
        const bot = new Bot(config, testCommands, StubClient)
        const fakeMessage = generateMessage(`${config.prefix}validCommand`)
        bot.actions.validCommand(fakeMessage).should.eql(true)
      })
  
      verify.it('should return false if the author is a bot', () => {
        const bot = new Bot(config, testCommands, StubClient)
        const fakeMessage = generateMessage(`${config.prefix}validCommand`)
        fakeMessage.author.bot = true
        bot.actions.validCommand(fakeMessage).should.eql(false)
      })
  
      verify.it('should return false if message does not start with prefix', () => {
        const bot = new Bot(config, testCommands, StubClient)
        const fakeMessage = generateMessage('invalidCommand')
        bot.actions.validCommand(fakeMessage).should.eql(false)
      })
    })

    describe('getCommandName', () => {
      verify.it('should return the first word of the message without the prefix', Gen.array(Gen.word, 5), (args) => {
        const commandName = 'bob'
        const content = `${config.prefix}${commandName} ${args.join(' ')}`
        const bot = new Bot(config, testCommands, StubClient)
        bot.actions.getCommandName(content).should.eql(commandName)
      })
    })
  })

  describe('handleReady', () => {
    verify.it('should log "Bot ready" on start up', () => {
      const mockLogger = td.object(fakeLogger)
      const bot = new Bot(config, testCommands, StubClient, mockLogger)
      bot.getHandleReady(mockLogger, bot.actions)()
      td.verify(mockLogger.info('Bot ready'))
    })
  })

  describe('handleMessage', () => {
    verify.it('should call the correct command', () => {
      const mockCommands = td.object(testCommands)
      const bot = new Bot(config, mockCommands, StubClient)
      const message = generateMessage(`${config.prefix}hello`)
      bot.getHandleMessage(fakeLogger, bot.actions)(message)
      td.verify(mockCommands.hello.execute(message, []))
    })
  })
})

function generateMessage(content) {
  return {
    author: {
      bot: false
    },
    content
  }
}
