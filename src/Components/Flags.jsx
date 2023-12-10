
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
  const [refreshTheBoard, setRefreshTheBoard] = useState(false);
  const [round, setRound] = useState(0);
  const [gameStatus, setGameStatus] = useState(`asking`);

  //Variables to adjust dificulty and expand with more flags:
  const numFlags = 50;
  const numberOfAnswers = 4; // later can add more buttons
  let numberOfRounds = 5;


  // const getRandomFlag = () => {
  //   return (Math.floor(Math.random() * numFlags) + 1);
  // };

  const setTheQuestion = () => {
    const possibleChoices = [1, 2, 3, 4];
    const possibleFlags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    let buttonName = null;
    let buttonChoice = null;
    let isAnswer = true;
    let randomButton = null;
    let indexOfNumToDelete = null;
    let randomChoice = null;
    setRound(round+1);
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

        }else{
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
          case 1: await setButton1Name(buttonName);
            if (isAnswer) {setButton1IdName(buttonName)};
            break;
          case 2: await setButton2Name(buttonName);
            if (isAnswer) {setButton2IdName(buttonName)};
            break;
          case 3: await setButton3Name(buttonName);
          if (isAnswer) {setButton3IdName(buttonName)};
            break;
          case 4: await setButton4Name(buttonName);
            if (isAnswer) {setButton4IdName(buttonName)};
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
      if (round === numberOfRounds){
        //end the game
        setGameStatus(`ending`)
        //show score
        // ask to play again


      }else{
      setRefreshTheBoard(!refreshTheBoard);

      }

    };


    const handleButtonClick = (id) => {
      console.log(`button was clicked id =`, id);
      console.log(`correctAnswer: `, correctAnswer);
      console.log(`id: `, id);
      if(id===correctAnswer){

        setPlayerScore(playerScore+1);
        //alert(`That is correct!`);
      }else{
        alert(`Sorry, that is incorrect. The correct answer is: ${correctAnswer}` );
      };

      resetTheBoard();

    };
    const startTheGame =() =>{
      setGameStatus(`playing`);
      resetTheBoard();
    }
    const homeScreen = () => {
      setGameStatus(`asking`);
      setPlayerScore(0);
      setRefreshTheBoard(false);
      setRound(0);
    }



  return (

    <>
    {gameStatus === "asking" && (
      <>
        <h2>Would you like to play the flag game?</h2>
        <button id="start" onClick={()=>(startTheGame())}>Press To Play</button>
      </>
    )}

    {gameStatus === "playing" && (
      <>
      <h2> The current round is: {round}</h2>
      <h2> Your Score is: {playerScore}</h2>
      <h2> Which State flag is this?</h2>
      <img id="flagImage" src={theFlagImage} alt="picture of a state flag" />
        <button id = {button1IdName} onClick={() => handleButtonClick(button1IdName)}> {button1Name} </button>
        <button id = {button2IdName} onClick={() => handleButtonClick(button2IdName)}> {button2Name} </button>
        <button id = {button3IdName} onClick={() => handleButtonClick(button3IdName)}> {button3Name} </button>
        <button id = {button4IdName} onClick={() => handleButtonClick(button4IdName)}> {button4Name} </button>
        </>
    )}

    {gameStatus === "ending" && (
      <>
        <h2>Your score is: {playerScore} out of {numberOfRounds} rounds</h2>
        <h2> Would you like to play again?</h2>
        <button id="start" onClick={()=>(startTheGame())}>Press To Play</button>
        <button id="done" onClick={()=>(homeScreen())}>I'm done playing</button>
      </>
    )}
  </>
  );
};

export default Flags


