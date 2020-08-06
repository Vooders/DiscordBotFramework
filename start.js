const Discord = require('discord.js')
const Bot = require('./src/Bot')

const commandBuilder = require('./src/commandBuilder')
const client = new Discord.Client()

console.log('Starting Bot')

chatCommands = commandBuilder('/commands/chatBot/')

chatBot = new Bot(client, commands)
