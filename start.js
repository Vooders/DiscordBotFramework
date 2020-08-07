const Bot = require('./src/Bot')
const config = require('./config.json')
const commandBuilder = require('./src/commandBuilder')

const commands = commandBuilder('commands/')
const bot = new Bot(config, commands)

try {
  bot.start()
} catch(error) {
  console.log(error)
} finally {
  bot.stop()
}
