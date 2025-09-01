# BookLens Frontend

A modern, responsive web application for AI-powered book recommendations built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Smart Search**: Describe your ideal book and get AI-powered recommendations
- 📚 **Category Filtering**: Filter by book categories (Fiction, Non-Fiction, Mystery, etc.)
- 😊 **Emotional Tone**: Get books that match your desired emotional experience
- ❤️ **Favorites System**: Save and manage your favorite books
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   └── search/        # Book search endpoint
│   ├── components/        # React components
│   │   ├── BookCard.tsx   # Individual book display
│   │   ├── SearchForm.tsx # Search interface
│   │   └── FavoritesPanel.tsx # Favorites sidebar
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                 # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Backend Integration

Currently, this frontend uses mock data for demonstration. To connect it to your Python backend:

1. **Update the API endpoint** in `app/api/search/route.ts`
2. **Ensure your backend serves** the book recommendation API
3. **Handle CORS** if needed
4. **Update the Book interface** to match your actual data structure

### Example Backend Integration

```typescript
// In app/api/search/route.ts
const response = await fetch('http://localhost:8000/api/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, category, tone }),
})
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

### Other Platforms

The app is also deployable on:
- Netlify
- Railway
- DigitalOcean App Platform
- Any platform supporting Next.js

## Customization

### Styling
- Modify `tailwind.config.js` for theme changes
- Update `app/globals.css` for custom CSS
- Use the existing design system classes

### Components
- All components are in `app/components/`
- Easy to modify or extend functionality
- TypeScript interfaces ensure type safety

### Data Structure
- Update the `Book` interface in `app/page.tsx`
- Modify the search form categories and tones
- Adjust the emotion scoring display

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Check the existing issues
- Create a new issue with detailed information
- Contact the development team

---

**Happy Reading! 📚✨**
