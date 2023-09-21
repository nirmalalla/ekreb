const express = require('express');
const cors = require('cors');
const axios = require("axios");
const app = express();
const PORT = 3000; // May need to change PORT to something else if 3000 is already in use

app.use(cors());

let score = 0;
let currentWord = "";
let incorrectGuesses = 0;

app.get('/score', (req, res) => {
    res.send(`${score}`);
});

app.patch('/score', (req, res) => {
    score += parseInt(req.query.val);
    res.status(200).send(`${score}`);
})

//Endpoint to get the amout of incorrect guesses
app.get("/getIncorrect", (req, res) => {
    res.send(incorrectGuesses);
})

//Endpoint to increment amount of incorrect guesses
app.patch("/incorrect", (req, res) => {
    incorrectGuesses += parseInt(req.query.val);
    res.status(200).send(`${incorrectGuesses}`);
})

//Endpoint to get the random word from an API
app.get('/getWord', async (req, res) => {
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/word")
        .then((response) => {
            currentWord = response.data[0];
            res.send(response.data);
        }).catch((error) => {
            console.log(error);
        });

   
    } catch (error) {
        console.error(error);
    }
})

//Endpoint to save the word
app.post("/saveWord", (req, res) => {
    currentWord = req.query.word;
    res.send("updated!");
})

//Endpoint to get the current word
app.get("/getCurrentWord", (req, res) => {
    res.send(currentWord);
})

//Endpoint to check if the word is correct
app.patch('/guessWord', (req, res) => {
    if(req.query.word === currentWord) {
        res.status(200).send('true');
    } else {
        res.status(200).send('false');
    }
})

//Endpoint to get accuracy
app.get("/getAccuracy", (req, res) => {
    console.log("Accuracy from backend: " + ((score/(score + incorrectGuesses)) * 100));
    res.send((score/(score + incorrectGuesses)) * 100);
})

//Function to scramble the word
function scrambleWord(word){
    word = word + "";
    const arr = word.split("");
    let i;
    let j;
    let k;

    for (i = 0; i < arr.length; i++){
        j = Math.floor(Math.random() * i);
        k = arr[i];
        arr[i] = arr[j];
        arr[j] = k;
    }

    word = arr.join("");
    return word;
}

//Endpoint to get the scrambled word
app.get("/getScrambledWord", async (req, res) => {
    res.send(await scrambleWord(req.query.word));
})

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});