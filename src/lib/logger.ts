import pino from 'pino'
// import pinoPretty from 'pino-pretty'

const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    browser: { asObject: true },
  },
  // todo pino-pretty not compatible in browser
  // process.env.NODE_ENV !== 'production'
  //   ? pinoPretty({
  //       colorize: true,
  //     })
  //   : undefined,
)

export default logger
