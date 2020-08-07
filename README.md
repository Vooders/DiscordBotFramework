# A Basic Discord Bot

_A sample stub project for javascript._

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

## Development

Run the tests:

```sh
npm install
npm test
```
_tests need to be calncelled with `ctrl+c` for some reason_

_I'll fix this one day_
