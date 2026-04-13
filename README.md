# Shivam Portfolio Website

A full-stack portfolio website built with Node.js, Express, MongoDB, and EJS with admin panel for managing projects.

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Template Engine:** EJS
- **Authentication:** Express Session
- **File Upload:** Multer

## Features
- ✅ Portfolio website with modern design
- ✅ Admin login system with session-based authentication
- ✅ CRUD operations for projects (Create, Read, Update, Delete)
- ✅ Image upload for projects
- ✅ Featured projects section
- ✅ Responsive design
- ✅ MVC architecture
- ✅ RESTful routes

## Project Structure
```
portfolio_shivam/
├── config/           # Database configuration
├── controllers/      # Route controllers (auth, projects)
├── middleware/       # Authentication middleware
├── models/          # Mongoose models (User, Project)
├── public/          # Static files (CSS, JS, uploads)
│   ├── css/
│   ├── js/
│   └── uploads/
├── routes/          # Express routes
├── utils/           # Utility functions
├── views/           # EJS templates
│   ├── admin/       # Admin panel views
│   ├── auth/        # Authentication views
│   ├── layouts/     # Main layout
│   └── partials/    # Reusable partials (navbar, footer)
├── .env             # Environment variables
├── .gitignore
├── app.js           # Main application file
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   The `.env` file is already created with default values. You can customize:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/portfolio_shivam
   SESSION_SECRET=your_super_secret_key_change_this_in_production
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=admin123
   ```

3. **Make sure MongoDB is running:**
   - Local: Start MongoDB service
   - Or use MongoDB Atlas and update MONGO_URI

4. **Start the application:**
   ```bash
   # Production
   npm start
   
   # Development (with auto-reload)
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Admin Login: http://localhost:3000/auth/login

## Default Admin Credentials
- **Email:** admin@portfolio.com
- **Password:** admin123

⚠️ **Important:** Change these credentials in `.env` file for production!

## Routes

### Public Routes
- `GET /` - Home page with projects
- `GET /about` - About page
- `GET /contact` - Contact page
- `GET /auth/login` - Admin login page
- `POST /auth/login` - Handle login
- `POST /auth/logout` - Handle logout

### Admin Routes (Protected)
- `GET /admin/projects` - View all projects
- `GET /admin/projects/new` - Create project form
- `POST /admin/projects` - Create new project
- `GET /admin/projects/:id/edit` - Edit project form
- `PUT /admin/projects/:id` - Update project
- `DELETE /admin/projects/:id` - Delete project

## Features Guide

### Adding a Project
1. Login to admin panel
2. Click "Add New Project"
3. Fill in project details:
   - Title (required)
   - Description (required)
   - Technologies (comma-separated)
   - Project URL (optional)
   - GitHub URL (optional)
   - Upload image (optional)
   - Set as featured (optional)
   - Display order
4. Click "Create Project"

### Managing Projects
- View all projects in table format
- Edit existing projects
- Delete projects (with confirmation)
- Toggle featured status to show on homepage

## Customization

### Styling
- Main CSS: `public/css/style.css`
- CSS Variables for easy theme customization
- Modify colors in `:root` section

### Content
- Update personal info in views files
- Change social links in `views/partials/footer.ejs`
- Update skills section in `views/home.ejs`

### Images
- Upload project images through admin panel
- Images stored in `public/uploads/`
- Default image: `/uploads/default-project.jpg`

## Security Notes
- Session-based authentication
- Password hashing with bcrypt
- Protected admin routes
- File upload validation
- Input sanitization

## Development Tips
- Use `npm run dev` for auto-reload during development
- Check MongoDB connection if app fails to start
- Clear browser cache if styling doesn't update
- Check console for error messages

## License
MIT License

## Author
Shivam

---

For any issues or questions, please check the console logs and ensure MongoDB is running properly.
