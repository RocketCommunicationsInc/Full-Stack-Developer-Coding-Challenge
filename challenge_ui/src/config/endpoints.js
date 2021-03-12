const base = 'http://localhost:5000/'

module.exports = Object.freeze({
    LOGIN: () => { return base + 'login' },
    REGISTER: () => { return base + 'register' },
    DATA: (param) => { return base + `data/${param}` }
});