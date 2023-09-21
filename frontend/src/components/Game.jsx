import { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import axios from 'axios';

function Game () {
    let rendered1 = false;
    let rendered2 = false;
    let backendWord = "";
    const [word, setWord] = useState("");
    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState("");
    const [scrambledWord, setScrambledWord] = useState("");
    const [accuracy, setAccuracy] = useState(100)
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [hint, setHint] = useState("");
    const [numHints, setNumHints] = useState(0);
    const [totalHints, setTotalHints] = useState(0);



    useEffect(() => { 
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/getWord',
            headers: { }
          };

        if (word === "" && rendered1 === false){
            axios.request(config)
            .then((response) => {
                if (rendered2 === false){
                    setWord(response.data);
                    console.log(response.data);
                    backendWord = response.data;
                    scramble(response.data);
                    rendered1 = true;
                    rendered2 = true;
                }
                
            })
            rendered1 = true;
        }

    });

    const scramble = (word) => {
        let config = {
            method: "get",
            url: "http://localhost:3000/getscrambledWord?word=" + word,
            headers: { }
        }

        axios.request(config)
            .then((response) => {
                setScrambledWord(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getAccuracy = () => {
        let config = {
            method: "get",
            url: "http://localhost:3000/getAccuracy",
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                setAccuracy(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const getNewWord = () => {
        let config = {
            method: "get",
            url: "http://localhost:3000/getWord",
            headers: { }
        }

        axios.request(config)
            .then((response) => {
                setWord(response.data);
                scramble(response.data)
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err);
            })

        let config1 = {
            method: "post",
            url: "http://localhost:3000/saveWord?word=" + word,
            headers: { }
        }

        axios.request(config1)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log
            })
    }

    const updateGame = () => {
        getNewWord();
    }

    const updateScore = () => {
        let config = {
            method: "patch",
            url: "http://localhost:3000/score?val=1"
        }

        axios.request(config)
            .then()
            .catch((err) => {
                console.log(err);
            })
    }

    const updateIncorrect = () => {
        let config = {
            method: "patch",
            url: "http://localhost:3000/incorrect?val=1",
            headers: { }
        }

        axios.request(config)
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    const getIncorrect = () => {
        let config = {
            method: "get",
            url: "http:localhost:3000/getIncorrect",
            headers: { }
        }

        axios.request()
    }

    const handleSubmit = () => {
        let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/guessWord?word=${guess}`,
        headers: { }
        };
        
        axios.request(config)
            .then((response) => {
                if(response.data === true) {
                    setScore(score + 1);
                    notification.success({
                        message: "Correct!",
                        description: "You guessed the word correctly!",
                        placement: "bottomRight",
                        duration: 2
                    });
                    updateGame();
                    updateScore();
                    setAccuracy((((score + 1)/(score + 1 + incorrectGuesses)) * 100).toFixed(2));
                    setHint("");
                    setNumHints(0);

                } else {
                    notification.error({
                        message: "Incorrect!",
                        description: "You guessed the word incorrectly!",
                        placement: "bottomRight",
                        duration: 2
                    });
                    updateIncorrect();
                    setIncorrectGuesses(incorrectGuesses + 1);
                    setAccuracy(((score/(score + incorrectGuesses + 1)) * 100).toFixed(2));
                }
                setGuess("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getHint = () => {
        if (numHints === 0){
            setHint("Unscrambled Word: " + word[0].charAt(0));
            setNumHints(1);
            setTotalHints(totalHints + 1);
        }else if (numHints < word[0].length - 3){
            setHint(hint + word[0].charAt(numHints));
            setNumHints(numHints + 1);
            setTotalHints(totalHints + 1);
        }else{
            notification.error({
                message: "Too many hints!",
                description: "You have gotten too many hints!",
                placement: "bottomRight",
                duration: 2
            });
        }
        
    }


    return <div className="card">
        <h2>Scrambled Word: {scrambledWord}</h2>
        <br></br>
        <h4>{hint}</h4>
        <Input size="large" placeholder="Enter your guess"
            onChange={(input) => {setGuess(input.target.value); }}
            value={guess} />
        <br /> <br />
        <Button type="primary" size="large" onClick={handleSubmit}>Submit</Button>&nbsp;&nbsp;
        <Button type="default" size="large" onClick={getHint}>Get Hint</Button>
        <br />
        <h3>Statistics</h3>
        <p> Score: {score} </p>
        <p>Incorrect Guesses: {incorrectGuesses}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Hints Used: {totalHints}</p>
    </div>
    
    
}

export default Game;