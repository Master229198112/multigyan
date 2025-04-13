# 📰 Multigyan Blog Platform

Multigyan is a modern, multi-niche blogging platform built with **Next.js**, **MongoDB**, and **Tailwind CSS**. It supports public blog submissions, admin moderation, comments, email notifications, and newsletter signups. Deployed on **Vercel** and connected to a **MongoDB Atlas** database.

---

## 🌐 Live URL
**https://www.multigyan.in**

---

## ✅ Features Implemented

### ✨ General
- Fully responsive design
- Dark/Light mode toggle with persistent state
- Custom domain setup via GoDaddy
- GoDaddy business email (`username@multigyan.in`) used for mail communication

### 📰 Blogging
- Homepage with latest posts (`/`)
- Blog listing (`/blog`)
- Dynamic single post pages (`/blog/[slug]`)
- Category + Tag filters
- Estimated reading time per post
- Markdown rendering with live preview
- Post view counter (tracked in MongoDB)
- Social sharing buttons (Twitter, LinkedIn, WhatsApp)

### ✍️ Blog Submission
- `/blog/submit`: Public blog submission form
- Unapproved posts are hidden from public
- Admin moderation panel for approving/rejecting posts
- Admin post creation, editing, and deletion via dashboard
- Admin gets email alert on new blog submissions
- Public user gets email confirmation on submission

### 💬 Comments
- Readers can post comments on blog posts
- Comments stored in MongoDB with timestamp
- Admin gets email notification on each new comment
- Auto-reply to the commenter (if email provided)

### 👤 Admin Authentication
- Email/password-based login via `/admin/login`
- Session stored in cookies (`admin=loggedin`)
- Protected admin routes using `middleware.js`
- Navbar updates based on login state

### 📬 Contact Page
- `/contact` page with a working contact form
- Sends email to `username@multigyan.in` via Nodemailer (GoDaddy SMTP)
- User receives a confirmation email

### 📥 Newsletter Signup
- `/subscribe` page
- Stores name & email in `subscribers` MongoDB collection
- Prevents duplicate entries

### 📊 Analytics
- Admin dashboard (`/admin/dashboard`) with Chart.js
- Bar chart showing post view counts

---

## 🔧 Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Auth**: Custom session using cookies
- **Email**: Nodemailer + GoDaddy SMTP (`smtpout.secureserver.net`)
- **Hosting**: Vercel

---

## 📁 Folder Structure (Based on Your Project)
```
multigyan/
├── src/
│   ├── components/         # BlogCard, Comments, Footer, Navbar
│   ├── lib/                # dbConnect.js
│   ├── models/             # Comment.js, Post.js, Subscriber.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── edit/[id].js
│   │   │   ├── create.js
│   │   │   ├── index.js        # Admin login
│   │   │   ├── login.js
│   │   │   └── posts.js        # Admin dashboard
│   │   ├── api/
│   │   │   ├── admin/login.js, logout.js
│   │   │   ├── comments/index.js
│   │   │   ├── posts/[id].js, index.js
│   │   │   └── views/[slug].js
│   │   ├── blog/
│   │   │   ├── [slug].js
│   │   │   ├── index.js
│   │   │   └── submit.js
│   │   ├── contact.js
│   │   ├── index.js
│   │   ├── subscribe.js
│   │   └── _app.js, _document.js
│   ├── styles/              # Global Tailwind styles
│   └── middleware.js        # Admin route protection
├── .env.local               # Environment variables
├── tailwind.config.js
├── package.json, postcss.config.js, next.config.js, etc.
└── README.md
```

---

## 🔐 Environment Variables
```env
MONGODB_URI=mongodb+srv://...      # MongoDB Atlas connection string
EMAIL_USER=username@multigyan.in   # GoDaddy email
EMAIL_PASS=your-email-password     # Email SMTP password
EMAIL_TO=username@multigyan.in     # Where admin receives contact/alerts
```

---

## 🛠️ To Do / Future Enhancements
- reCAPTCHA integration for all forms
- Comment moderation and approval workflow
- Post scheduling (publish later)
- Draft saving and autosave while writing
- Mailchimp integration for newsletter automation
- Multi-user admin roles and activity tracking

---

## 📬 Contact/Questions?
Feel free to reach out via the [Contact Page](https://www.multigyan.in/contact) or email `vishal@multigyan.in`
For any questions or contributions, feel free to reach out:

- **GitHub**: [Master229198112](https://github.com/Master229198112)
- **LinkedIn**: [Vishal Kumar Sharma](https://www.linkedin.com/in/mastervishal/)

---

> Built with ❤️ by Team Multigyan
