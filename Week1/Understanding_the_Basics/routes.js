const fs = require('fs');  // import file system

const requestHandler = (req, res) => {
const url = req.url;
const method = req.method;
    if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    // exit out of function with res.end
    return res.end();

   }
   if (url === '/message' && method === 'POST') {
    const body = []; // create an empty array
    req.on('data', (chunk) => {  // function to be performed for incoming data
    console.log(chunk);
    body.push(chunk);  // fill empty array with data
    });  
    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('='[1]);
        fs.writeFile('message.txt', message, (err) => { // writeFileSync blocks code use writeFile
            res.statusCode = 302; 
            res.setHeader('Location', '/'); // redirect the request back to / with setHeader
            return res.end(); // exit out of function with res.end
        });        
    });     
   }
    res.setHeader('Content-Type', 'text/html');  // respond with meta data for header
    // html code to send
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My First Page');
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Hello from my Node.js</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();     // send it back to the client
};
module.exports = requestHandler;
