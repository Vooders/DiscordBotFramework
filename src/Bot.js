const Discord = require("discord.js")

class Bot {
  constructor (config, commands, client = new Discord.Client(), logger) {
    this.client = client
    this.token = config.token
    this.prefix = config.prefix
    this.commands = commands
    this.logger = logger || require('./Logger')
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
        const content = message.content
        const commandName = actions.getCommandName(content)
        const args = actions.getArgs(content)
        const command = this.commands[commandName]
        command.execute(message, args)
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
