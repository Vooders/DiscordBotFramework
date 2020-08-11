const fs = require('fs')
const path = require('path')

function buildCommand(commandDirectory) {
  const commandFiles = fs.readdirSync(commandDirectory)
    .filter(file => file.endsWith('.js'));

  return commandFiles.reduce((obj, file) => {
    const commandPath = path.join(process.cwd(), commandDirectory, file)
    const command = require(commandPath)
    return obj = {
      ...obj,
      [command.name]: command
    }
  }, {})
}

module.exports = buildCommand
