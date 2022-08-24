import express from 'express';
import dotenv from 'dotenv';
import apiRoute from './routes/index.route.js';
import conectarDB from './utils/db.js';


const app = express();
dotenv.config();
conectarDB();
app.use(express.json());

apiRoute(app);

app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto: ${process.env.PORT}`)
})