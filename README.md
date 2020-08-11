# A Basic Discord Bot

A simple Discord bot framework which can be configured with commands

## Install
```sh
npm install @vooders/discord-bot-framework
```

## Usage
```js
const BotFramework = require('@vooders/discord-bot-framework')

const config = {
  "prefix": "!!",
  "token": "discord-bot-token"
}

const commands = BotFramework.commandBuilder('commands/')
const bot = new BotFramework.Bot(config, commands)

try {
  bot.start()
} catch(error) {
  console.log(error)
}
```

## Creating commands
Commands can be wrote as individual files or as a single object

The `execute` function will be called with the `message` object and an array of strings containing the arguments.

Individual command file
```js
module.exports = {
  name: "hello",
  description: "say hello",
  execute: (message, args) => {
    message.channel.send(`hello there ${args[0]}`)
  }
}
```

Multiple commands per file
```js
module.exports = {
  "hello": {
    name: "hello",
    description: "say hello",
    execute: (message, args) => {
      message.channel.send(`hello there ${args[0]}`)
    }
  },
  "goodbye": {
    name: "goodbye",
    description: "say goodbye",
    execute: (message, args) => {
      message.channel.send(`goodbye ${args[0]}`)
    }
  }
}
```

A command is expressed as a JSON object with the following keys
* name - The name of the command this will be the word typed to call the command.
* description - Some text that explains what the command does.
* execute - A function to execute when the comand is called.

## Command Builder
If your commands are defined in separate files you must combine them into a single object using the commandBuilder.
```js
const commandBuilder = require('@vooders/discord-bot-framework').commandBuilder

const commands = commandBuilder('path/to/commands')
```

## Configuration
The command prefix and Discord bot token must be supplied to any bot via configuration in the following format.

```
{
  "prefix": "!!",
  "token": "discord-bot-token"
}
```
