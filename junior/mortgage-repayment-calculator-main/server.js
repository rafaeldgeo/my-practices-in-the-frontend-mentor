const app = require('./app');
const PORT = process.env.PORT | 3000;

// turn on of the server

app.listen(PORT, () => {
     console.log(`Servidor rondando port: ${PORT}`);
});
