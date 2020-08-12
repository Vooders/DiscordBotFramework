class Logger {
  info(message) {
    this._log('INFO', message)
  }

  error(error) {
    this._log('ERROR', error)
    console.log(error)
  }

  _log(level, message) {
    console.log(`${level}: ${this._timeNow()} - ${message}`)
  }

  _timeNow() {
    const now = new Date(Date.now())
    return `${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }
}

module.exports = Logger
