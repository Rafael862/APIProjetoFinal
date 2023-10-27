require("express-async-errors");
const express = require('express');
const routes = require("./routes");
const app = express();
const AppError = require("./utils/AppError");
//const database = require("./database/sqlite");
const migrationsRun = require("./database/sqlite/migrations");

app.use(express.json());
app.use(routes);
migrationsRun();
//database();
app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    } 
    console.error(error);
    return response.status(500).json({
        status: "error",
        message: "internal server error"
    });
});

const PORT =  3333;
app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));