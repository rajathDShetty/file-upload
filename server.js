const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS to allow requests from the frontend (adjust origin URL as needed)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Sample user data (In a real-world scenario, use a proper database)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    req.session.isAuthenticated = true;
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  return res.json({ message: 'Logout successful' });
});

// File upload route (protected with checkAuth middleware)
app.post('/upload', checkAuth, upload.single('file'), (req, res) => {
  return res.json({ message: 'File uploaded successfully' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
