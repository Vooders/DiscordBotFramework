const Discord = require("discord.js")

class Bot {
  constructor (config, commands, client = new Discord.Client(), logger = require('./Logger')) {
    this.client = client
    this.token = config.token
    this.prefix = config.prefix
    this.commands = commands
    this.logger = logger
  }

  start() {
    this.client.on('ready', this._handleReady)
    this.client.on('message', this._handleMessage)
    this.client.login(this.token)
  }

  stop() {
    this.logger.info("Stopping bot")
    this.client.destroy()
  }

  _handleReady() {
    this.logger.info('Bot ready')
    this.logger.info('Commands:')
    Object.keys(this.commands).forEach((commandKey) => {
      const command = this.commands[commandKey]
      this.logger.info(`${this.prefix}${command.name} - ${command.description}`)
    })
  }

  _handleMessage(message) {
    if(this._validCommand(message)) {
      const content = message.content
      const commandName = this._getCommandName(content)
      const args = this._getArgs(content)
      const command = this.commands[commandName]
      command.execute(message, args)
    }
  }

  _getCommandName(content) {
    return content.split(' ')[0].replace(this.prefix, '')
  }

  _validCommand(message) {
    return !message.author.bot && message.content.startsWith(this.prefix)
  }

  _getArgs(content) {
    return content.split(' ').slice(1)
  }
}

module.exports = Bot
