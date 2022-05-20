import React, { useState, useMemo, useRef } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import questionChild from "../questions/questions.json"
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'
import { Button, Container, Col } from 'react-bootstrap'; 
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";

function QuizMinor () {
  const [currentIndex, setCurrentIndex] = useState(questionChild.Questions_Child.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const username = sessionStorage.getItem('username');
  const [start, setStart] = useState(false);
  const [winTime, setWinTime] = useState(30);
  const [score, setScore] = useState(0);  


  const childRefs = useMemo(
    () =>
      Array(questionChild.Questions_Child.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );


  const handleStart = () => {
    setStart(true);
  };

  const addTime = () => {
    setWinTime(winTime + 5);

  };

  const showQuizz = () => {
    const readyDiv = document.getElementById('ready');
    const quizDiv = document.getElementById('quiz');

    readyDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    handleStart();
  };

  const remainingTime = ({ remainingTime }) => {
    return (
      <div>
        <h1>{remainingTime}</h1>
      </div>
    );
  };

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < questionChild.Questions_Child.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    const checkWin = document.getElementById('winIcon');
    const checkLoose = document.getElementById('looseIcon');

    setLastDirection(direction)
    updateCurrentIndex(index - 1)

    if (direction === questionChild.Questions_Child[index].good_answer) {
      setScore(score + 50);
      checkWin.style.display = 'block';
      checkLoose.style.display = 'none';
      setWinTime(winTime + 5);
    } else {
      console.log("loose");
      checkWin.style.display = 'none';
      checkLoose.style.display = 'block';
    }

  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < questionChild.Questions_Child.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
    //console.log(dir);
    //console.log(currentIndexRef.current);
   /* if (dir === questionChild.Questions_Child[currentIndexRef.current].good_answer) {
      console.log("Win");
    }*/
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (

    <div>
      <div className="">
        <img src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <div id='ready'>
        <div className='' style={{marginTop: '5%'}}>
              <h1 className=''>Welcome {username} to the child quiz !</h1><br/>
              <h2 className='text-center'>Are you ready ?</h2><br/><br/>
              <Button onClick={showQuizz} style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='button-user rounded-pill col-md-2'>Start</Button><br/><br/>
        </div><br/>
        <div className='offset-md-3 col-size' style={{width: '50%'}}>
          <div className='d-flex offset-md-5'>
            <h2 className='text-center'>How to play ?</h2>
            <img src={require("../Assets/Bot.png")} style={{width:'10%'}} alt="Logo"/>
          </div>
          <p className='text-center' style={{color: 'white', fontWeight: '', fontSize: '20px'}}>Within a time limit, you will have to answer a series of questions on the theme of cybersecurity. Each correct answer gives you extra time. To answer the questions, you must drag and drop the card on one of the sides. At the end of the timer, your score is computed. <br/>Have fun !</p>
        </div>
      </div>

      <div id="quiz" style={{display: 'none'}}>
        <div className='d-flex offset-md-1'>
        <CountdownCircleTimer
            isPlaying={start}
            duration={winTime}
            colors={['#01d976', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 5, 2, 0]}
            initialRemainingTime={winTime}
            size={100}
          >
            {({ remainingTime }) => {
              if (!start) {
                console.log(remainingTime);
              }
              return <h1>{remainingTime}</h1>;
            }}
          </CountdownCircleTimer>
          <div className='col-md-1 offset-md-4' id="winIcon" style={{display: 'none', marginTop: '2%'}}>
        <FaRegCheckCircle color='#01d976' size={40}/>
      </div><br/>
      <div className='col-md-1 offset-md-4' id="looseIcon" style={{marginTop: '2%', display: 'none'}}>
        <FaRegTimesCircle color='red' size={40}/>
      </div><br/>
        <div className='offset-md-3' style={{marginTop: '2%'}}>
            <h1 style={{fontSize: '30px'}}>{username} score : {score}</h1>
        </div>
        </div>

      <div className='cardContainer offset-md-4'>
        {questionChild.Questions_Child.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.title}
            onSwipe={(dir) => swiped(dir, character.title, index)}
            onCardLeftScreen={() => outOfFrame(character.title, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.image + ')' }}
              className='card'
            >

              <div style={{border: '2px solid fuchsia', backgroundColor: '#292a3e', height: '19%', marginTop: '-20%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>3 : {character.up}</p>
              </div>
              <div style={{border: '2px solid gold', backgroundColor: '#292a3e', height: '23%', marginTop: '28%', marginRight: '110%', marginLeft: '-110%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>1 : {character.left}</p>
              </div>
              <div style={{border: '2px solid aqua', backgroundColor: '#292a3e', height: '21%', marginTop: '-11%', marginRight: '-110%', marginLeft: '110%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>2 : {character.right}</p>
              </div>
              <div style={{border: '2px solid lightsalmon', backgroundColor: '#292a3e', height: '19%', marginTop: '36%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>4 : {character.down}</p>
              </div>
              <h3>{character.title}</h3>

            </div>
          </TinderCard>
        ))}
      </div><br/>

      <div className='buttons offset-md-3' style={{marginTop: '27%'}}>
      <button className='button-go' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Answer 1</button>
      <button className='button-aqua' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Answer 2</button>
      <button className='button-fu' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('up')}>Answer 3</button>
      <button className='button-lightsalmon' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('down')}>Answer 4</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Back</button>
      </div>

      </div>


    </div>
  )
}

export default QuizMinor
/*
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>

        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Card !
        </h2>
      )}
*/