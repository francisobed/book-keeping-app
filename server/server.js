const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = 3000 || process.env.server_PORT;
const usersRoute = require(`./routes/usersRoute`)
const error = require('../server/middlewares/errorMiddlewareHandler');

//connection to db
require('../server/config/dbConnection')();

app.use(express.json());

//Users routes
app.use('/api/v1/users', usersRoute);

//Error Middleware
app.use(error.errorMiddlewareHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

