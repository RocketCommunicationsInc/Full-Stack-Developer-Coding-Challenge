import axios from 'axios';

const api = {
    GET: async (params, config, cb, error) => {
        try {
            let res = await axios.get(params.url, config, { crossdomain: true });
            cb(res.data);
        } catch (e) {
            error(e);
        }
    },

    POST: async (params, data, cb, error) => {
        try {
            let res = await axios.post(params.url, data, { crossdomain: true });
            cb(res.data);
        } catch (e) {
            error(e.response);
        }
    },

    PUT: async (params, cb, error) => {

    }
}

export default api;