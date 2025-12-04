import winston from 'winston'

// Create Winston logger for server-side only (API routes)
// This file should NEVER be imported in client components
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`
      if (Object.keys(meta).length > 0) {
        msg += ` ${JSON.stringify(meta)}`
      }
      return msg
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
})

// Add pretty formatting for development
if (process.env.NODE_ENV !== 'production') {
  logger.format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let msg = `${timestamp} ${level}: ${message}`
      if (Object.keys(meta).length > 0) {
        msg += `\n${JSON.stringify(meta, null, 2)}`
      }
      return msg
    })
  )
}

