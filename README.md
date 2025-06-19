# BiteSpeed Identity Reconciliation API

This is a backend service built for **identity reconciliation** — determining and linking contacts with shared identifiers (email or phone number) across multiple records. It is built using **Node.js**, **TypeScript**, **Express.js**, **Prisma ORM**, and **PostgreSQL**.

---

## 🚀 Features

- Identify users by email and/or phone number
- Link duplicate contacts under a single primary identity
- Maintain history of primary and secondary contact records
- Built with clean code architecture using TypeScript and Prisma

---

## 🛠️ Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **RESTful API**

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/BiteSpeed-Project.git
cd BiteSpeed-Project
```

## Install Dependencies

```
npm install
```

## 🧪 Environment Setup
3. Create a .env file in the root directory
```bash
touch .env
```

### Add the following:

```DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bitespeed"```

## Run Prisma CLI Commands
```
npx prisma generate
npx prisma migrate dev --name init
```

## Running the Server
```
npm run dev
```

## 🧠 Author
Chaitanya Badukale
BiteSpeed Technical Assignment Project
