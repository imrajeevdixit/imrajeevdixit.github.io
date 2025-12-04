// Client-side logger (for browser) - No Winston dependency
export const clientLogger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`ℹ️ [INFO] ${message}`, ...args)
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`❌ [ERROR] ${message}`, ...args)
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`⚠️ [WARN] ${message}`, ...args)
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`🐛 [DEBUG] ${message}`, ...args)
    }
  },
}

