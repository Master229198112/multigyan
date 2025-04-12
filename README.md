# Multigyan Blog Platform

Multigyan is a modern, full-stack blogging platform built with **Next.js**, **React**, and **MongoDB**. It allows content creators to write, edit, and publish markdown-based posts, while readers can browse, filter, and comment on posts. The project is fully responsive, supports dark mode, and is deployed on **Vercel**.

---

## 🚀 Features

### 🖥️ Frontend
- Built with **Next.js (Pages Router)** and **Tailwind CSS**
- **Responsive UI** with mobile-first design
- **Dark Mode** toggle (stored in `localStorage`)
- Markdown support via `react-markdown`
- Home page with:
  - Category filter
  - Tag filter
  - Pagination
- Blog post page:
  - Dynamic routing via `slug`
  - Markdown-rendered content
  - Comment section (submit + view)

### ✏️ Admin Panel
- Create post with:
  - Title, slug, content, category, tags, image URL
  - Auto-generated date + read time
- Edit & delete posts
- Live markdown preview while editing

### 💬 Comment System
- Stored in MongoDB with `postSlug` reference
- Comment form: name, optional email, message
- Displays all comments under each post

### 🔗 Backend (API)
- `/api/posts` (GET, POST)
- `/api/posts/[id]` (PUT, DELETE)
- `/api/posts/[slug]` (GET single post)
- `/api/comments` (GET by slug, POST new comment)

---

## 🛠️ Technologies
- **Next.js (Pages Router)**
- **React**
- **Tailwind CSS**
- **MongoDB Atlas**
- **Mongoose**
- **Vercel** (Deployment)

---

## 🧪 Local Setup

### 1. Clone the Repo
```bash
git clone https://github.com/master229198112/multigyan.git
cd multigyan
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env.local` file:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/multigyan
```

### 4. Run the App
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Folder Structure
```
multigyan/
├── src/
│   ├── components/         # Navbar, Footer, BlogCard, Comments, etc
│   ├── lib/                # dbConnect.js (MongoDB connection)
│   ├── models/             # Mongoose schemas (Post, Comment)
│   ├── pages/              # Page routes (home, blog, admin, API)
│   │   ├── blog/           # [slug].js
│   │   ├── admin/          # index.js, edit/[id].js, posts.js
│   │   └── api/            # posts/, comments/
│   └── styles/             # Tailwind + custom styles
├── public/                 # Static assets
├── .env.local              # MongoDB URI
├── tailwind.config.js      # Tailwind setup
├── package.json            # Dependencies
```

---

## ✅ Deployment
Deployed using **Vercel**
1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the project and add `MONGODB_URI` as an environment variable
4. Deploy 🚀

---

## 📌 Next Steps / Todo
- Add Admin Authentication (NextAuth)
- Add Likes / Views tracking
- Add Post Drafts
- Upload images instead of URLs
- Social Sharing buttons

---

## Contact
For any questions or contributions, feel free to reach out:
- **Email**: vishalkumar.sharma37@gmail.com
- **GitHub**: [Master229198112](https://github.com/Master229198112)
- **LinkedIn**: [Vishal Kumar Sharma](https://www.linkedin.com/in/mastervishal/)
