# A Basic Discord Bot

A simple Discord bot framework which can be configured with commands

## Install
```sh
npm install @vooders/discord-bot-framework
```

## Usage
```js
const Bot = require('@vooders/discord-bot-framework').Bot

const config = {
  "prefix": "!!",
  "token": "discord-bot-token"
}

const bot = new Bot(config)

try {
  bot.start()
} catch(error) {
  console.log(error)
}
```

## Creating commands
Commands should be wrote as individual files in a directory at the root of the project. The library expects this directory to be named `commands` this can be overridden by adding `commandDirectory` to the config.

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

A command is expressed as a JSON object with the following keys
* name - The name of the command this will be the word typed to call the command.
* description - Some text that explains what the command does.
* execute - A function to execute when the comand is called.

## Configuration
The command prefix and Discord bot token must be supplied to any bot via configuration in the following format.

```
{
  "prefix": "!!",
  "token": "discord-bot-token",
  "commandDirectory?": "optional override of command dir"
}
```
