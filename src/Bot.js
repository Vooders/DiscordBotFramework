const Discord = require("discord.js")
const Logger = require('./Logger')
const commandBuilder = require('./commandBuilder')

class Bot {
  constructor (config, client = new Discord.Client(), logger = new Logger()) {
    const commandDirName = config.commandDirectory || 'commands'
    this.client = client
    this.token = config.token
    this.prefix = config.prefix
    this.commands = commandBuilder(commandDirName)
    this.logger = logger
  }

  async start() {
    this.client.on('ready', this.getHandleReady(this.logger, this.actions))
    this.client.on('message', this.getHandleMessage(this.logger, this.actions))
    try {
      await this.client.login(this.token)
    } catch(error) {
      this.logger.error(error)
    }
  }

  stop() {
    this.logger.info("Stopping bot")
    this.client.destroy()
  }

  getHandleReady(logger, actions) {
    return () => {
      logger.info('Bot ready')
    }
  }

  getHandleMessage(logger, actions) {
    return (message) => {
      if(actions.validCommand(message)) {
        logger.info(`${message.author.username} used command ${message.content}`)
        const content = message.content
        const commandName = actions.getCommandName(content)
        if (commandName === 'commands') {
          message.reply(actions.getCommands())
        } else {
          const args = actions.getArgs(content)
          const command = this.commands[commandName]
          if (command) {
            command.execute(message, args)
          } else {
            message.reply(`Unknown command ${this.prefix}${commandName}\nType ${this.prefix}commands to see available commands`)
          }
        }
      }
    }
  }

  actions = {
    getCommandName: (content) => {
      return content.split(' ')[0].replace(this.prefix, '')
    },
    validCommand: (message) => {
      return !message.author.bot && message.content.startsWith(this.prefix)
    },
    getArgs: (content) => {
      return content.split(' ').slice(1)
    },
    getCommands: () => {
      return Object.keys(this.commands).reduce((message, commandKey) => {
        const command = this.commands[commandKey]
        return message += `    ${this.prefix}${command.name} - ${command.description}\n`
      }, 'Commands:\n')
    }
  }
}

module.exports = Bot
