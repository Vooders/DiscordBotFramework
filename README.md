# A Basic Discord Bot

A simple Discord bot framework which can be configured with commands

## Install
```sh
npm install @vooders/discord-bot-framework
```

## Usage
```js

```

## Creating commands
Create your commands in individual files in the following format
```js
// hello.js
module.exports = {
  name: "hello",
  description: "say hello",
  execute: (message, args) => {
    message.channel.send(`hello there ${args[0]}`)
  }
}
```

## Configuration
The command prefix and Discord bot token must be supplied to any bot via configuration in the following format.

```
{
  "prefix": "!!",
  "token": "discord-bot-token"
}
```

#### name
The name of the command this will be the word typed to call the command.

#### description
Some text that explains what the command does.

#### execute
A function to execute when the comand is called.
