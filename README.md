# StockSense — Inventory Management System (starter)

MERN-stack scaffold for the Odoo x LPU Jalandhar Hackathon "StockSense" problem
statement: a centralized, real-time app that replaces manual registers and
spreadsheets for receipts, deliveries, internal transfers and stock adjustments.

## Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, OTP-based password reset
- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios

## What's already wired up
- Signup / login / OTP forgot-password flow
- Dashboard with live KPIs (total products, low/out of stock, pending receipts & deliveries)
- Product CRUD with category and per-product total stock
- Receipts, Delivery Orders and Internal Transfers as a shared "stock move" model,
  each created as a **draft** and only affecting stock once **validated** —
  mirroring the real inventory workflow described in the brief
- Stock Adjustments: enter a counted quantity, the system computes and logs the delta
- Move History with filters by type and status
- Warehouses & Locations management (Settings page)
- A `StockLevel` collection tracks quantity per product **per location**, so
  multi-warehouse and low-stock alerts (via `reorderMin`) work out of the box

## Getting started

### 1. Backend
```bash
cd backend
cp .env.example .env      # then fill in MONGO_URI and a real JWT_SECRET
npm install
npm run dev                # starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173, proxies /api to :5000
```

### 3. First run
1. Sign up an account (this becomes your first user).
2. Go to **Settings** and add at least one Warehouse and two Locations
   (e.g. "Main Store" and "Production Rack").
3. Go to **Products**, add a Category from the product form's dropdown
   (create one via `POST /api/products/categories` or extend the UI — left as
   a quick add for your team) and create a product.
4. Create a **Receipt** into a location, then **Validate** it — stock appears.
5. Try an **Internal Transfer** between locations, a **Delivery**, and an
   **Adjustment** to see the ledger and stock levels update.

## Where to extend (ideas for your 8/24 hours)
- Add a quick "create category" modal directly on the Products page.
- Add pagination / smarter SKU search & filters (brief calls this out explicitly).
- Add role-based UI (e.g. only managers can validate deliveries).
- Add charts for stock trends and reorder alerts.
- Add a proper email/SMS provider in `backend/utils/otp.js` (currently logs to console).
- Consider a "Ready"/"Waiting" state machine if you want richer statuses than draft → done.

## Notes on the "Must have" checklist
- Real-time data: everything reads from MongoDB, no static JSON.
- Responsive, consistent UI: shared Tailwind tokens (`tailwind.config.js`) and
  one layout (Sidebar + Navbar) reused across every page.
- Input validation: required fields + server-side checks in every controller.
- Git: this is a clean starting point — remember every team member should be
  committing their own code, not just the team leader.
