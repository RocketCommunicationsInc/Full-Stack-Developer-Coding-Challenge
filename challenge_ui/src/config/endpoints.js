const base = ''

module.exports = Object.freeze({
    LOGIN: () => { return base + 'login' },
    REGISTER: () => { return base + 'register' },
    DATA: (param) => { return base + `data/${param}` }
});