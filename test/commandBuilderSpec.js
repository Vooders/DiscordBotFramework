const commandBuilder = require('../src/commandBuilder')

describe('commandBuilder', () => {
  it('should load the test command', () => {
    commands = commandBuilder('test/commands/')
  })

  it('should execute the test command', () => {
    commands = commandBuilder('test/commands/')
    commands.hello.execute().should.eql('hello')
  })

  it('should describe the test command', () => {
    commands = commandBuilder('test/commands/')
    commands.hello.description.should.eql('say hello')
  })
})
