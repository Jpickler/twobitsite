const express = require('express');
require("dotenv").config();
const morgan = require('morgan');
const app = express();

const port = process.env.PORT || 3000;

//used for client side processing
// const client = require('../db/client.cjs');
// client.connect();

app.use(morgan("dev"));

app.use(express.json());

// app.use(express.static(__dirname+"../client/dist"))

app.use("/api", require("./api/index.cjs"));

// app.use( express.static(path.join(__dirname, './dist')));
app.use( express.static((__dirname, './dist')));


// app.use('/', (req, res) => {
//     // this is where the link to the home page would go

//   // res.send('<h1> Hello World </h1>');
//   res.send(__dirname + "./dist");
// });




app.listen(port, ()=>{
  console.log('Listening on port', port)
});
