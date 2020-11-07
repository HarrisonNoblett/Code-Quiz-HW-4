var highscore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

clear.addEventListener("click", function() {
    localStorage.clear();
    localStorage.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = allScores[i].initials + " " + allScores[i].score;
        highscore.appendChild(liEl);
    }
}

back.addEventListener("click", function() {
    window.location.replace("./index.html");
})