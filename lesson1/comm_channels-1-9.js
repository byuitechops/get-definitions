/*eslint-env node*/
/*eslint no-unused-vars:0, no-console:0*/

function objToQuery(obj) {
    var query = Object.keys(obj).map(function (key) {
        if (Array.isArray(obj[key])) {
            return obj[key].map(item => key + '[]=' + item).join('&');
        } else {
            return key + '=' + obj[key];
        }
    }).join('&');
    query = '?' + encodeURI(query);
    console.log('query:', query);
    return query;
}

var fs = require('fs'),
    got = require('got'),
    token = require('../getToken.js')('../token.json'),
    color = require('chalk'),
    domain = 'https://canvas.instructure.com',
    apiCall = '/api/v1/users/self/communication_channels',
    query = {
        access_token: token
    };

//test my api key
got(domain + apiCall + objToQuery(query))
    .then(function (response) {
        var body = JSON.parse(response.body);
        console.log("Responce Body:")
        console.log(color.gray(JSON.stringify(body, null, 4)));
        console.log('answer:');
        console.log(color.green('communication channel.id: ' + body[0].id));
    })
    .catch(function (error) {
        console.log(color.red(error.response.body));
    });
