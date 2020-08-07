module.exports = {
  name: "goodbye",
  description: "say goodbye",
  execute: advancedFunction
}

function advancedFunction(message, args) {
  message.reply(`goodbye ${args[0]}`)
}
