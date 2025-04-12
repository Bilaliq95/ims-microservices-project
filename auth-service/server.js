// auth-service/server.js

const { app, sequelize } = require('./app');
const port = 3000;

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Auth service running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });
