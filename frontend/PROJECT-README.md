# BookLens - AI Book Recommender System

A complete AI-powered book recommendation system with a modern Next.js frontend and Python backend - **everything in one folder!**

## 🏗️ Project Structure

```
LLM Project/
├── frontend/                 # 🎨 Complete Project (Deploy to Vercel)
│   ├── app/                  # Next.js app directory
│   ├── public/               # Static assets (cover images)
│   ├── package.json          # Frontend dependencies
│   ├── next.config.js        # Next.js configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── vercel.json           # Vercel deployment config
│   ├── app.py                # 🐍 Main Streamlit application
│   ├── build_embeddings.py   # Embedding generation script
│   ├── requirements.txt      # Python dependencies
│   ├── backend-example.py    # Flask backend example
│   ├── start.bat             # Windows startup script
│   ├── start.sh              # Unix startup script
│   └── README.md             # Frontend documentation
├── data/                     # 📊 Book data and embeddings
│   ├── books_gold.parquet    # Book dataset
│   ├── books_faiss.index     # FAISS vector index
│   └── ...
└── README.md                 # Main project documentation
```

## 🚀 Quick Start

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend (Python)
```bash
cd frontend

# Install Python dependencies
pip install -r requirements.txt

# Run Streamlit app
streamlit run app.py

# Or run Flask backend
python backend-example.py
```

### Quick Start Scripts
```bash
# Windows
start.bat

# Unix/Linux/Mac
chmod +x start.sh
./start.sh
```

## 🌐 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import to Vercel
3. Set root directory to `frontend`
4. Deploy automatically

### Backend → Railway/DigitalOcean
1. Use `backend-example.py` as starting point
2. Deploy to Railway or DigitalOcean
3. Update frontend API endpoints

## 🔧 Configuration

### Environment Variables
Create `.env.local` in frontend folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
OPENAI_API_KEY=your_openai_key_here
```

### Data Files
Ensure these files are in the `data/` directory:
- `books_gold.parquet` - Book dataset
- `books_faiss.index` - FAISS vector index

## 📚 Features

- **AI-Powered Search**: OpenAI embeddings + FAISS similarity
- **Smart Filtering**: Category and emotional tone filters
- **Modern UI**: Responsive design with Tailwind CSS
- **Favorites System**: Save and manage book lists
- **Real-time Recommendations**: Instant book suggestions
- **Streamlit Interface**: Original Python-based UI
- **Flask API**: RESTful backend for frontend integration

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons

### Backend
- Python
- OpenAI API
- FAISS (vector similarity)
- Pandas (data processing)
- Streamlit (original UI)
- Flask (API server)

## 📖 Documentation

- [Frontend README](README.md) - Next.js setup and deployment
- [Deployment Guide](deploy.md) - Vercel and backend deployment
- [Vercel Quick Deploy](deploy-vercel.md) - Fast deployment guide
- [Backend Example](backend-example.py) - Flask API implementation

## 🔗 Links

- **Frontend**: http://localhost:3000 (dev)
- **Streamlit App**: http://localhost:8501 (dev)
- **Flask API**: http://localhost:8000 (dev)

## 🎯 **Why Everything in One Folder?**

✅ **Easy Deployment**: Set Vercel root to `frontend` and everything works  
✅ **Self-Contained**: All project files in one place  
✅ **Simple Management**: One folder to rule them all  
✅ **Vercel Ready**: No complex configuration needed  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Reading! 📚✨**
