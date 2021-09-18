const fs = require('fs');  // import file system

const requestHandler = (req, res) => {
const url = req.url;
const method = req.method;
if (url === '/') { // Return a greeting message on the "/" route
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node JS Assignment - Basics </title></head>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    ); // "/" page, add a <form> with a "username" <input> that is submitted using a POST request to "/create-user
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write('<body><ul><li>Batman</li><li>Superman</li></ul></body>'); // Return a list of dummy users on the "/users" route
    res.write('</html>');
    return res.end();
  }
  // Send a HTML response with some "Page not found text
  if (url === '/create-user') {
    const body = [];  // create empty array "body" to store data chunks
    req.on('data', chunk => {
        body.push(chunk); // push the data into the data array
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); // create a buffer of all the data and convert to string
      console.log(parsedBody.split('=')[1]); // split on equal sign to see value username=whatever-the-user-entered
    });
    res.statusCode = 302; // redirect status code
    res.setHeader('Location', '/'); // redirect the browser to /
    res.end();// exit function
  };
}
module.exports = requestHandler;