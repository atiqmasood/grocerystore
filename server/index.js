const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors');
const port = 8888
const {BASE_URL, API_KEY} = require('./endPoints');

app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/product', function (req, res) {
    const {query, number} = req.query;
    request(`${BASE_URL}/search?apiKey=${API_KEY}&query=${query}&number=${number}`, function (error, response, body) {
        res.json(JSON.parse(body))
    })
})

app.listen(port,
    () => console.log(`app listening at http://localhost:${port}`)
)