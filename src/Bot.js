class Bot {
  constructor (client, commands) {
    this.client = client
    this.commands = commands
  }

  start() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`)
    })

    this.client.on('message', message => {
      const command = this.commands[message]
      if (command) {
        command.execute(message)
      } else {
        message.reply(`Unknown command ${message}`)
      }
    })

    this.client.login('token')
  }
}

module.exports = Bot
