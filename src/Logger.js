module.exports = {
  info: (message) => {
    const now = Date(Date.now())
    console.log(`INFO: ${now} - ${message}`)
  },
  error: (error) => {
    const now = Date(Date.now())
    console.log(`ERROR: ${now} - ${error}`)
    console.log(error)
  }
}
