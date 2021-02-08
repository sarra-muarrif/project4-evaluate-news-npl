const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))
console.log(__dirname)

//Declare your API credentials
const BASE_URL = "https://api.meaningcloud.com/sentiment-2.1"
const API_Key = process.env.API_KEY
console.log(`Your API Key is ${API_Key}`);

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', (req, res) => {
    res.send(mockAPIResponse)
})

/* TODO:
    1. GET the url from the request body
    2. Build the URL
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const projectData = {
       score_tag : mcData.score_tag,
       agreement : mcData.agreement,
       subjectivity : mcData.subjectivity,
       confidence : mcData.confidence,
       irony : mcData.irony
     }
*/
//Post Router
app.post('/addUrl', async (req, res) => {
    const { url } = req.body;
    console.log(`your entered url = ${url}`)
    const URL = `${BASE_URL}?key=${API_Key}&url=${url}&lang=en`;
    const response = await fetch(URL);
    try {
        const mcData = await response.json();
        // console.log(mcData, "Data")
        const projectData = {
            score_tag : mcData.score_tag,
            agreement : mcData.agreement,
            subjectivity : mcData.subjectivity,
            confidence : mcData.confidence,
            irony : mcData.irony
          }
        res.send(projectData);
    } catch (error) {
        console.log(error)
    }
})

//Spin up the server
const port = 8081
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})