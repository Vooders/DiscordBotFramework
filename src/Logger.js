module.exports = {
  info: (message) => {
    const now = Date(Date.now())
    console.log(`INFO: ${now} - ${message}`)
  }
}
