# Deployment Guide

## Quick Start

### 1. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

#### Option B: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### 3. Backend Setup

The frontend currently uses mock data. To connect to your Python backend:

1. **Run the Flask backend:**
   ```bash
   cd ..  # Go back to main project directory
   pip install -r frontend/backend-requirements.txt
   python frontend/backend-example.py
   ```

2. **Update the API endpoint** in `app/api/search/route.ts`:
   ```typescript
   const response = await fetch('http://localhost:8000/api/recommend', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ query, category, tone }),
   })
   ```

3. **Ensure your embeddings and FAISS index are available** in the `data/` directory

## Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Production Considerations

### Frontend (Vercel)
- ✅ Automatic deployments
- ✅ Global CDN
- ✅ HTTPS enabled
- ✅ Environment variables in Vercel dashboard

### Backend Options

#### Option 1: Vercel Serverless Functions
- Convert Flask app to Next.js API routes
- Limited execution time (10s for hobby, 60s for pro)
- Good for simple APIs

#### Option 2: Railway
- Easy Python deployment
- Good for ML/AI workloads
- Reasonable pricing

#### Option 3: DigitalOcean App Platform
- Simple deployment
- Good performance
- Predictable pricing

#### Option 4: Hugging Face Spaces
- Free tier available
- Good for ML projects
- Limited resources

## Troubleshooting

### Common Issues

1. **Build fails on Vercel:**
   - Check Node.js version (18+ required)
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors

2. **API calls fail:**
   - Verify CORS settings on backend
   - Check API endpoint URLs
   - Ensure backend is running

3. **Images not loading:**
   - Check image domains in next.config.js
   - Verify image URLs are accessible
   - Use placeholder images for testing

### Performance Tips

1. **Optimize images:**
   - Use Next.js Image component
   - Compress images
   - Use appropriate formats (WebP)

2. **Bundle optimization:**
   - Use dynamic imports for heavy components
   - Implement code splitting
   - Monitor bundle size

3. **Caching:**
   - Implement proper cache headers
   - Use Vercel's edge caching
   - Consider Redis for session data

## Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real user metrics
- Error tracking

### Custom Monitoring
- Add logging to API routes
- Monitor backend performance
- Track user interactions

## Security

1. **Environment Variables:**
   - Never commit API keys
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **API Security:**
   - Implement rate limiting
   - Add authentication if needed
   - Validate all inputs

3. **CORS:**
   - Restrict to your domain
   - Don't use wildcard origins
   - Handle preflight requests

## Cost Optimization

### Vercel Pricing
- Hobby: Free (100GB bandwidth/month)
- Pro: $20/month (1TB bandwidth/month)
- Enterprise: Custom pricing

### Backend Costs
- Railway: $5-50/month
- DigitalOcean: $5-25/month
- Hugging Face: Free tier available

## Next Steps

1. **Connect to your backend** using the provided example
2. **Add authentication** if needed
3. **Implement user accounts** and reading lists
4. **Add analytics** and user feedback
5. **Optimize for mobile** and accessibility
6. **Add more features** like book reviews, ratings, etc.

---

**Happy Deploying! 🚀**
