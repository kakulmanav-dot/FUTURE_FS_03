# Forever

An online clothing store built with React, Vite, and Node.js. Forever is a full-stack ecommerce platform where users can browse and purchase clothes — paired with a separate admin panel to manage everything on the backend.

---

## 🔗 Live Demo

👉 [View Project](https://your-project-link.com)

---
## 🔗 Links
-  **Frontend** — (https://forever-sandy-one.vercel.app)
-  **Admin Panel** — (https://forever-admin-nine-kohl.vercel.app)


## What this is

Forever is a personal ecommerce project. The idea was to build something that actually works end-to-end — product listings, a cart, checkout, the whole flow — rather than just a frontend mockup. The project is split into three parts: the customer-facing storefront, the backend API, and an admin dashboard, each living in its own folder.

---

## How This Can Help a Business Grow

An ecommerce platform like Forever gives a clothing brand everything it needs to move from offline to online — or scale an existing online presence:

- **24/7 Sales** — Customers can browse and buy anytime, without depending on store hours or staff
- **Wider Reach** — Sell to customers across cities or countries, not just walk-ins
- **Lower Overhead** — No physical storefront needed; manage everything from the admin panel
- **Data-Driven Decisions** — Order history and product management help track what's selling and what isn't
- **Trust & Credibility** — A polished, responsive storefront builds customer confidence and encourages repeat purchases
- **Scalable** — Add new products, categories, or users without rebuilding anything

---

## Features

- Browse and filter clothing by category, size, or price
- Product detail pages with image previews
- Add to cart, update quantities, remove items
- User login and registration
- Order placement and basic order history
- Admin panel for managing products and orders
- Fully responsive — works on mobile and desktop

---

## Tech Stack

**Frontend** (Vite + React)
- React
- React Router for navigation
- Context API for cart and auth state
- Vite for fast dev/build

**Admin** (Vite + React)
- Separate React app for the admin dashboard
- Product and order management UI

**Backend**
- Node.js + Express
- REST API
- JWT-based authentication
- MongoDB with Mongoose

---

## Folder Structure

FUTURE_FS_03/
├── frontend/       # Customer-facing storefront (Vite + React)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── context/
├── admin/          # Admin dashboard (Vite + React)
│   └── src/
│       ├── components/
│       └── pages/
├── backend/        # Node/Express API
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── middleware/

---

## Getting Started

Clone the repo and set up each part separately.

```bash
git clone https://github.com/yourusername/FUTURE_FS_03.git
cd FUTURE_FS_03
```

**Backend**

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `backend/`:
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Admin**

```bash
cd admin
npm install
npm run dev
```

By default:
- Frontend runs at `http://localhost:5173`
- Admin runs at `http://localhost:5174`
- Backend runs at `http://localhost:3000`

