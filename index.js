const express = require('express');
const bodyParser = require('body-parser');
const mysql =  require('./DBConnection/mySQL')
const { Readable } = require('stream');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/stream', (req, res) => {
    // Set the content type header
    res.setHeader('Content-Type', 'text/plain');
  
    // Create a readable stream to generate data
    const dataStream = generateDataStream();
  
    // Pipe the data stream to the response stream
    dataStream.pipe(res);
  });
  
  // Function to generate a stream of data
  function generateDataStream() {
    const dataStream = new Readable({
      read(size) {
        // Generate data every 500 milliseconds
        let counter = 0;
        const interval = setInterval(() => {
          // Check if the stream has been destroyed
          if (this.destroyed) {
            clearInterval(interval);
            return;
          }
  
          this.push(`Data ${counter++}\n`);
  
          // If counter reaches 10, end the stream
          if (counter === 10) {
            clearInterval(interval);
            this.push(null); // Signal the end of the stream
          }
        }, 500);
      }
    });
  
    return dataStream;
  }
  
  
// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
mysql.init().then(
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      })
)
