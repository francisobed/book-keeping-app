const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = 3000 || process.env.server_PORT;
const error = require('../server/middlewares/errorMiddlewareHandler');
// routes
const usersRoute = require(`./routes/usersRoute`);
const bookRouter = require('./routes/booksRoutes')
//connection to db
require('../server/config/dbConnection')();

app.use(express.json());

//Users routes
app.use('/api/v1/users', usersRoute);
//Books routes
app.use('/api/v1/books', bookRouter)

//Error Middleware
app.use(error.errorMiddlewareHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

