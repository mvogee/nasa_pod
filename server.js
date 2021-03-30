const express = require("express");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("this is the response");
})

app.listen(3000, ()=> {
    console.log("port 3000 live");
});
