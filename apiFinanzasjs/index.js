const express = require('express');
const port = (process.env.port || 3000);

const app = express();

require('dotenv').config()

app.use(express.json());

app.set('port', port);

app.use('/api', require('./routes/registros.routes.js'));
app.use('/api', require('./routes/auth.routes.js'));

app.listen(app.get('port'), (err) => {
    if (err) {
        console.log('error al inciar el servidor: ' + err);
    } else {
        console.log('Servidor iniciado en el puerto: ' + port);
    }
});

module.exports = app;