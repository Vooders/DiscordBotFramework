const fs = require('fs')

function buildCommand(commandDirectory) {
  const commandFiles = fs.readdirSync(commandDirectory)
    .filter(file => file.endsWith('.js'));

  return commandFiles.reduce((obj, file) => {
    const command = require(`../${commandDirectory}${file}`)
    return obj = {
      ...obj,
      [command.name]: command
    }
  }, {})
}

module.exports = buildCommand
