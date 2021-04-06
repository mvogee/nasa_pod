var header = document.querySelector(".title");
var explanation = document.querySelector(".explanation");
var copyright = document.querySelector(".copyright");
var body = document.querySelector("body");

const url = "http://localhost:3000/nasa";
fetch(url)
.then(
    (response) => {
        console.log(response);
        return (response.json())
    } // same as functino(response) {return response.text();};
).then(
    (data) => {
        copyright.innerHTML = "photo credit: " + data.copyright;
        header.innerHTML = data.title;
        explanation.innerHTML = data.explanation;
        body.setAttribute("style", "background-image: url(\"" + data.hdurl + "\");");
        //console.log(data.copyright)
    }
);