const base = 'https://api.spacetraders.io/'

module.exports = Object.freeze({
    ASTERIOD: {
        FIND: () => { return base + 'game/systems/OE/locations' }
    },
    FLIGHT_PLAN: {
        CREATE: (user) => { return base + `users/${user}/flight-plans` },
        VIEW: (user, id) => { return base + `users/${user}/flight-plans/${id}` }
    },
    GODDS: {
        PURCHASE: (user) => { return base + `users/${user}/purchase-orders` },
        SELL: (user) => { return base + `users/${user}/sell-orders` }
    },
    LOANS: {
        AVAILABLE: () => { return base + 'loans/' },
        TAKE: (user) => { return base + `users/${user}/loans` }
    },
    REGISTER: (user) => { return base + `users/${user}/token` },
    SHIPS: {
        AVAILABLE: () => { return base + 'game/ships' },
        PURCHASE: (user) => { return base + `users/${user}/ship` }
    },
    STATUS: () => { return base + 'game/status' },
    USER: (user) => { return base + `users/${user}` }
});