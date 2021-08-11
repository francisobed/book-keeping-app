const errorMiddlewareHandler = (error, req, res, next) => {
    //set statusCode

    const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(errorStatusCode);
        res.json({ message: error.message, })
    next();
}

module.exports = { errorMiddlewareHandler };