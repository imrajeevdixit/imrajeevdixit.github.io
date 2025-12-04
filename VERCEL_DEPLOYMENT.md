# Deploying Portfolio to Vercel (Free & Easy)

## 🎯 Why Vercel?

- ✅ **$0/month** - Completely free for personal projects
- ✅ **Zero configuration** - Built specifically for Next.js
- ✅ **Supports API routes** - Your AI chatbot works out of the box
- ✅ **Automatic SSL** - HTTPS enabled by default
- ✅ **Global CDN** - Lightning-fast worldwide
- ✅ **Git integration** - Auto-deploy on push
- ✅ **Preview deployments** - Test before going live
- ✅ **No credit card required** - For hobby tier

## 🚀 Deployment Options

### Option 1: Deploy via Vercel Dashboard (Easiest - 3 minutes)

#### Step 1: Sign up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

#### Step 2: Import Your Repository

1. Click "Add New Project"
2. Select "Import Git Repository"
3. Find and select `imrajeevdixit/imrajeevdixit.github.io`
4. Click "Import"

#### Step 3: Configure Project

Vercel will auto-detect Next.js settings. You just need to:

1. **Framework Preset**: Next.js (auto-detected ✓)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (auto-detected ✓)
4. **Output Directory**: `.next` (auto-detected ✓)

#### Step 4: Add Environment Variables

Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | Your Gemini API key |

**Important:** Select "Production", "Preview", and "Development" for all environments.

#### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build
3. 🎉 Your site is live!

You'll get a URL like: `https://your-portfolio.vercel.app`

### Option 2: Deploy via Vercel CLI (Developer-Friendly)

#### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication.

#### Step 3: Deploy

```bash
# Navigate to your project
cd /Users/rajeev.dixit@clearroute.io/Documents/forge/imrajeevdixit.github.io

# Deploy (first time)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your username
# - Link to existing project? No
# - What's your project's name? imrajeevdixit-portfolio
# - In which directory is your code located? ./
# - Want to override settings? No
```

#### Step 4: Add Environment Variable

```bash
# Add your Gemini API key
vercel env add GEMINI_API_KEY

# When prompted:
# - Value: [paste your Gemini API key]
# - Add to which environments? Select all (Production, Preview, Development)
```

#### Step 5: Deploy to Production

```bash
vercel --prod
```

## 🌐 Custom Domain Setup

### Option 1: Use Vercel Subdomain (Free)

Your site is automatically available at:
- `https://your-portfolio.vercel.app`
- `https://your-portfolio-git-main.vercel.app`

### Option 2: Add Custom Domain (Also Free!)

#### Using Your GitHub Pages Domain

If you want to use `imrajeevdixit.github.io`:

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add domain: `imrajeevdixit.github.io`
   - Vercel will provide DNS records

2. **Update GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Set "Source" to "None" (disable GitHub Pages)

3. **Add CNAME Record:**
   - If you have a custom domain registered, add a CNAME:
     - Name: `@` (or subdomain)
     - Value: `cname.vercel-dns.com`

#### Using a Custom Domain (e.g., rajeevdixit.com)

1. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - Click "Add"
   - Enter your domain: `rajeevdixit.com`

2. **Update DNS at Your Registrar:**

   **For root domain (rajeevdixit.com):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS Propagation** (5-60 minutes)
4. **SSL Certificate:** Auto-provisioned by Vercel

## 🔄 Automatic Deployments

Once connected, Vercel automatically:

1. **Deploys on every push** to your main branch
2. **Creates preview deployments** for pull requests
3. **Runs checks** and shows build status
4. **Updates environment** within 30 seconds

### GitHub Actions vs Vercel Auto-Deploy

**Important:** Since we're using Vercel, we've removed the `.github/workflows/nextjs.yml` file that was deploying to GitHub Pages. 

**Why?**
- GitHub Pages only supports static sites (no API routes)
- Vercel has built-in GitHub integration
- No need for separate CI/CD pipeline
- Vercel's auto-deploy is faster and more reliable

If you want to keep GitHub Actions for other purposes (linting, testing):

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
```

## 📊 Monitoring & Analytics

### Vercel Analytics (Free Basic Tier)

1. Go to your project → Analytics
2. Click "Enable Analytics"
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Function Logs

View serverless function logs:
1. Go to Deployments
2. Click on a deployment
3. View "Functions" tab
4. Check logs for your `/api/ai-chat` endpoint

### Real-time Monitoring

```bash
# Watch deployment logs in real-time
vercel logs [deployment-url]

# Follow function logs
vercel logs [deployment-url] -f
```

## 🐛 Troubleshooting

### API Route Not Working

**Issue:** 405 or 404 errors on `/api/ai-chat`

**Solution:**
1. Ensure `next.config.ts` doesn't have `output: 'export'`
2. Check environment variable is set in Vercel
3. Redeploy: `vercel --prod`

### Environment Variable Not Found

**Issue:** `process.env.GEMINI_API_KEY` is undefined

**Solution:**
```bash
# Check variables
vercel env ls

# Add if missing
vercel env add GEMINI_API_KEY

# Redeploy
vercel --prod
```

### Build Failing

**Issue:** Build fails during deployment

**Solution:**
```bash
# Test build locally first
npm run build

# Check build logs in Vercel dashboard
# Fix errors and push again
```

### Serverless Function Timeout

**Issue:** AI responses timing out

**Solution:**

Create `vercel.json` to increase timeout:

```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore` ✓

2. **Use Vercel Environment Variables**
   - Encrypted at rest
   - Only exposed during build/runtime
   - Not visible in browser

3. **Enable Vercel Authentication (Optional)**
   - For preview deployments
   - Settings → Deployment Protection

4. **Rate Limiting (Optional)**

   Add rate limiting to your API route:

   ```typescript
   // src/app/api/ai-chat/route.ts
   
   // Simple in-memory rate limiter
   const rateLimitMap = new Map<string, number[]>();
   
   function rateLimit(ip: string, limit = 10, window = 60000) {
     const now = Date.now();
     const requests = rateLimitMap.get(ip) || [];
     const recentRequests = requests.filter(time => now - time < window);
     
     if (recentRequests.length >= limit) {
       return false;
     }
     
     recentRequests.push(now);
     rateLimitMap.set(ip, recentRequests);
     return true;
   }
   
   export async function POST(request: NextRequest) {
     const ip = request.headers.get('x-forwarded-for') || 'unknown';
     
     if (!rateLimit(ip, 20, 60000)) { // 20 requests per minute
       return NextResponse.json(
         { error: 'Too many requests' },
         { status: 429 }
       );
     }
     
     // ... rest of your code
   }
   ```

## 📈 Performance Optimization

### 1. Enable Caching

```typescript
// src/app/api/ai-chat/route.ts
export const runtime = 'edge'; // Use Edge Runtime for faster cold starts

// Or add caching headers
export async function POST(request: NextRequest) {
  // ... your code ...
  
  return new NextResponse(JSON.stringify({ response: text }), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### 2. Optimize Images

Vercel automatically optimizes images when you use `next/image`:

```typescript
import Image from 'next/image'

<Image
  src="/images/profile.png"
  alt="Profile"
  width={400}
  height={400}
  priority
/>
```

### 3. Enable Analytics

```bash
vercel analytics enable
```

## 💡 Advanced Features

### Preview Deployments

Every branch and PR gets its own URL:
- Test changes before merging
- Share with others for feedback
- Automatic cleanup after PR merge

### Environment Branching

Different environment variables for different branches:

```bash
# Production variables
vercel env add DATABASE_URL production

# Preview variables
vercel env add DATABASE_URL preview

# Development variables
vercel env add DATABASE_URL development
```

### Custom Redirects

Add to `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/blog",
      "destination": "https://theheuristicreport.beehiiv.com/",
      "permanent": false
    }
  ]
}
```

### Headers

Add security headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🆚 Vercel vs GitHub Pages

| Feature | Vercel | GitHub Pages |
|---------|--------|--------------|
| **API Routes** | ✅ Yes | ❌ No |
| **Serverless Functions** | ✅ Yes | ❌ No |
| **Custom Domains** | ✅ Free SSL | ✅ Free SSL |
| **Build Time** | ~2 min | ~5 min |
| **Edge Network** | ✅ Global CDN | ✅ CDN |
| **Auto Deploy** | ✅ Yes | ✅ Yes |
| **Preview Deploys** | ✅ Yes | ❌ No |
| **Analytics** | ✅ Built-in | ❌ Need 3rd party |
| **Cost** | 🆓 Free | 🆓 Free |

**Winner:** Vercel (for Next.js with API routes)

## 📊 Free Tier Limits

### What's Included (Hobby Plan):

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month (plenty for portfolio)
- ✅ 6,000 serverless function executions/day
- ✅ 100 hours serverless function execution/month
- ✅ SSL certificates
- ✅ Custom domains
- ✅ Analytics (basic)
- ✅ Automatic Git integration

### When You'd Need to Upgrade:

- Your site gets **>100 GB bandwidth/month** (~300K+ visitors)
- You need **>6K AI chatbot requests/day** (very unlikely)
- You want team collaboration features
- You need password protection
- You want advanced analytics

**For a portfolio website:** The free tier is more than enough! 🎉

## 🎯 Comparison: Vercel vs GKE

| Aspect | Vercel (Free) | GKE + Terraform |
|--------|---------------|-----------------|
| **Monthly Cost** | $0 | $106-136 |
| **Setup Time** | 5 minutes | 2-3 hours |
| **Maintenance** | Zero | High |
| **Scaling** | Automatic | Manual |
| **SSL** | Automatic | Manual setup |
| **Monitoring** | Built-in | Setup required |
| **CI/CD** | Built-in | Setup required |
| **Learning Value** | Low | High |
| **Portfolio Value** | Medium | High |

**For Portfolio Website:** Vercel is the clear winner!

**For Learning/Showcase:** Keep the GKE guide for future projects or when you want to demonstrate enterprise architecture skills.

## 🔄 Migration Path

### From GitHub Pages to Vercel:

1. Deploy to Vercel (follow steps above)
2. Test: `https://your-portfolio.vercel.app`
3. Once working, update DNS to point to Vercel
4. Keep GitHub repo as source of truth

### From Vercel to GKE (Future):

If you ever need to showcase enterprise skills:
1. Keep both deployments
2. Use Vercel for production
3. Use GKE for demo/learning
4. Document both in your portfolio

## 🎓 Next Steps

### Immediate (Do Now):

1. ✅ Update `next.config.ts` (already done)
2. ✅ Deploy to Vercel
3. ✅ Add `GEMINI_API_KEY` environment variable
4. ✅ Test AI chatbot on live site
5. ✅ Update README with new deployment URL

### Optional (Later):

1. Add custom domain
2. Enable Vercel Analytics
3. Set up rate limiting
4. Add more AI features
5. Create blog post about your portfolio

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 Conclusion

**You've made the right choice!** 

Vercel is:
- ✅ Free
- ✅ Fast to set up
- ✅ Zero maintenance
- ✅ Perfect for your portfolio
- ✅ Professional quality

Save the GKE/Terraform setup for:
- Enterprise projects at work
- When you need to demonstrate cloud architecture skills
- Blog post: "How I built a production-grade deployment pipeline"

---

**Ready to deploy?** Run: `vercel --prod` 🚀

