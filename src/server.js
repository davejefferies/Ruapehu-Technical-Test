const hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const routes = require('./routes');

const loadRoutes = async () => {
    await server.register(inert);

    routes.forEach((route) => {
        server.route(route);
    });
}

const server = hapi.server({
    host: 'localhost',
    port: 3000
});

exports.init = async () => {
    await loadRoutes();
    await server.initialize();
    return server;
};

exports.start = async () => {
    await loadRoutes();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});