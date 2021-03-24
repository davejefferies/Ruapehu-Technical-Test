'use strict'

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const apiServer = require('./src/server');

describe('GET /api/v1/query?num=59&icon=1', () => {
    let server;

    beforeEach(async () => {
        server = await apiServer.init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/query?num=59&icon=1'
        });
        expect(res.statusCode).to.equal(200);
    });
});