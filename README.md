# Vendor Management Portal - ERP System

A modern, responsive **Vendor Management Portal** built as a Web Developer Assignment. It streamlines vendor onboarding, purchase orders, invoices, shipments, and performance tracking for enterprises.

## ✨ Key Features

### Admin Dashboard
- Vendor Onboarding & Approval System (Pending → Approved/Rejected)
- Vendor Management (Search, Filter, Status Management)
- Product Catalog with Barcode Generation
- Purchase Order Management
- Invoice Approval & Rejection
- Performance Analytics with Charts
- Responsive Admin Interface

### Vendor Portal
- Vendor Registration (Status: Pending by default)
- Vendor Dashboard
- Purchase Orders View
- Shipment Tracking
- Invoice Submission

### General Features
- Role-based Authentication (Admin & Vendor)
- Pending Vendor Approval Workflow
- Fully Responsive Design (Mobile, Tablet, Desktop)
- Barcode Generation using `react-barcode`
- Mock Backend using `json-server`

## 🛠 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Mock API**: json-server
- **Notifications**: React Hot Toast

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Kumesh-kumar/vendor-management-portal.git
cd vendor-management-portal


2. Install Dependencies
Bash: npm install

3. Start the Mock Backend (json-server)
Open Terminal 1 and run:
Bash: npm run server

Backend will run on http://localhost:5000

4. Start the Frontend
Open Terminal 2 and run:
Bash: npm run dev
Frontend will run on http://localhost:5173


5.Alternative: Run Both at Once
Bash: npm run both

6.Make sure package.json has these scripts:JSON
"scripts": {
  "dev": "vite",
  "server": "json-server --watch db.json --port 5000",
  "both": "concurrently \"npm run server\" \"npm run dev\""
}


7.Project Structure
src/
│
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── charts/
│   └── layout/
│
├── context/
├── hooks/
├── layouts/
├── pages/
│   ├── admin/
│   ├── vendor/
│   └── auth/
│
├── redux/
├── routes/
├── services/
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css


