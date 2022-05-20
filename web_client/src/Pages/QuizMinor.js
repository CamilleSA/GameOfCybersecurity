import React, { useState, useMemo, useRef } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import questionChild from "../questions/questions.json"
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'
import { Button, Container, Col } from 'react-bootstrap'; 


function QuizMinor () {
  const [currentIndex, setCurrentIndex] = useState(questionChild.Questions_Child.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const username = sessionStorage.getItem('username');
  const [start, setStart] = useState(false);
  const [winTime, setWinTime] = useState(30);


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
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
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
    console.log(dir);
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
        <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <div id='ready' className='' style={{marginTop: '5%'}}>
              <h1 className=''>Welcome {username} to the minor quiz !</h1><br/>
              <h2 className='text-center'>Are you ready ?</h2><br/><br/>
              <Button onClick={showQuizz} style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='button-user rounded-pill col-md-2'>Start</Button><br/><br/>
      </div>
      <div id="quiz" style={{display: 'none'}}>
        <div className='d-flex offset-md-1'>
        <CountdownCircleTimer
            isPlaying={start}
            duration={winTime}
            colors={['#01d976', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 5, 2, 0]}
            initialRemainingTime={30}
            size={100}
          >
            {({ remainingTime }) => {
              if (!start) {
                console.log(remainingTime);
              }
              return <h1>{remainingTime}</h1>;
            }}
          </CountdownCircleTimer>
        <div className='offset-md-8' style={{marginTop: '2%'}}>
            <h1 style={{fontSize: '30px'}}>{username} score : 250</h1>
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

              <div style={{backgroundColor: 'red', height: '19%', marginTop: '-18%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>3 : {character.answer[2]}</p>
              </div>
              <div style={{backgroundColor: 'red', height: '110px', marginTop: '25%', marginRight: '110%', marginLeft: '-110%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>1 : {character.answer[0]}</p>
              </div>
              <div style={{backgroundColor: 'red', height: '110px', marginTop: '-14%', marginRight: '-110%', marginLeft: '110%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>1 : {character.answer[1]}</p>
              </div>
              <div style={{backgroundColor: 'red', height: '19%', marginTop: '35%'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px'}}>4 : {character.answer[3]}</p>
              </div>
              <h3>{character.title}</h3>

            </div>
          </TinderCard>
        ))}
      </div><br/>
      <div className='buttons offset-md-3' style={{marginTop: '30%'}}>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('up')}>Swipe Up!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
      </div>


    </div>
  )
}

export default QuizMinor


/*

              <h2 style={{marginTop: '-10%', backgroundColor: 'gray', fontSize: '18px', height: '15% !important', borderRadius: '4%', verticalAlign: 'center'}}>{character.answer[0]}</h2>
              <h2 style={{marginTop: '70%', backgroundColor: 'gray', fontSize: '18px', height: '15% !important', borderRadius: '4%', verticalAlign: 'center'}}>{character.answer[1]}</h2>

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Button, Container, Col } from 'react-bootstrap'; 
import TinderCard from 'react-tinder-card'
import questionChild from "../questions/questions.json"
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'

function QuizMinor () {
  const [currentIndex, setCurrentIndex] = useState(questionChild.Questions_Child.length - 1)
  const [lastDirection, setLastDirection] = useState();
  const username = sessionStorage.getItem('username');
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const [start, setStart] = useState(false);
  const [winTime, setWinTime] = useState(30);

  const handleStart = () => {
    setStart(true);
  };

  const addTime = () => {
    setWinTime(winTime + 5);

  }

  const remainingTime = ({ remainingTime }) => {
    return (
      <div>
        <h1>{remainingTime}</h1>
      </div>
    );
  };
  const childRefs = useMemo(
    () =>
      Array(questionChild.Questions_Child.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  useEffect(() => {
    const divAnswer3 = document.getElementById('answer3');
    const divAnswer4 = document.getElementById('answer4');

    for (let i = 0; i <  questionChild.Questions_Child.length; i++) {
      if (questionChild.Questions_Child[i].answer.length === 2) {
       // divAnswer3.style.display = 'none';
       // divAnswer4.style.display = 'none';
      } else if (questionChild.Questions_Child[i].answer.length === 4) {
      //  divAnswer3.style.display = 'block';
        //divAnswer4.style.display = 'block';
      }

    }

  });

  const canGoBack = currentIndex < questionChild.Questions_Child.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const test = () => {
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const showQuizz = () => {
    const readyDiv = document.getElementById('ready');
    const quizDiv = document.getElementById('quiz');

    readyDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    handleStart();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < questionChild.Questions_Child.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex - 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <div className="">
        <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <div id='ready' className='' style={{marginTop: '5%'}}>
              <h1 className=''>Welcome {username} to the minor quiz !</h1><br/>
              <h2 className='text-center'>Are you ready ?</h2><br/><br/>
              <Button onClick={showQuizz} style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='button-user rounded-pill col-md-2'>Start</Button><br/><br/>
      </div>
      <div id='quiz'  style={{display: 'none'}}>
      <button onClick={test}>TEST</button>

        <div className='chrono offset-md-2 d-flex'>
        <CountdownCircleTimer
            isPlaying={start}
            duration={winTime}
            colors={['#01d976', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 5, 2, 0]}
            initialRemainingTime={30}
            size={100}
          >
            {({ remainingTime }) => {
              if (!start) {
                console.log(remainingTime);
              }
              return <h1>{remainingTime}</h1>;
            }}
          </CountdownCircleTimer>
          <div className='offset-md-7' style={{marginTop: '2%'}}>
            <h1 style={{fontSize: '30px'}}>{username} score : 250</h1>
          </div>
        </div>
        
        <Button id="answer3" className='button-user rounded-pill' style={{fontWeight:'bold', backgroundColor: '#01d976', borderColor: '#01d976'}}>Answer 3</Button>
        <div className='d-flex cardContainer'>
          <div className='col-md-1 offset-md-2' style={{marginTop:'8%'}}>
          <Button className='button-user rounded-pill' style={{fontWeight:'bold', backgroundColor: '#01d976', borderColor: '#01d976'}}>Answer 1</Button>

          </div>

          <div className='col-md-6 offset-md-1'> 
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
              <h3>{character.title}</h3>
            </div>
          </TinderCard>

        ))}
        <div className='offset-md-10' style={{marginTop:'15%'}}>
        <Button className="button-user rounded-pill" style={{fontWeight:'bold', backgroundColor: '#01d976', borderColor: '#01d976', verticalAlign: 'text-top'}}>Answer 2</Button>

        </div>

          </div><br/>

        </div>
        <div id="answer4" style={{marginTop: '15%'}}>
        <Button className='button-user rounded-pill' style={{fontWeight:'bold', backgroundColor: '#01d976', borderColor: '#01d976'}}>Answer 4</Button>

        </div>


        

      </div>
      <div className='buttons'>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('up')}>Swipe Up!</button>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('down')}>Swipe Down!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default QuizMinor


/*



import { Button, Container, Col } from 'react-bootstrap'; 
          <button onClick={addTime}>Add Time</button><br/><br/>

import React, {useState} from "react"
import '../App.css';
import TinderCard from 'react-tinder-card'
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'
import questionChild from "../questions/questions.json"

function QuizMinor() {
  const username = sessionStorage.getItem('username');
  const [start, setStart] = useState(false);
  const [winTime, setWinTime] = useState(30);

  const handleStart = () => {
    setStart(true);
  };

  const addTime = () => {
    setWinTime(winTime + 5);

  }

  const remainingTime = ({ remainingTime }) => {
    return (
      <div>
        <h1>{remainingTime}</h1>
      </div>
    );
  };
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  };
      
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  };

  const Swiped = (direction, index, name, url) => {
    if (direction === "right") {
        console.log("Swipe right");
    }
  };



  return (
    <Container fluid="md">
      <Col md="auto">
      <div className="App col-md-12" style={{backgroundColor: 'transparent'}}><br/>
      <div className="justify-content-center d-flex">
      <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
        <Col xs={12} md={12}>
          <div id='ready' className='offset-md-0' style={{marginTop: '5%'}}>
              <h1 className='text-center'>Welcome {username} to the minor quiz !</h1><br/>
              <h2 className='text-center'>Are you ready ?</h2><br/><br/>
              <Button onClick={showQuizz} style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='button-user rounded-pill col-md-2 offset-md-5'>Start</Button><br/><br/>
          </div>
          <div id='quiz' style={{display: 'none', marginTop: '3%'}}>
              <div className="justify-content-center d-flex">
              <CountdownCircleTimer
            isPlaying={start}
            duration={winTime}
            colors={['#01d976', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 5, 2, 0]}
            initialRemainingTime={30}
            size={120}
          >
            {({ remainingTime }) => {
              if (!start) {
                console.log(remainingTime);
              }
              return <h1>{remainingTime}</h1>;
            }}
          </CountdownCircleTimer>
          <button onClick={addTime}>Add Time</button>

            </div><br/><br/>

                <TinderCard
                  className="swipe offset-md-3"
                  onSwipe={onSwipe}>
                  <div className="">
                    <h1>HEY</h1>
                    {questionChild.Questions_Child.map((question, index) => {
                    <h4>{question.title}</h4>

                    })}
                  </div>
                </TinderCard>

          <div>
          </div>
          </div>
        </Col>
    </div>
      </Col>

    </Container>

  );
}

export default QuizMinor;*/

//                    <img src={require('../questions/' + question.image)}></img>
