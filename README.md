# SKU Management API

A comprehensive API built with NestJS and PostgreSQL for managing SKUs (Stock Keeping Units), inventory tracking, stock transfers, and reorder alerts.

## Features

- SKU Management (Create, Read, Update, Delete)
- Stock Level Tracking
- Stock Transfer Management
- Reorder Alert System
- Swagger API Documentation

## Tech Stack

- NestJS
- PostgreSQL
- TypeORM
- Docker & Docker Compose
- Swagger UI

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (if running locally)
- Docker and Docker Compose (if running with Docker)

## Environment Setup

Create a `.env` file in the root directory with the following configuration:

```env
# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost        # Use 'postgres' if running with Docker
DB_PORT=5432
DB_USERNAME=<your_db_username>
DB_PASSWORD=<your_db_password>
DB_NAME=sku_management

# Application Configuration
PORT=3000
API_PREFIX=api
NODE_ENV=development

# TypeORM Configuration
TYPEORM_SYNCHRONIZE=true
TYPEORM_ENTITIES=dist/**/*.entity.js
TYPEORM_ENTITIES_DIR=src/shared/database/entities/*.entity.{ts,js}

# Swagger Configuration
SWAGGER_TITLE=SKU Management API
SWAGGER_DESCRIPTION=A comprehensive API for managing SKUs, stock, transfers, and reorder alerts
SWAGGER_VERSION=1.0
```

## Running the Application

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Build the application:

```bash
npm run build
```

3. Run database seeding:

```bash
npm run seed
```

4. Start the development server:

```bash
npm run start:dev
```

### Using Docker

1. Build and start the containers:

```bash
docker-compose up --build
```

This command will:

- Build the application container
- Start PostgreSQL database
- Run database seeding automatically
- Start the application in development mode with hot-reload

## API Documentation

Once the application is running, you can access:

- API Base URL: `http://localhost:3000/api`
- Swagger Documentation: `http://localhost:3000/api/docs`

## Available Scripts

- `npm run build` - Build the application
- `npm run start:dev` - Start in development mode with hot-reload
- `npm run clean` - Clean the build directory
- `npm run seed` - Run database seeding
- `npm run build:seed` - Build the seeder

## Docker Commands

- `docker-compose up --build` - Build and start all containers
- `docker-compose down` - Stop and remove containers
- `docker-compose logs` - View container logs

## Project Structure

```
src/
├── config/              # Configuration files
├── modules/            # Feature modules
│   ├── sku/           # SKU management
│   ├── stock/         # Stock management
│   └── reorder-alert/ # Reorder alert system
├── shared/            # Shared resources
│   └── database/      # Database entities and configurations
└── main.ts            # Application entry point
```
