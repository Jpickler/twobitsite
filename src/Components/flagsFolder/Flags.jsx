
import './flags.css';

import { useState, useEffect } from 'react';
import flagData from './flagDataFile.jsx';


const Flags = () => {

  const [button1Name, setButton1Name] = useState("button 1");
  const [button2Name, setButton2Name] = useState("button 2");
  const [button3Name, setButton3Name] = useState("button 3");
  const [button4Name, setButton4Name] = useState("button 4");
  const [button1IdName, setButton1IdName] = useState("wrong");
  const [button2IdName, setButton2IdName] = useState("wrong");
  const [button3IdName, setButton3IdName] = useState("wrong");
  const [button4IdName, setButton4IdName] = useState("wrong");
  const [theFlagImage, setTheFlagImage] = useState(``);
  const [correctAnswer, setCorrectAnswer] = useState(``);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [refreshTheBoard, setRefreshTheBoard] = useState(false);
  const [round, setRound] = useState(0);
  const [gameStatus, setGameStatus] = useState(`asking`);
  const [AllHighScores, setAllHighScores] = useState([]);
  const [TheHighestScore, setTheHighestScore] = useState(``);

  //Variables to adjust dificulty and expand with more flags:
  const numFlags = 50;
  const numberOfAnswers = 4; // later can add more buttons
  let numberOfRounds = 2;


  const setTheQuestion = () => {
    const possibleChoices = [1, 2, 3, 4];
    const possibleFlags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    let buttonName = null;
    let buttonChoice = null;
    let isAnswer = true;
    let randomButton = null;
    let indexOfNumToDelete = null;
    let randomChoice = null;
    setRound(round + 1);
    const assignButton = async () => {


      for (let i = 1; i < 5; i++) {
        if (isAnswer) {
          //do this for the first iteration.. it is the answer
          const randomAnswer = (Math.floor(Math.random() * possibleFlags.length)) + 1;
          setTheFlagImage(flagData[randomAnswer].flagImage);
          setCorrectAnswer(flagData[randomAnswer].name);
          buttonName = flagData[randomAnswer].name;
          //remove the value from the array of choices
          indexOfNumToDelete = possibleFlags.indexOf(randomAnswer);
          possibleFlags.splice(indexOfNumToDelete, 1);

        } else {
          //do this for the remaining answers
          randomChoice = (Math.floor(Math.random() * possibleFlags.length));

          buttonName = flagData[randomChoice].name;

          //remove the value from the array of choices
          indexOfNumToDelete = possibleFlags.indexOf(randomChoice);
          possibleFlags.splice(indexOfNumToDelete, 1);
        };

        randomButton = (Math.floor(Math.random() * possibleChoices.length));
        buttonChoice = possibleChoices[randomButton];

        //set the button name
        switch (buttonChoice) {
          case 1: setButton1Name(buttonName);
            if (isAnswer) { setButton1IdName(buttonName) };
            break;
          case 2: setButton2Name(buttonName);
            if (isAnswer) { setButton2IdName(buttonName) };
            break;
          case 3: setButton3Name(buttonName);
            if (isAnswer) { setButton3IdName(buttonName) };
            break;
          case 4: setButton4Name(buttonName);
            if (isAnswer) { setButton4IdName(buttonName) };
            break;
        };
        indexOfNumToDelete = possibleChoices.indexOf(buttonChoice);
        //remove the value from the array of choices
        possibleChoices.splice(indexOfNumToDelete, 1);
        isAnswer = false;
      };
    }// end assignButton function
    assignButton();
  };

  useEffect(() => {
    setTheQuestion();
  }, [refreshTheBoard]);

  const resetTheBoard = () => {
    if (round === numberOfRounds) {
      //end the game
      setGameStatus(`ending`)
      //show score
      // ask to play again
      console.log(`in the resetTheBoard function`);
    } else {
      setRefreshTheBoard(!refreshTheBoard);
    }
  };


  const handleButtonClick = (id) => {
    console.log(`button was clicked id =`, id);
    console.log(`correctAnswer: `, correctAnswer);
    console.log(`id: `, id);
    if (id === correctAnswer) {

      setPlayerScore(playerScore + 1);
      //alert(`That is correct!`);
    } else {
      alert(`Sorry, that is incorrect. The correct answer is: ${correctAnswer}`);
    };

    resetTheBoard();

  };
  const startTheGame = () => {
    console.log(`the start the game button was pressed`);

    setRound(0);
    setPlayerScore(0);

    setGameStatus(`playing`);

    resetTheBoard();
  }

  const getHighScores = async () => {
    // useEffect(()=>{
    const fetchScores = async () => {
      try {
        const request = await fetch("/api/scores");
        const response = await request.json();
        console.log(response);
        setAllHighScores(response);
      } catch (error) {
        console.log(error);
      }

    };
    await fetchScores();
    console.log(`console logging AllHighScores: `, AllHighScores);
    setTheHighestScore(AllHighScores[0].name);
    // },[]);
  };

  const homeScreen = () => {
    setGameStatus(`asking`);
    setPlayerScore(0);
    setRefreshTheBoard(false);
    setRound(0);
    getHighScores();
  }

  useEffect(() => {

    homeScreen();

  }, []);

  const handlePlayerName = (enteredName) =>{
    //write to database the player name and score {playerScore}
    console.log(`the entered name is: `, enteredName);
    setPlayerName(enteredName);
    
    
  }



  // *********************  TO DO ************************
  //get only the top 5 high scores (sorted by most recent)
  // may be able to push new high scores to front of array
  // display high score table
  // allow users to enter name at finish, then save their high score


  return (

    <>
      {gameStatus === "asking" && (
        <>
          <h2>Would you like to play the flag game?</h2>
          <button id="start" onClick={() => (startTheGame())}>Press To Play</button>

          <div id="highScores">
            <p> The last 5 players and their scores: </p>
            <table>
              <tr>
                <th> Player Name</th>
                <th> Score </th>
              </tr>
              {
                AllHighScores.map((player, index) => (
                  <tr>
                    <td> {player.name}</td>
                    <td> {player.score}</td>
                  </tr>
                ))}
            </table>



          </div>
        </>
      )}

      {gameStatus === "playing" && (
        <>
          <h2> The current round is: {round}</h2>
          <h2> Your Score is: {playerScore}</h2>
          <h2> Which State flag is this?</h2>
          <img id="flagImage" src={theFlagImage} alt="picture of a state flag" />
          <button id={button1IdName} onClick={() => handleButtonClick(button1IdName)}> {button1Name} </button>
          <button id={button2IdName} onClick={() => handleButtonClick(button2IdName)}> {button2Name} </button>
          <button id={button3IdName} onClick={() => handleButtonClick(button3IdName)}> {button3Name} </button>
          <button id={button4IdName} onClick={() => handleButtonClick(button4IdName)}> {button4Name} </button>
        </>
      )}

      {gameStatus === "ending" && (
        <>
          <h2>Your score is: {playerScore} out of {numberOfRounds} rounds</h2>

          <label> Enter your Name or initials for the scoreboard 
              <input type= "text" 
                id ="playerName" 
                // value = "playerName" 
                onChange={(event)=> setPlayerName(event.target.value)} // need to find a way to make it submit on enter
              />
            </label>
          <h2> Would you like to play again?</h2>
          <button id="start" onClick={() => (startTheGame())}>Press To Play Again</button>
          <button id="done" onClick={() => (homeScreen())}>I'm Done Playing</button>
        </>
      )}
    </>
  );
};

export default Flags


