const { logRegister } = require("../tools/log");

exports.customErros = (
    err,
    req,
    res
) => {
    res.status(err.status || 500).json({
        path: req.path,
        status: err.status || 500,
        message: err.message || "Internal Server Error",
        error: err.errors,
        stack: err.stack,
    });
    logRegister(err.message);
    throw console.error(err.message);
}