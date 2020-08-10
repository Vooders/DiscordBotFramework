const Bot = require('./src/Bot')
const config = require('./config.json')
const logger = require('./src/Logger')
const commandBuilder = require('./src/commandBuilder')

const commands = commandBuilder('commands/')
const bot = new Bot(config, commands)

logger.info("Starting bot")

try {
  bot.start()
} catch(error) {
  console.log(error)
}
