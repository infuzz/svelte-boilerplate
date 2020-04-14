
const prerender = require('prerender');
var server = prerender({
    logRequests: true,
});
server.start();

