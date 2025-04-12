const { app, sequelize } = require('./app');
const port = 3002;

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Product service running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });
