const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();



// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files like CSS, JS, images

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Define base URL for auth service
const authServiceBaseUrl = 'http://auth-service:3000'; // Adjust as necessary

// Render login page
app.get('/login', (req, res) => {
    res.render('login'); // Render the login.ejs page
});

// Render register page
app.get('/register', (req, res) => {
    res.render('register'); // Render the register.ejs page
});

app.get('/products/category/:categoryName', (req, res) => {
    res.render('category', { categoryName: req.params.categoryName });
});

// Login POST request to auth microservice
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await fetch(`${authServiceBaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.success) {

            res.render('home'); // Pass it to the template

        } else {
            res.redirect('/login'); // Redirect back to login if failure
        }
    } catch (err) {
        console.error('Login Error:', err);
        res.redirect('/login'); // In case of error, redirect to login
    }
});

// Register POST request to auth microservice
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, phoneNumber} = req.body;

    try {
        const response = await fetch(`${authServiceBaseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, password, phoneNumber })
        });

        const data = await response.json();
        if (data.success) {
            res.redirect('/login'); // Redirect to login after successful registration
        } else {
            res.redirect('/register'); // Redirect back to register on failure
        }
    } catch (err) {
        console.error('Registration Error:', err);
        res.redirect('/register');
    }
});





// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Frontend is running on http://localhost:${PORT}`);
});
