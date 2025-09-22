# Monarch Contact API

A simple and elegant contact form API that sends email notifications to administrators and confirmation emails to users.

## Features

- ✅ Contact form endpoint with validation
- ✅ Email notifications to admin
- ✅ Confirmation emails to users
- ✅ Beautiful HTML email templates
- ✅ Input validation and sanitization
- ✅ Error handling and logging
- ✅ CORS support
- ✅ Environment-based configuration

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Configuration
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_NAME=Admin

# Company Information
COMPANY_NAME=Your Company Name
COMPANY_WEBSITE=https://yourcompany.com
```

### 3. Gmail Setup (if using Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`

### 4. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Documentation

### POST /api/contact

Submit a contact form.

**Request Body:**

```json
{
  "firstName": "John",
  "email": "john@example.com",
  "message": "Hello, I would like to know more about your services."
}
```

**Validation Rules:**

- `firstName`: Required, 2-50 characters, letters and spaces only
- `email`: Required, valid email format
- `message`: Required, 10-1000 characters

**Success Response (200):**

```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you soon!",
  "data": {
    "firstName": "John",
    "email": "john@example.com",
    "submittedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "First name is required",
      "param": "firstName",
      "location": "body"
    }
  ]
}
```

### GET /health

Health check endpoint.

**Response (200):**

```json
{
  "status": "OK",
  "message": "Monarch Contact API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Email Templates

The system sends two emails:

1. **Admin Notification**: Sent to `ADMIN_EMAIL` with contact form details
2. **User Confirmation**: Sent to the user confirming their submission

Both emails are beautifully formatted with HTML templates and include:

- Company branding
- Responsive design
- Clear typography
- Professional styling

## Project Structure

```
monarch/
├── app.js                 # Main application file
├── routes/
│   └── contactRoutes.js   # Contact form routes
├── controllers/
│   └── contactController.js # Contact form logic
├── helpers/
│   └── emailHelper.js     # Email service and templates
├── .env.example          # Environment variables template
└── package.json          # Dependencies and scripts
```

## Testing the API

### Using curl:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I would like to know more about your services."
  }'
```

### Using Postman:

1. Create a new POST request
2. URL: `http://localhost:3000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "firstName": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to know more about your services."
}
```

## Environment Variables

| Variable          | Description              | Example                   |
| ----------------- | ------------------------ | ------------------------- |
| `PORT`            | Server port              | `3000`                    |
| `NODE_ENV`        | Environment              | `development`             |
| `EMAIL_USER`      | Gmail username           | `your-email@gmail.com`    |
| `EMAIL_PASS`      | Gmail app password       | `your-app-password`       |
| `ADMIN_EMAIL`     | Admin notification email | `admin@yourcompany.com`   |
| `ADMIN_NAME`      | Admin name               | `Admin`                   |
| `COMPANY_NAME`    | Company name for emails  | `Your Company Name`       |
| `COMPANY_WEBSITE` | Company website          | `https://yourcompany.com` |

## Troubleshooting

### Email not sending?

1. Check your SMTP credentials
2. Verify the email service configuration on startup
3. Check the console for error messages
4. Ensure your email provider allows SMTP access

### Validation errors?

- Check that all required fields are provided
- Ensure email format is valid
- Verify field length requirements

### CORS issues?

- The API includes CORS middleware
- For production, configure specific origins if needed

## License

ISC
