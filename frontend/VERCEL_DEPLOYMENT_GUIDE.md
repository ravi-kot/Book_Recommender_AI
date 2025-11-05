# 🚀 Complete Vercel Deployment Guide - BookLens

## 📋 Overview

This guide will help you deploy BookLens to Vercel with Google Drive downloads, exactly like your Streamlit app.

## ✅ What's Been Implemented

### 1. **Fixed Merge Conflicts**
- ✅ Resolved conflicts in `requirements.txt` and `frontend/requirements.txt`
- ✅ Added missing dependencies: `gdown`, `faiss-cpu`

### 2. **Python Serverless Function**
- ✅ Created `frontend/api/recommend/index.py`
- ✅ Implements same logic as Streamlit `app.py`:
  - Downloads parquet & FAISS index from Google Drive
  - Uses OpenAI v3-small embeddings (1536 dims)
  - Category + Emotion filters
  - FAISS similarity search

### 3. **Frontend API Route**
- ✅ Updated `frontend/app/api/search/route.ts`
- ✅ Calls Python serverless function
- ✅ Handles errors gracefully

### 4. **Vercel Configuration**
- ✅ Updated `vercel.json` with Python runtime support
- ✅ Configured function timeouts and memory

### 5. **Documentation**
- ✅ Created deployment plan
- ✅ Created this guide

## 📁 Files Created/Modified

### New Files:
1. `frontend/api/recommend/index.py` - Python serverless function
2. `frontend/api/recommend/requirements.txt` - Python dependencies
3. `frontend/requirements-vercel.txt` - Minimal requirements
4. `frontend/DEPLOYMENT_PLAN.md` - Deployment plan
5. `frontend/VERCEL_DEPLOYMENT_GUIDE.md` - This file

### Modified Files:
1. `requirements.txt` - Fixed merge conflicts, added gdown
2. `frontend/requirements.txt` - Fixed merge conflicts, added gdown
3. `frontend/app/api/search/route.ts` - Updated to call Python backend
4. `frontend/vercel.json` - Added Python runtime configuration

## 🔧 Environment Variables Needed in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

### Required:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Optional (defaults are in code):
```
PARQUET_DRIVE_ID=1MdnK2JcZNu28OB2klS1UKFAPcnlJVOL6
INDEX_DRIVE_ID=1e_lK37-bstgFcaKpitz5_qXC8XUlV0T7
```

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Make sure you're in the frontend directory or root
cd frontend

# Check git status
git status

# Add all changes
git add .

# Commit
git commit -m "Add Vercel deployment with Python serverless function"

# Push to GitHub
git push origin main
```

### Step 2: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Project:**
   - **Root Directory**: Set to `frontend` ⚠️ **IMPORTANT!**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Environment Variables** (add these):
   - `OPENAI_API_KEY` = your OpenAI API key
   - `PARQUET_DRIVE_ID` = `1MdnK2JcZNu28OB2klS1UKFAPcnlJVOL6` (optional)
   - `INDEX_DRIVE_ID` = `1e_lK37-bstgFcaKpitz5_qXC8XUlV0T7` (optional)

6. **Click "Deploy"**

### Step 3: Monitor Deployment

- Watch the build logs for any errors
- First deployment may take longer (installing Python dependencies)
- Check the function logs for Python serverless function

## ⚠️ Important Notes

### Vercel Python Runtime Limitations:

1. **Cold Starts**: First request after inactivity will be slow (downloading files from Google Drive)
   - **Solution**: Files are cached in `/tmp` between warm invocations
   - **Consider**: Use Vercel Cron Jobs to keep function warm

2. **File Storage**: `/tmp` is ephemeral (cleared between deployments)
   - **Solution**: Files are re-downloaded on first request after deployment
   - **Consider**: Use external storage (S3, Cloudflare R2) for faster access

3. **Size Limits**: 
   - Function code must be < 50MB
   - `/tmp` has limited space (512MB on Pro plan)

4. **Timeout Limits**:
   - Hobby: 10 seconds max
   - Pro: 60 seconds max
   - Configured: 60 seconds in `vercel.json`

### How It Works:

1. **First Request (Cold Start)**:
   - Python function starts
   - Downloads parquet file from Google Drive → `/tmp/booklens_data/books_gold.parquet`
   - Downloads FAISS index → `/tmp/booklens_data/books_faiss.index`
   - Loads data into memory
   - Processes request

2. **Subsequent Requests (Warm)**:
   - Files already in `/tmp` (if function is warm)
   - Data already loaded in memory
   - Fast response (no download needed)

3. **After Deployment**:
   - `/tmp` is cleared
   - Next request will download files again

## 🧪 Testing

### Local Testing (Optional):

You can test the Python function locally using the Flask backend:

```bash
cd frontend
pip install -r backend-requirements.txt
python backend-example.py
```

Then set `NEXT_PUBLIC_API_URL=http://localhost:8000/api/recommend` in `.env.local`

### Production Testing:

1. Deploy to Vercel
2. Visit your deployed URL
3. Enter a book query
4. Check Vercel function logs for any errors

## 🔍 Troubleshooting

### Build Fails:

**Error**: "Python not found"
- **Solution**: Ensure `vercel.json` has Python runtime configured (already done)

**Error**: "Module not found"
- **Solution**: Check `api/recommend/requirements.txt` has all dependencies

### Runtime Errors:

**Error**: "OPENAI_API_KEY not set"
- **Solution**: Add environment variable in Vercel dashboard

**Error**: "Failed to download from Google Drive"
- **Solution**: Check Google Drive file IDs are correct and files are publicly accessible

**Error**: "Timeout"
- **Solution**: First request may timeout (downloading files). Try again - second request should be faster.

### Function Not Working:

1. Check Vercel function logs
2. Verify environment variables are set
3. Check Google Drive file permissions
4. Verify Python runtime is 3.9+

## 📊 Performance Optimization

### For Better Performance:

1. **Use Vercel KV or Redis** for caching:
   - Store downloaded files in KV
   - Faster access than re-downloading

2. **Use External Storage**:
   - Store files in S3/Cloudflare R2
   - Use signed URLs for access
   - Faster than Google Drive

3. **Keep Function Warm**:
   - Use Vercel Cron Jobs
   - Ping function every 5 minutes

4. **Optimize Dependencies**:
   - Use `requirements-vercel.txt` (minimal deps)
   - Consider using lighter alternatives

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] All files are committed to git
- [ ] Environment variables are ready
- [ ] Google Drive files are accessible
- [ ] OpenAI API key is valid
- [ ] Root directory is set to `frontend` in Vercel
- [ ] Python runtime is configured in `vercel.json`

## 🎉 After Deployment

Your app will be live at: `https://your-project.vercel.app`

Features:
- ✅ AI-powered book search
- ✅ Category filtering
- ✅ Emotion-based filtering
- ✅ Favorites system
- ✅ Google Drive downloads (automatic)
- ✅ Same logic as Streamlit app

## 📝 Next Steps

1. Monitor function performance
2. Set up error tracking (Sentry)
3. Add caching layer if needed
4. Optimize for production
5. Set up custom domain

---

**Happy Deploying! 🚀**

If you encounter any issues, check the Vercel function logs and the troubleshooting section above.

