const commandBuilder = require('../src/commandBuilder')

describe('commandBuilder', () => {
  describe('the test command', () => {
    it('should load', () => {
      commands = commandBuilder('test/commands/')
    })
  
    it('should execute', () => {
      commands = commandBuilder('test/commands/')
      commands.hello.execute().should.eql('hello')
    })
  
    it('should have the correct description', () => {
      commands = commandBuilder('test/commands/')
      commands.hello.description.should.eql('say hello')
    })
  
    it('should have the correct name', () => {
      commands = commandBuilder('test/commands/')
      commands.hello.name.should.eql('hello')
    })
  })
})
