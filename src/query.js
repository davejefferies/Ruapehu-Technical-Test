const https = require('https');
const xml2js = require('xml2js');

const getContent = (url) => {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299)
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            const body = [];
            response.on('data', (chunk) => {
                body.push(chunk)
            });
            response.on('end', () => {
                resolve(body.join(''))
            });
        });
        request.on('error', (err) => {
            reject(err); 
        });
    });
}

const parser = (data) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(data, (error, result) => {
            if (error)
                return reject(new Error(error));
            return resolve(result);
        });
    });
}

const query = {
    forecast: async (request) => {
        const params = request.query;
        try {
            const response = await getContent(`https://reportpal-dev.resorts-interactive.com/mtnxml/${params.num}`);
            const obj = await parser(response);
            let days = obj.report.forecast[0].day.filter((day) => { return parseInt(day['$'].icon) == params.icon; }).map((item) => { return item['$'].name; });
            if (days.length == 0)
                return `There are no days at ${obj.report['$'].name} this week.`;
            return `The days this week that are ${obj.report.forecast[0].day[0]['$'].weather.toLowerCase()} at ${obj.report['$'].name} are: ${days.join(', ')}`;
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    custom: async (request) => {
        const params = request.query;
        return params.custom;
    }
}

module.exports = query;