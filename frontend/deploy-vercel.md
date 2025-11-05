# 🚀 Deploy to Vercel - Quick Guide

## ✅ **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Frontend ready for Vercel deployment"
git push origin main
```

## ✅ **Step 2: Deploy on Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Set Root Directory to `frontend`** ← **IMPORTANT!**
5. **Click Deploy**

## ✅ **Step 3: Configure Environment Variables**

In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   NODE_ENV=production
   ```

## ✅ **Step 4: Test Your Deployment**

Your app will be available at:
- `https://your-project.vercel.app`

## 🔧 **Troubleshooting**

### If you get 404 errors:
- ✅ Ensure root directory is set to `frontend`
- ✅ Check that `package.json` exists in frontend folder
- ✅ Verify all dependencies are installed

### If build fails:
- ✅ Check Vercel logs for errors
- ✅ Ensure Node.js version is 18+
- ✅ Verify TypeScript compilation

## 📁 **Your Project Structure Should Look Like:**

```
your-repo/
├── frontend/          # ← Vercel root directory
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── ...
├── app.py
├── data/
└── ...
```

## 🎯 **What Happens Next:**

1. **Vercel builds your Next.js app**
2. **Deploys to global CDN**
3. **Automatic HTTPS enabled**
4. **Auto-deploys on git push**

---

**Your BookLens app will be live in minutes! 🎉**
