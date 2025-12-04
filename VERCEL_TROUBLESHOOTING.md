# Vercel Deployment Troubleshooting

## Issue: 405 Method Not Allowed on `/api/ai-chat`

### Root Cause
Vercel's serverless functions require explicit runtime configuration and CORS headers for API routes.

### Solution Applied

#### 1. Updated `src/app/api/ai-chat/route.ts`

Added runtime configuration:
```typescript
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
```

Added OPTIONS handler for CORS preflight:
```typescript
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
```

Added CORS headers to POST response:
```typescript
return NextResponse.json(
  { response: text },
  {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  }
)
```

#### 2. Created `vercel.json`

Added function timeout and CORS configuration:
```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

### Deployment Steps

1. **Commit changes:**
```bash
git add .
git commit -m "fix: Add Vercel runtime config and CORS headers for API routes"
git push origin portfolio_v1
```

2. **Vercel will auto-deploy** (takes ~2 minutes)

3. **Verify deployment:**
   - Go to Vercel dashboard
   - Check deployment logs
   - Test the AI chatbot on your live site

### Verification Checklist

After deployment, verify:

- [ ] API route responds without 405 error
- [ ] AI chatbot opens successfully
- [ ] Can send messages and receive responses
- [ ] No CORS errors in browser console
- [ ] Function logs show successful execution

### Check Environment Variables

Make sure `GEMINI_API_KEY` is set in Vercel:

```bash
# Via CLI
vercel env ls

# Via Dashboard
# Go to: Project Settings → Environment Variables
```

If missing, add it:

```bash
vercel env add GEMINI_API_KEY
# Select: Production, Preview, Development
```

### View Logs

```bash
# Get latest deployment URL
vercel ls

# View function logs
vercel logs [deployment-url]

# Follow logs in real-time
vercel logs [deployment-url] -f
```

### Test API Endpoint Directly

```bash
# Test with curl
curl -X POST https://imrajeevdixit-github-io.vercel.app/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Rajeev'\''s experience?"}'
```

Expected response:
```json
{
  "response": "Rajeev Dixit is an accomplished Cloud Architect..."
}
```

### Common Issues & Solutions

#### Issue: Still getting 405 after deployment

**Solution:**
1. Clear browser cache
2. Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Wait 2-3 minutes for CDN cache to clear
4. Try in incognito/private window

#### Issue: 500 Internal Server Error

**Cause:** Missing or invalid `GEMINI_API_KEY`

**Solution:**
```bash
# Check if environment variable is set
vercel env ls

# If missing, add it
vercel env add GEMINI_API_KEY

# Redeploy
vercel --prod
```

#### Issue: Function timeout

**Cause:** Gemini API taking too long to respond

**Solution:**
- Already configured 30s timeout in `vercel.json`
- If still timing out, check Gemini API status
- Consider adding retry logic or fallback responses

#### Issue: CORS errors in browser console

**Cause:** Missing CORS headers

**Solution:**
- Already added in the fix above
- Verify `vercel.json` is committed
- Redeploy to apply changes

### Debug Mode

Enable verbose logging temporarily:

```typescript
// In route.ts
export async function POST(request: NextRequest) {
  console.log('API route called')
  console.log('Has API key:', !!process.env.GEMINI_API_KEY)
  
  try {
    const { message } = await request.json()
    console.log('Received message:', message)
    
    // ... rest of code
    
    console.log('Generated response:', text.substring(0, 100))
    return NextResponse.json(...)
  } catch (error) {
    console.error('Detailed error:', error)
    // ...
  }
}
```

View logs in Vercel dashboard or CLI.

### Performance Monitoring

Check function performance:
1. Go to Vercel Dashboard → Your Project
2. Click "Functions" tab
3. View execution time, invocations, errors
4. Optimize if needed

### Rollback if Needed

If something goes wrong:

```bash
# List recent deployments
vercel ls

# Promote a previous deployment to production
vercel promote [deployment-url]
```

### Next Steps

Once working:
1. ✅ Test all chatbot features
2. ✅ Monitor function usage (stay within free tier)
3. ✅ Set up error alerting (optional)
4. ✅ Add rate limiting (optional, see VERCEL_DEPLOYMENT.md)

### Support Resources

- [Vercel Functions Docs](https://vercel.com/docs/functions)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Support](https://vercel.com/support)

---

**Status:** Fixed ✅

The API route should now work correctly on Vercel after pushing these changes.

