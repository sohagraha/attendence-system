const error = (message = 'Someting Went Wrong', status = 500) => {
    const err = new Error(message);
    err.status = status;
    throw err;
}
module.exports = error;