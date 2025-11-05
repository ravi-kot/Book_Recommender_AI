# 🚀 Vercel Deployment Plan - BookLens

## 📋 Overview
This plan outlines the complete implementation for deploying BookLens to Vercel with Google Drive downloads, similar to the Streamlit implementation.

## 🎯 Architecture

### Frontend (Next.js)
- **Location**: `frontend/app/`
- **Components**: React/TypeScript components
- **API Route**: `frontend/app/api/search/route.ts` → Calls Python serverless function

### Backend (Python Serverless Function)
- **Location**: `frontend/api/recommend.py` (Vercel serverless function)
- **Functionality**: 
  - Downloads parquet & FAISS index from Google Drive (cached)
  - Loads books and FAISS index
  - Performs semantic search using OpenAI embeddings
  - Returns recommendations

## 📁 Files to Add/Create

### New Files:
1. ✅ `frontend/api/recommend.py` - Python serverless function for Vercel
2. ✅ `frontend/requirements-vercel.txt` - Minimal Python dependencies for Vercel
3. ✅ `frontend/.env.example` - Environment variables template
4. ✅ `frontend/DEPLOYMENT_PLAN.md` - This file

### Files to Edit:
1. ✅ `frontend/requirements.txt` - Fix merge conflicts, add gdown
2. ✅ `frontend/app/api/search/route.ts` - Update to call Python serverless function
3. ✅ `frontend/vercel.json` - Add Python runtime configuration
4. ✅ `requirements.txt` (root) - Fix merge conflicts

### Files to Review:
1. ⚠️ `frontend/next.config.js` - Already configured
2. ⚠️ `frontend/package.json` - Already configured

## 🔧 Key Changes

### 1. Python Serverless Function (`api/recommend.py`)
- Uses `gdown` to download files from Google Drive
- Caches downloaded files in `/tmp` (Vercel's writable directory)
- Loads FAISS index and parquet file
- Implements same recommendation logic as Streamlit app
- Handles OpenAI embeddings

### 2. Environment Variables
- `OPENAI_API_KEY` - Required for embeddings
- `PARQUET_DRIVE_ID` - Google Drive ID for parquet file
- `INDEX_DRIVE_ID` - Google Drive ID for FAISS index

### 3. Vercel Configuration
- Python 3.9+ runtime
- Increased timeout for serverless functions (30s)
- Proper region configuration

## ⚠️ Important Notes

### Vercel Limitations:
- **Cold starts**: First request may be slow (downloading files)
- **File storage**: `/tmp` is ephemeral (cleared between deployments)
- **Size limits**: Function code must be < 50MB
- **Timeout**: Max 60s for Pro plan, 10s for Hobby

### Solutions:
1. **Caching**: Use Vercel KV or Redis for caching downloaded files
2. **Warm-up**: Use Vercel Cron Jobs to keep functions warm
3. **External storage**: Consider storing files in S3/Cloudflare R2 for faster access

## 🚀 Deployment Steps

1. **Fix merge conflicts** in requirements.txt
2. **Create Python serverless function** with Google Drive download
3. **Update TypeScript API route** to call Python function
4. **Configure Vercel** with Python runtime
5. **Set environment variables** in Vercel dashboard
6. **Deploy and test**

## ✅ Testing Checklist

- [ ] Google Drive downloads work
- [ ] FAISS index loads correctly
- [ ] OpenAI embeddings work
- [ ] Search returns results
- [ ] Category filter works
- [ ] Emotion filter works
- [ ] Frontend displays results correctly
- [ ] Favorites functionality works

## 📝 Next Steps After Deployment

1. Monitor cold start times
2. Consider adding caching layer
3. Optimize for faster response times
4. Add error handling and retries
5. Set up monitoring/logging

