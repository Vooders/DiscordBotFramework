const fs = require('fs')

describe('commands', () => {
  const commandFiles = fs.readdirSync('commands')
    .filter(file => file.endsWith('.js'));

  commandFiles.forEach(commandFile => {
    describe(commandFile, () => {
      const command = require(`../commands/${commandFile}`)

      it('should only have the required keys', () => {
        const expectedKeys = ['name', 'description', 'execute']
        const keys = Object.keys(command)
        keys.should.eql(expectedKeys)
      })

      it('should have a name which is a string', () => {
        command.name.should.be.a('string')
      })

      it('should have a string description', () => {
        command.description.should.be.a('string')
      })

      it('should have an execute function', () => {
        command.execute.should.be.an.instanceof(Function)
      })
    })
  })
})
