const express = require("express");
const app = express();
const keys = require("./keys.js");// local file containing api key object
const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;
const { response } = require("express");

const port = 3000;

function donwloadImg(url) {
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
    res.send("this is the response");
    var data = "";
    const url = "https://api.nasa.gov/planetary/apod?api_key=" + keys.apiKeys.nasa;
    console.log(url);
    https.get(url, (res) => {
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            const jsonData = JSON.parse(data);
            console.log(jsonData.hdurl);
            donwloadImg(jsonData.hdurl);
        })
    }).on("error", (error) => {
        console.log(error);
    });
    
   // console.log(keys.apiKeys.nasa); // this gets the api key from my keys.js file
    // get data from nasa api
});

app.listen(port, ()=> {
    console.log("port 3000 live");
});
