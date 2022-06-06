import express from "express";
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";
import {createAdmin, createRoles} from './libs/startSetup'

import genresRoutes from './routes/genres.routes';
import booksRoutes from './routes/books.routes';
import authRoutes from './routes/auth.routes';
import borrowingsRoutes from './routes/borrowings.routes';
import userRoutes from './routes/user.routes';

const app = express();
createRoles();
createAdmin();

//settings
app.set('pkg', pkg);
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        Name: app.get('pkg').name,
        Author: app.get('pkg').author,
        Description: app.get('pkg').description,
        Version: app.get('pkg').version,
    });
})

app.use('/api/genres', genresRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/borrowings', borrowingsRoutes);
app.use('/api/user', userRoutes);

export default app;