const express = require("express");
const app = express();
const keys = require("./keys.js");// local file containing api key object
const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;

const port = 3000;
app.use(express.static("./public"));

// const jsonMockData = {
//     date: '2021-04-20',
//     explanation: "What's the best way to explore Mars? Perhaps there is no single best way, but a newly demonstrated method shows tremendous promise: flight. Powered flight has the promise to search vast regions and scout out particularly interesting areas for more detailed investigation.  Yesterday, for the first time, powered flight was demonstrated on Mars by a small helicopter named Ingenuity.  In the featured video, Ingenuity is first imaged by the Perseverance rover sitting quietly on the Martian surface.  After a few seconds, Ingenuity's long rotors begin to spin, and a few seconds after that -- history is made as Ingenuity actually takes off, hovers for a few seconds, and then lands safely.  More tests of Ingenuity's unprecedented ability are planned over the next few months.  Flight may help humanity better explore not only Mars, but Saturn's moon Titan over the next few decades.",
//     media_type: 'video',
//     service_version: 'v1',
//     title: 'Ingenuity: First Flight over Mars',
//     url: 'https://www.youtube.com/embed/wMnOo2zcjXA?rel=0'
//   }
  

// takes the url of the image and downloads the image to the public folder on the server
//! not used. loading image on page from url
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

app.get("/", (req, res) => { // this is never called because we have public set as the static response
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
});

app.get("/nasa", (req, res) => {
    const url = "https://api.nasa.gov/planetary/apod?api_key=" + keys.apiKeys.nasa;
    let data = "";
    https.get(url, (response => {
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            res.send(jsonData); // instert jsonMockData to test video
        }).on("error", (error) => {
            console.log(error);
        });
    }));
    console.log("Getting nasa data");
    
});

app.listen(port, ()=> {
    console.log("port 3000 live");
});
