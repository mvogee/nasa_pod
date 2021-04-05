//TODO: figure out how to get the image to display on the html page after it is downloaded
//TODO: figure out how to get the title and explanation from the server to the page
//TODO: figure out when you should download the image. can we avoid having to download it on every request to the server? like donwload it once a day and store it in public where the client can access it as soon as the content is sent?


const express = require("express");
const app = express();
const keys = require("./keys.js");// local file containing api key object
const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;
//const { response } = require("express");

const port = 3000;
app.use(express.static("./public")); // this is the static available folder
//! send the public folder with the basic html and css and javascript
//! the javascirpt will make the get request to here for the nasa content
//! at that point you can set the page contnet based on the content grabbed from the server
//!
// takes the url of the image and downloads the image to the public folder on the server.
function donwloadImg(url) { // could make this function only run once a day and update the image??
    https.request(url, (res) => {
        var data = new Stream();
        res.on("data", (chunk) => {
            data.push(chunk);
        });
        res.on("end", () => {
            fs.writeFileSync('./public/images/POD.jpg', data.read());
        });
        res.on("error", (error) => {
            console.log(error);
        })
    }).on("error", (error) => {
        console.log(error);
    }).end();
}

app.get("/", (req, res) => {
    var data = "";
    console.log("A get request is made!");
    const url = "https://api.nasa.gov/planetary/apod?api_key=" + keys.apiKeys.nasa;
    console.log(url);
    https.get(url, (response) => {
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const jsonData = JSON.parse(data);
            console.log(jsonData.hdurl);
            donwloadImg(jsonData.hdurl);
        });
    }).on("error", (error) => {
        console.log(error);
    });
    res.sendFile(__dirname + "/public/index.html");
   // console.log(keys.apiKeys.nasa); // this gets the api key from my keys.js file
    // get data from nasa api
});

app.listen(port, ()=> {
    console.log("port 3000 live");
});
