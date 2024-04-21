import pino from 'pino'

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'trace',
  browser: { asObject: true },
})

export default logger
