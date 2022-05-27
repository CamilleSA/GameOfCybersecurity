import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import questionChild from "../questions/questions.json"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button, Table, Spinner } from 'react-bootstrap'; 
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
const result = [];

function QuizMajor() {
  const [currentIndex, setCurrentIndex] = useState(questionChild.Questions_Adult.length - 1);
  //const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  const username = sessionStorage.getItem('username');
  const [start, setStart] = useState(false);
  const [winTime, setWinTime] = useState(30);
  const [score, setScore] = useState(0);  
  const [saveAnswer, setSaveAnswer] = useState([]);
  const canSwipe = currentIndex >= 0;

  const childRefs = useMemo(
    () =>
      Array(questionChild.Questions_Adult.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );


  const handleStart = () => {
    setStart(true);
  };
  

  const showQuizz = () => {
    const readyDiv = document.getElementById('ready');
    const quizDiv = document.getElementById('quiz');

    readyDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    handleStart();
  };

  /*const remainingTime = ({ remainingTime }) => {
    return (
      <div>
        <h1>{remainingTime}</h1>
      </div>
    );
  };*/

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  };

  const sendScore = () => {
    const userScore = sessionStorage.getItem('score');
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");

    const raw = JSON.stringify({"username": username, "difficulty": 1, "score": parseInt(userScore)});
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    console.log(raw);
    fetch(`http://localhost:5000/addScore`, requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response);
    }).catch (function(error) {
        console.log(error);
    })
  };
  //const canGoBack = currentIndex < questionChild.Questions_Adult.length - 1
  

  useEffect(() => {
    sessionStorage.setItem('score', score);
   // console.log('time: ', timer)
  }, [score, winTime]);
  

  // set last direction and decrease current index
  const swiped = async (direction, nameToDelete, index) => {
    const checkWin = document.getElementById('winIcon');
    const checkLoose = document.getElementById('looseIcon');
    const quizDiv = document.getElementById('quiz');
    const detailsDiv = document.getElementById('details');
    const spinn = document.getElementById("spin");
    const timer = sessionStorage.getItem('time');

    //setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if (direction === questionChild.Questions_Adult[index].good_answer) {
      checkWin.style.display = 'block';
      checkLoose.style.display = 'none';
      setScore(score => score + 50);
      setWinTime(winTime => winTime + 5);
      result.push("✅");
    } else {
      checkWin.style.display = 'none';
      checkLoose.style.display = 'block';
      result.push("❌");
    }
    if (index === 0 || timer < 3) {
      while (result.length < questionChild.Questions_Adult.length) {
        result.push('🕒');
      }
      const reversed = result.reverse();
      setSaveAnswer(reversed);
      quizDiv.style.display = 'none';
      spinn.style.display = 'block';
      await wait(1000);
      sendScore();
      await wait(2000);
      spinn.style.display = 'none';
      detailsDiv.style.display = 'block';
    }

  };

  const outOfFrame = (name, idx) => {
    const currentCardPackage = document.getElementById('card'+idx);
    let nextCardPackage;
    if (idx > 0) {
      nextCardPackage = document.getElementById('card'+(idx - 1));
    }

    currentCardPackage.style.display = 'none';
    if (nextCardPackage) {
      nextCardPackage.style.display = 'flex';
    }
   // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < questionChild.Questions_Adult.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  };

  const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    })
}
  return (

    <div>
      <div className="">
        <img src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <div id='ready'>
        <div className='' style={{marginTop: '5%'}}>
              <h1 className=''>Welcome {username} to the advanced quiz !</h1><br/>
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
              }
              sessionStorage.setItem('time', remainingTime);
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

      <div className='cardContainer'>
        {questionChild.Questions_Adult.map((character, index) => (
          <div key={character.title} id={'card'+index} style={{display: (index === questionChild.Questions_Adult.length - 1) ? '' : 'none'}}>
            <div style={{margin: '20px 0'}}>
              <p style={{border: '2px solid fuchsia', backgroundColor: '#292a3e', color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px', width: '300px', margin: '0 auto'}}>3 : {character.up}</p>
            </div>
            <div className='cardMiddleRow'>
              <div style={{margin: '0 20px'}}>
                <p style={{border: '2px solid gold', backgroundColor: '#292a3e', color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px', width: '300px', margin: '0 auto'}}>1 : {character.left}</p>
              </div>
              <TinderCard
                ref={childRefs[index]}
                className='swipe'
                key={character.title}
                onSwipe={(dir) => swiped(dir, character.title, index)}
                onCardLeftScreen={() => outOfFrame(character.title, index)}
              >
                <div>
                  <h4 style={{marginBottom: '10px'}}>{character.title}</h4>
                </div>
                <div
                  style={{ backgroundImage: 'url(' + character.image + ')' }}
                  className='card'
                >
                </div>
              </TinderCard>
              <div style={{margin: '0 20px'}}>
                <p style={{border: '2px solid aqua', backgroundColor: '#292a3e', color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px', width: '300px', margin: '0 auto'}}>2 : {character.right}</p>
              </div>
            </div>
            <div style={{margin: '20px 0'}}>
              <p style={{border: '2px solid lightsalmon', backgroundColor: '#292a3e', color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '15px 15px 15px 15px', width: '300px', margin: '0 auto'}}>4 : {character.down}</p>
            </div>
          </div>
        ))}
      </div><br/>

      <div className='buttons offset-md2' style={{marginTop: '20px'}}>
      <button className='button-go' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Answer 1</button>
      <button className='button-aqua' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Answer 2</button>
      <button className='button-fu' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('up')}>Answer 3</button>
      <button className='button-lightsalmon' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('down')}>Answer 4</button>
      </div>

      </div>
      <div id="spin" style={{display: 'none', marginTop: '10%'}}>
        <Spinner animation="border" variant="#01d976" size="500" style={{height: '150px', width: '150px', color: '#01d976'}}/><br/><br/>
        <h5 style={{color:"white", fontWeight: 'bold'}}>Loading results ...</h5>
      </div>
      <div id="details" style={{marginTop: '2%', display: 'none'}}>
      <Button href='/score-major' style={{backgroundColor: '#01d976', borderColor: '#01d976', fontWeight: 'bold'}} className='rounded-pill col-md-2 button-user'>View Leaderboard</Button><br/><br/>
        <div style={{backgroundColor: '#292a3e', padding: '5px 45px 15px 45px'}}>
                <Table striped bordered hover style={{border: '2px solid #01d976', color: 'white', boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)'}}>
                <thead style={{border: '2px solid #01d976'}}>
                  <tr style={{border: '2px solid #01d976'}}>
                    <th style={{border: '2px solid #01d976'}} width='20%'>Question</th>
                    <th style={{border: '2px solid #01d976'}} width='10%'>Good Answer</th>
                    <th style={{border: '2px solid #01d976'}} width='20%'>Details</th>
                    <th style={{border: '2px solid #01d976'}} width='4%'>Your Answer</th>
                  </tr>
                </thead>
                <tbody style={{border: '2px solid #01d976'}}>
                { questionChild.Questions_Adult.map((question, index) => (
                  <tr  key={question.title} style={{border: '2px solid #01d976', color: 'white'}}>
                    <td style={{border: '2px solid #01d976', color: 'white'}}>{question.title}</td>
                    <td style={{border: '2px solid #01d976', color: 'white'}}>{question[question.good_answer]}</td>
                    <td style={{border: '2px solid #01d976', color: 'white'}}>{question.details}</td>
                    <td style={{border: '2px solid #01d976', color: 'white'}}>{saveAnswer[index]}</td>
                  </tr>
                  ))}
                </tbody>
              </Table>
      </div>
      </div>

    </div>
  )
}

export default QuizMajor
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