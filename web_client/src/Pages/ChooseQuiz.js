import { Button, Container, Col } from 'react-bootstrap';
import '../App.css';
import { FaArrowLeft } from 'react-icons/fa';

function ChooseQuiz() {

  const username = sessionStorage.getItem('username');

  const backUsername = () => {
    window.location.href = '/home';
  }

  const quizMajor = () => {
    window.location.href = '/quiz-major';
  };

  const quizMinor = () => {
    window.location.href = '/quiz-minor';
  };

  return (
    <Container fluid="md">
      <Col md="auto">
      <div className="App col-md-12" style={{backgroundColor: 'transparent'}}><br/>
      <div className="justify-content-center d-flex">
      <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <Col xs={12} md={8}>
        <div id="chooseQuiz" className='col-size offset-md-3' style={{marginTop: '10%'}}>
        <Button className='button-user' style={{marginLeft: '-80%',borderRadius: '50%', backgroundColor: '#01d976', borderColor: '#01d976'}} onClick={backUsername}><FaArrowLeft/></Button>
        <h2 className='text-center'>Welcome {username} !</h2>
          <h2 className='text-center'>Choose the type of quiz:</h2><br/>
          <div className='d-flex'>
            <Button onClick={quizMinor} className='col-md-4 offset-md-2 rounded-pill button-user' style={{fontSize:'17px', marginRight:'2%', backgroundColor: '#01d976', borderColor: '#01d976'}}>Quiz for Child</Button>
            <Button onClick={quizMajor} className='col-md-4 rounded-pill button-major'style={{fontSize:'17px'}} variant="danger">Quiz for Adult</Button>
          </div>

        </div>
        </Col>

    </div>
      </Col>

    </Container>

  );
}

export default ChooseQuiz;