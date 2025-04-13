# Laravel Survey API

A robust RESTful API for survey management built with Laravel, providing endpoints for creating, managing, and analyzing surveys.

## Features

- User Authentication & Authorization
- Survey Creation and Management
- RESTful API Endpoints
- Real-time Survey Results
- Postman Collection for API Testing

## Tech Stack

- **Backend:** Laravel 10.x
- **Database:** MySQL
- **Authentication:** Laravel Sanctum
- **API Testing:** Postman Collection

## Prerequisites

- PHP >= 8.1
- Composer
- MySQL
- Postman (for API testing)

## Installation

1. Clone the repository
```bash
git clone https://github.com/mitesh-ko/Laravel-react-survey.git
```

2. Install PHP dependencies
```bash
composer install
```

3. Configure environment variables
```bash
cp .env.example .env
# Update database and other configurations in .env file
```

4. Generate application key
```bash
php artisan key:generate
```

5. Run database migrations
```bash
php artisan migrate
```

6. Start the development server
```bash
php artisan serve
```

## API Documentation

The API documentation is available as a Postman collection. You can find it in the `docs` directory of the project. The collection includes:

- Authentication endpoints
- Survey management endpoints
- Response collection endpoints

To use the Postman collection:
1. Import the collection file into Postman
2. Set up the environment variables in Postman
3. Start testing the API endpoints

## API Usage

1. Register a new user or login to get authentication token
2. Use the token in Authorization header for protected endpoints
3. Create and manage surveys using the provided endpoints
4. Collect and analyze survey responses

## API Endpoints

### Authentication (Public)
- POST `/api/signup` - Register new user
- POST `/api/login` - Login user

### Authentication (Protected)
- POST `/api/logout` - Logout user
- GET `/api/my-details` - Get authenticated user details

### Surveys (Protected)
- GET `/api/survey` - List all surveys
- POST `/api/survey` - Create new survey
- GET `/api/survey/{slug}` - Get survey details by slug
- PUT `/api/survey/{slug}` - Update survey
- DELETE `/api/survey/{slug}` - Delete survey

### Surveys (Public)
- GET `/api/survey/get-by-slug/{slug}` - Get public survey by slug

### Survey Answers
- GET `/api/survey/{slug}/answer` - Get survey answers (Protected)
- POST `/api/survey/{slug}/answer` - Submit survey answer (Public)

### Dashboard (Protected)
- GET `/api/dashboard` - Get dashboard data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
