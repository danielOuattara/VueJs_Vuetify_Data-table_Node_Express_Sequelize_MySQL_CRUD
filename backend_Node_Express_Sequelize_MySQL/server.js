
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();




const corsOptions = { origin:'http://localhost:8081' };

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded( {extended: true} ));


const db = require('./app/models/');

db.sequelize.sync({ force: true })
.then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route test
app.get ('/', (req, res, next) => {
    res.json({message: "Welcome to Tutorial Application !"})
});

require('./app/routes/tutorial.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




