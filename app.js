let scores, roundScored, playerTurns, Playing;

// My functions

// Function for before to start the game
const beforePlay = () => {
    scores = [0, 0];
    playerTurns = 0;
    roundScored = 0;
    Playing = true;

    // Starts the game with no dice
    document.getElementById("dice-1").style.display = "none";
    // Reset Scores and Player Names
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("points-0").textContent = "0";
    document.getElementById("points-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner")
    document.querySelector(".player-1-panel").classList.remove("winner")
    document.querySelector(".player-0-panel").classList.remove("active")
    document.querySelector(".player-1-panel").classList.remove("active")
    document.querySelector(".player-0-panel").classList.add("active")


}

// Function for switch players
const switchPlayer = () => {
    //playerTurns === 0 ? playerTurns = 1 : playerTurns = 0;
    if (playerTurns === 0) {
        playerTurns = 1;
    } else {
        playerTurns = 0;
    }
    roundScored = 0;

    // Reset the points when roll number 1
    document.getElementById("points-0").textContent = "0";
    document.getElementById("points-1").textContent = "0";
    // Switch background for the active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

}

beforePlay();

document.querySelector(".btn-new").addEventListener("click", beforePlay);

document.querySelector(".btn-roll").addEventListener("click", () => {
    if (Playing) {
        // Get the random number
        let dice1 = Math.ceil(Math.random() * 6);
        // Display the dice and roll
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-1").src = `images/d-${dice1}.png`;
        // Change player if dice shows number 1
        if (dice1 !== 1) {
            // Add score
            roundScored += dice1;
            document.querySelector("#points-" + playerTurns).textContent = roundScored;
        } else {
            // Call the switchPlayer function 
            switchPlayer()
        }
    }
})

document.querySelector(".btn-hold").addEventListener("click", () => {
    if (Playing) {
        scores[playerTurns] += roundScored;
        document.querySelector("#score-" + playerTurns).textContent = scores[playerTurns];

        let input = document.querySelector(".final-score").value;
        let finalSocre;

        if (input) {
            finalSocre = input;
        } else {
            finalSocre = 50;
        }
        // Check if the player has already won the game or not.
        if (scores[playerTurns] >= finalSocre) {
            document.querySelector("#name-" + playerTurns).textContent = "Winner!";
            document.querySelector(".player-" + playerTurns + "-panel").classList.add("Winner");
            document.querySelector(".player-" + playerTurns + "-panel").classList.remove("active");
            Playing = false;
        } else {
            switchPlayer()
        }
    }

})