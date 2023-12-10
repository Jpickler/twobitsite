
import './flags.css';

import { useState, useEffect } from 'react';
import flagData from './flagDataFile.jsx';


const Flags = () => {

  const [button1Name, setButton1Name] = useState("button 1");
  const [button2Name, setButton2Name] = useState("button 2");
  const [button3Name, setButton3Name] = useState("button 3");
  const [button4Name, setButton4Name] = useState("button 4");
  const [theFlagImage, setTheFlagImage] = useState(``);

  //Variables to adjust dificulty and expand with more flags:
  const numFlags = 50;
  const numberOfAnswers = 4; // later can add more buttons


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

    const assignButton = async () => {

      for (let i = 1; i < 5; i++) {
        if (isAnswer) {
          //do this for the first iteration.. it is the answer
          const randomAnswer = (Math.floor(Math.random() * possibleFlags.length)) + 1;
          setTheFlagImage(flagData[randomAnswer].flagImage);
          buttonName = flagData[randomAnswer].name;
          console.log(`this is the button name for the answer: `, buttonName);
          //remove the value from the array of choices
          indexOfNumToDelete = possibleFlags.indexOf(randomAnswer); 
          // it is not returning the index of the number
          possibleFlags.splice(indexOfNumToDelete, 1);

          isAnswer = false;
        }else{
        //do this for the remaining answers
        // randomChoice = (Math.floor(Math.random() * possibleFlags.length)) + 1;
        randomChoice = (Math.floor(Math.random() * possibleFlags.length));

        buttonName = flagData[randomChoice].name;
        // console.log(`this is the button name for the choices: `, buttonName);

        //remove the value from the array of choices
        indexOfNumToDelete = possibleFlags.indexOf(randomChoice);
        possibleFlags.splice(indexOfNumToDelete, 1);

        isAnswer = false;
        };

        // randomButton = (Math.floor(Math.random() * possibleChoices.length)) + 1;
        randomButton = (Math.floor(Math.random() * possibleChoices.length));
        buttonChoice = possibleChoices[randomButton];
        console.log(`button choice  generated`, buttonChoice);

        //set the button name
        console.log(`this is the buttonName before the switch`, buttonName);
        switch (buttonChoice) {
          case 1: await setButton1Name(buttonName);// change this to html code and set as a variable
            console.log(`set the first button to: `, buttonName);
            break;
          case 2: await setButton2Name(buttonName);
            console.log(`set the second button to: `, buttonName);
            break;
          case 3: await setButton3Name(buttonName);
            console.log(`set the third button to: `, buttonName);
            break;
          case 4: await setButton4Name(buttonName);
            console.log(`set the fourth button to: `, buttonName);
            break;
        };

        indexOfNumToDelete = possibleChoices.indexOf(buttonChoice);

        //remove the value from the array of choices
        possibleChoices.splice(indexOfNumToDelete, 1);
        console.log(`choices that are left: `, possibleChoices);
      };

    }// end assignButton function


    assignButton();
  };

    useEffect(() => {
      setTheQuestion();
    }, []);






  return (

    // <>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    <>

      <h2> Which State flag is this?</h2>
      <img id="flagImage" src={theFlagImage} alt="picture of a state flag" />
      <button> {button1Name} </button>
      <button> {button2Name} </button>
      <button> {button3Name} </button>
      <button> {button4Name} </button>


    </>
    // )}
    // </>
  );
};

export default Flags


// **************DELETED CODE ********************************

// const setChoices = (i) => {
//   return new Promise((resolve)=> {
//   let num = getRandomFlag();
//   // console.log(num);
//   let buttonName = flagData[num].name;
//   setTheQuestion(buttonName);
//   resolve();
// });
// };


// // getTheAnswer sets the correct answer and includes the answer in the buttons
// const getTheAnswer = () => {
//   return new Promise((resolve)=> {
//   setTheAnswer(flagData[getRandomFlag()]);
//   let buttonName=flagData.name;
//   setTheQuestion(buttonName);
//   resolve();
// });
// };

// //this useEffect sets the question and answers
// useEffect(() => {
//   const setQuestion = async () => {
//     for (let i = 1; i < 5; i++) {
//       await setChoices(i);
//     };
//       await getTheAnswer();
//     setLoading(false)
//   };

//   setQuestion(theAnswer);
// }, []);


// console.log(`outside useEffect the answer: `, theAnswer.name);
// console.log(`button 1 `, button1Name);
// console.log(`button 2 `, button2Name);
// console.log(`button 3 `, button3Name);
// console.log(`button 4 `, button4Name);
