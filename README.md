# A Basic Discord Bot

## Install
* Clone the repo
* Install deplendencies run `npm install`
* Copy `config-template.json` and rename to `config.json`
* Add your bot token to the token field of `config.json`

## Run
```sh
npm start
```

## Stop
```
ctrl + C
```

## Adding commands
Add commands to the `commands` directory

Commands should be in the following format
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

#### name
The name of the command this will be the word typed to call the command.

#### description
Some text that explains what the command does.

#### execute
A function to execute when the comand is called.

## Development

Run the tests:

```sh
npm install
npm test
```
_tests need to be cancelled with `ctrl+c` for some reason_

_I'll fix this one day_
