# Logging Setup

This project uses **Winston** for structured logging in server-side code (API routes) and a custom client logger for browser-side logging.

## Logger Types

### 1. Server-Side Logger (Winston)

Used in API routes and server-side code.

**Location:** `src/lib/logger.ts`

**Usage:**

```typescript
import { logger } from '@/lib/logger'

// Info level
logger.info('User message received', { 
  requestId: 'req-123',
  messageLength: 100 
})

// Warning level
logger.warn('Validation failed', { requestId: 'req-123' })

// Error level
logger.error('API call failed', { 
  requestId: 'req-123',
  errorMessage: 'Network timeout',
  errorStack: error.stack 
})
```

### 2. Client-Side Logger

Used in React components and browser code.

**Location:** `src/lib/logger.ts`

**Usage:**

```typescript
import { clientLogger } from '@/lib/logger'

// Info level
clientLogger.info('[Component] Action performed', { 
  data: 'example',
  timestamp: Date.now() 
})

// Error level
clientLogger.error('[Component] Error occurred', { 
  errorMessage: error.message 
})

// Warning level
clientLogger.warn('[Component] Warning', { 
  details: 'something' 
})

// Debug (only in development)
clientLogger.debug('[Component] Debug info', { 
  state: currentState 
})
```

## Log Levels

Winston uses standard log levels:
- `error` (0): Errors and exceptions
- `warn` (1): Warning messages
- `info` (2): Informational messages (default)
- `debug` (3): Debug messages (development only)

## Configuration

### Environment Variables

Set log level via environment variable:

```bash
# In .env.local
LOG_LEVEL=info  # options: error, warn, info, debug
```

### Production vs Development

**Production:**
- JSON formatted logs
- Suitable for log aggregation services
- INFO level by default

**Development:**
- Colorized, pretty-printed logs
- All levels enabled
- Stack traces included

## Viewing Logs in Vercel

### Real-time Logs

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs in real-time
vercel logs --follow

# View logs for specific deployment
vercel logs [deployment-url] --follow
```

### Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click "Logs" tab
4. Filter by:
   - Time range
   - Log level (info, error, warn)
   - Search terms

### Log Structure in Vercel

All API logs include:
- **requestId**: Unique identifier for each request
- **timestamps**: When events occurred
- **durations**: How long operations took
- **metadata**: Structured contextual data

Example log entry:
```json
{
  "timestamp": "2024-12-04 10:30:45",
  "level": "info",
  "message": "Request completed successfully",
  "requestId": "req-1701684645000-abc123",
  "totalDuration": "2345ms",
  "geminiDuration": "2100ms"
}
```

## Key Logging Points

### API Route (`/api/ai-chat`)

1. ✅ **Request received** - Initial request logging
2. ✅ **User message** - Message content and length
3. ✅ **Validation** - Empty message checks
4. ✅ **Configuration** - API key validation
5. ✅ **Model initialization** - Gemini setup
6. ✅ **Prompt sent** - Prompt details
7. ✅ **Response received** - Response metadata
8. ✅ **Request completed** - Total duration
9. ✅ **Errors** - Detailed error information

### Client Component (`ai-workbench-floater`)

1. ✅ **Chatbot opened** - User opens chat
2. ✅ **Message sent** - User submits message
3. ✅ **API call** - Fetch initiated
4. ✅ **Response received** - API response status
5. ✅ **Response parsed** - Data extraction
6. ✅ **Errors** - Client-side errors
7. ✅ **Request complete** - End of cycle

## Debugging with Logs

### Find specific request

Use the request ID to trace a single request through the entire flow:

```bash
# In Vercel logs
vercel logs --follow | grep "req-1701684645000-abc123"
```

### Monitor performance

Track slow requests:

```bash
# Filter logs showing duration > 3000ms
vercel logs | grep "totalDuration.*[3-9][0-9][0-9][0-9]ms"
```

### Track errors

Monitor error patterns:

```bash
# View only error logs
vercel logs | grep "ERROR"
```

## Log Rotation & Retention

**Vercel:**
- Logs retained for 7 days on Free tier
- Logs retained for 30 days on Pro tier
- No log rotation needed (managed by Vercel)

**Local Development:**
- Logs output to console only
- No persistence by default

## Best Practices

### ✅ DO:
- Include requestId in all related logs
- Log at appropriate levels (info for normal flow, error for failures)
- Include structured metadata for searchability
- Log timing information for performance tracking
- Sanitize sensitive data before logging

### ❌ DON'T:
- Log sensitive data (API keys, passwords, PII)
- Log entire large objects (use previews/summaries)
- Use console.log in production code
- Log excessively (impacts performance and costs)
- Log without context (always include relevant metadata)

## Troubleshooting

### Logs not appearing in Vercel

1. Check deployment status
2. Verify function is being invoked
3. Check log level (may be filtered)
4. Verify Winston is properly initialized

### Cannot see Winston logs locally

Winston should output to console. If not visible:
- Check NODE_ENV setting
- Verify logger is imported correctly
- Check console transport is enabled

### Client logs not showing

Client logs use browser console:
- Open browser DevTools (F12)
- Check Console tab
- Verify clientLogger is imported
- Check if production mode is hiding debug logs

## Future Enhancements

Consider adding:
- **Log aggregation** (Datadog, LogRocket, Sentry)
- **Structured tracing** (OpenTelemetry)
- **Custom metrics** (response times, error rates)
- **Alert rules** (for critical errors)
- **Log sampling** (reduce volume in high traffic)

## Related Files

- `src/lib/logger.ts` - Logger configuration
- `src/app/api/ai-chat/route.ts` - API route with Winston
- `src/components/ai-workbench-floater.tsx` - Client component with clientLogger

## Support

For issues with logging:
1. Check Vercel function logs
2. Review this documentation
3. Test locally with LOG_LEVEL=debug
4. Check Winston documentation: https://github.com/winstonjs/winston

---

**Last Updated:** December 4, 2024

