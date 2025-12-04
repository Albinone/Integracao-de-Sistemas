const http = require('http');
const path = require('path');

const {getCurrentDate, formatCurrency} = require('./util');
const Logger = require('./logger')

let logger = new Logger('App')


const server = http.createServer((req, res) => {

    logger.log('TESTE');
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(`<p>Current Date:  ${getCurrentDate()} </p>`)
    res.write(`<p>Price:Formatted amount:  ${formatCurrency(99.99)} </p>`)
    res.end()

})

server.listen(3000, () => {

    console.log('Server running at http://localhost:3000');
})