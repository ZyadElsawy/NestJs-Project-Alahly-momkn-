# SKU Management API

A comprehensive API for managing SKUs (Stock Keeping Units), inventory, stock transfers, and reorder alerts built with NestJS and PostgreSQL.

## Features

- SKU Management (Create, Read, Update, Delete)
- Stock Management
- Stock Transfer between Locations
- Reorder Alert System
- Branch Stock Management
- Swagger API Documentation

## Tech Stack

- NestJS
- PostgreSQL
- TypeORM
- Swagger/OpenAPI

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/ZyadElsawy/Back-End-Projects.git
cd sku-management-api
```

2. Create a `.env` file (optional - default values will be used if not provided):

```env
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

3. Build and run with Docker Compose:

```bash
docker-compose up -d
```

The API will be available at `http://localhost:3000/api` and Swagger documentation at `http://localhost:3000/api/docs`

### Manual Installation

1. Clone the repository:

```bash
git clone https://github.com/ZyadElsawy/Back-End-Projects.git
cd sku-management-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:

```env
# Database Configuration (Required)
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username  # Required
DB_PASSWORD=your_password  # Required
DB_NAME=your_database     # Required

# Application Configuration (Optional)
PORT=3000
API_PREFIX=api
NODE_ENV=development

# TypeORM Configuration (Optional)
TYPEORM_SYNCHRONIZE=false  # Be careful with this in production!
```

Note: The DB_USERNAME, DB_PASSWORD, and DB_NAME environment variables are required. The application will not start without them.

4. Build the application:

```bash
npm run build
```

5. Start the application:

```bash
npm run start:dev
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api/docs
```

## Available Scripts

- `npm run build` - Build the application
- `npm run start:dev` - Start the application in development mode
- `npm run start` - Start the application in production mode
- `npm run clean` - Clean the build directory
- `npm run rebuild` - Clean and rebuild the application

## Project Structure

```
src/
├── config/              # Configuration files
├── modules/            # Feature modules
│   ├── sku/           # SKU management
│   ├── stock/         # Stock management
│   ├── reorder-alert/ # Reorder alert system
│   └── ...
├── shared/            # Shared resources
└── main.ts            # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Docker Commands

- `docker-compose up -d` - Start the application and database in detached mode
- `docker-compose down` - Stop the application and database
- `docker-compose down -v` - Stop the application and remove all data volumes
- `docker-compose logs -f` - View logs from all containers
- `docker-compose logs -f app` - View logs from the application only
- `docker-compose logs -f postgres` - View logs from the database only
