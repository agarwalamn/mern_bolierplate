const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());

// DB Config
const db = require(config)

// Connect to Mongo
mongoose.connect(db, { 
          useNewUrlParser: true,
          useCreateIndex: true
        }) 
  // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//use routes
app.use('/ROUTE', require('./routes/YOUR_FILE'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));

