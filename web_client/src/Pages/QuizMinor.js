import { Button, Container, Col } from 'react-bootstrap';
import '../App.css';
import TinderCard from 'react-tinder-card'

function QuizMinor() {
    const username = sessionStorage.getItem('username');

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

    const showQuizz = () => {
        const readyDiv = document.getElementById('ready');
        const quizDiv = document.getElementById('quiz');

        readyDiv.style.display = 'none';
        quizDiv.style.display = 'block';
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
              <Button onClick={showQuizz} style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='rounded-pill col-md-2 offset-md-5'>Start</Button><br/><br/>
          </div>
          <div id='quiz' style={{display: 'none', marginTop: '10%'}}>
          <TinderCard
                className="swipe offset-md-3"
                onSwipe={onSwipe}
                >
            <div
              className="card"
            >
              <h4
              >
                  Test
              </h4>
            </div>
          </TinderCard>
          </div>
        </Col>
    </div>
      </Col>

    </Container>

  );
}

export default QuizMinor;

