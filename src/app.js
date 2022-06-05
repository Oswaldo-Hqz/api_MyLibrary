import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

const app = express();

//settings
app.set('pkg', pkg);
app.set("port", process.env.PORT || 4000);

// Middlewares
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

export default app;