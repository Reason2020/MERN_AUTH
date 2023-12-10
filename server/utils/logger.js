const info = (message) => {
    console.log(message);
};

const error = (error) => {
    console.error(error.message);
};

module.exports = {
    info, error
};