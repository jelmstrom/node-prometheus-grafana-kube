const metrics = require('prom-client');
const express = require('express');
const server = express();

const collectDefaultMetrics = metrics.collectDefaultMetrics;
const Registry = metrics.Registry;
const register = new Registry();



server.get('/metrics', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});

const Histogram = metrics.Histogram;
const h = new Histogram({
	name: 'api',
	help: 'API calls ',
	labelNames: ['httpStatus']
});
register.registerMetric(h);

function registerRequest() {
    console.log(' register ');
	h.labels('204').observe(Math.random());
	h.labels('404').observe(Math.random());
    setTimeout(registerRequest, 4000);
}
registerRequest();

const counter = new metrics.Counter({
  name: 'messages_received',
  help: 'Messages received,  i.e number of events'
});
register.registerMetric(counter);

function registerMessage() {
    console.log(' message ');
    counter.inc();
    setTimeout(registerMessage, (Math.random()*10000));
}

registerMessage();
const gauge = new metrics.Gauge({ 
    name: 'active_connections', 
    help: 'N Umber of active connections, i.e sockets' });
register.registerMetric(gauge);
gauge.set(100);

function connect() {
    gauge.inc();
    setTimeout(connect, (Math.random()*1000));
}


function disconnect() {
    gauge.dec();
    setTimeout(disconnect, (Math.random()*1000));
}
connect();
disconnect();


collectDefaultMetrics({ register });

//Enable collection of default metrics

console.log('Server listening to 3000, metrics exposed on /metrics endpoint');
server.listen(3000);