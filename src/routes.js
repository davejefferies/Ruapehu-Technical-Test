const path = require('path');
const query = require('./query');

var routes = [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.join(__dirname, 'public'),
                index: ['index.html']
            }
        }
    },
    {
        method: 'GET',
        path: '/query',
        handler: async (request, reply) => {
            let result = await query.forecast(request);
            return {
                result
            }
        }
    },
    {
        method: 'GET',
        path: '/custom-query',
        handler: async (request, reply) => {
            let result = await query.custom(request);
            return {
                result
            }
        }
    }
];

routes.forEach((route) => {
    if (route.path != '/{param*}')
        route.path = '/api/v1' + route.path;
});

module.exports = routes;