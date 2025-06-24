require('dotenv').config()

const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors')
const PORT = process.env.PORT;
const path = require('path');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded());
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

const start = async () => {
    try {
        await sequelize.sync()
            .then(
                result => { },
                err => console.log(err)
            );

        app.listen(PORT, () => {
            console.log(`\n\nServer started on ${PORT} port...`)
        })
    } catch (err) {
        console.log(err);
    }
}
start();
