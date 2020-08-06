const Discord = require('discord.js')
const Gen = require('verify-it').Gen
const td = require('testdouble')
const commandBuilder = require('../src/commandBuilder')
const Bot = require('../src/Bot')

describe('Bot', () => {
  const config = {
    token: Gen.string(),
    prefix: '$$'
  }

  const testCommands = commandBuilder('test/commands/')

  describe('stop()', () => {
    verify.it('should destroy the client', () => {
      const mockClient = td.object(new Discord.Client())
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      bot.stop()
      td.verify(mockClient.destroy())
    })
  })

  describe('start()', () => {
    verify.it('should set a handler for ready event', () => {
      const mockClient = td.object(new Discord.Client())
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      bot.stop()
      td.verify(mockClient.on('ready', td.matchers.isA(Function)))
    })

    verify.it('should set a handler for message event', () => {
      const mockClient = td.object(new Discord.Client())
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      bot.stop()
      td.verify(mockClient.on('message', td.matchers.isA(Function)))
    })

    verify.it('should call login with the token from config', () => {
      const mockClient = td.object(new Discord.Client())
      const bot = new Bot(config, testCommands, mockClient)
      bot.start()
      bot.stop()
      td.verify(mockClient.login(config.token))
    })
  })

  describe('_validCommand', () => {
    verify.it('should return true if the author is not a bot and command starts with prefix', () => {
      const bot = new Bot(config, testCommands)
      const fakeMessage = generateMessage(`${config.prefix}validCommand`)
      bot._validCommand(fakeMessage).should.eql(true)
    })

    verify.it('should return false if the author is a bot', () => {
      const bot = new Bot(config, testCommands)
      const fakeMessage = generateMessage(`${config.prefix}validCommand`)
      fakeMessage.author.bot = true
      bot._validCommand(fakeMessage).should.eql(false)
    })

    verify.it('should return false if message does not start with prefix', () => {
      const bot = new Bot(config, testCommands)
      const fakeMessage = generateMessage('invalidCommand')
      bot._validCommand(fakeMessage).should.eql(false)
    })
  })

  describe('_getArgs', () => {
    verify.it('should return an array', () => {
      const bot = new Bot(config, testCommands)
      bot._getArgs('').should.be.an('array')
    })

    verify.it('should return all words after the command', Gen.array(Gen.word, 5), (args) => {
      const content = `$$someCommand ${args.join(' ')}`
      const bot = new Bot(config, testCommands)
      bot._getArgs(content).should.eql(args)
    })

    verify.it('should return and empty array if no args', () => {
      const content = `$$someCommand`
      const bot = new Bot(config, testCommands)
      bot._getArgs(content).should.eql([])
    })
  })

  describe('_handleMessage', () => {
    verify.it('should call the correct command', () => {
      const mockCommands = td.object(testCommands)
      const bot = new Bot(config, mockCommands)
      const message = generateMessage(`${config.prefix}hello`)
      bot._handleMessage(message)
      td.verify(mockCommands.hello.execute(message, []))
    })
  })

  describe('_getCommandName', () => {
    verify.it('should return the first word of the message without the prefix', Gen.array(Gen.word, 5), (args) => {
      const commandName = 'bob'
      const content = `${config.prefix}${commandName} ${args.join(' ')}`
      const bot = new Bot(config, testCommands)
      bot._getCommandName(content).should.eql(commandName)
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
