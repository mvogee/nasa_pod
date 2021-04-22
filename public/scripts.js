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
    }
).then(
    (data) => {
        copyright.innerHTML = "photo credit: " + data.copyright;
        header.innerHTML = data.title;
        explanation.innerHTML = data.explanation;
        if (data.media_type === "video") {
            let video = document.querySelector("iframe");
            video.classList.toggle("videoBackgroundOn");
            video.classList.toggle("videoBackgroundOff");
            video.setAttribute("src", data.url + "&autoplay=1&controls=0&showinfo=0&autohide=0&fs=0&loop=1&mute=1");
        }
        else {
            body.setAttribute("style", "background-image: url(\"" + data.hdurl + "\");");
        }
        
    }
);