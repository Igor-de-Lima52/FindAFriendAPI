# 🐶 Find a Friend API

## 📚 Project Description

Find a Friend API is a backend system designed to facilitate the adoption of pets by allowing organizations to register and users to find available pets based on location and specific filters.

## 🛠️ Tecnologies Used  

The project was developed using the following technologies:

- **Node.js**: Platform for building the backend with JavaScript.
- **Fastify**: Fast and efficient Web Framework web for APIs.
- **Prisma**: ORM for PostgreSQL database management.
- **bcryptjs**: Password encryption library.  
- **Zod**: Library for data validation.  
- **dotenv**: Environment variables management.  
- **Dayjs**: Date manipulation in a simple and efficient way.

## ⚙️ Installation 

To install the dependencies, run the command:

```bash
npm install
```

## 📦 Configuration

Create a .env file based on .env.example and configure the right values.

Upload the database with Docker:

```bash
docker-compose up -d
```

Execute the prisma migrations

```bash
npx prisma migrate dev
```

## 🚀 Running the project

Start the development environment with the command:

```bash
npm run dev
```

## 🌟 Main Features

- registration of organizations 🏢
- Search pets and organizations nearby you 📍
- Pets registering for adoption 🐕
- Filter by city, size, age, energy level and environment 🔎
- Search pets by ID 🆔

## 🔑 Authentication and Security

The API uses JWT (JSON Web Token) to orgs authentication.

A API utiliza JWT (JSON Web Token) para autenticação de usuários e organizações.

## 📦 Deploy

The project is ready for deploy. To generate the production version, use:

```bash
npm run build
```