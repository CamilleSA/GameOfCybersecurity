import { Button, Form, Label, Input, Container, Col } from 'react-bootstrap';
import '../App.css';
import { FaArrowRight } from 'react-icons/fa';

function Home() {

  const displayButtonQuiz = () => {
    const divUsername = document.getElementById('username');
    const divQuiz = document.getElementById('chooseQuiz');

    divUsername.style.display = 'none';
    divQuiz.style.display = 'block';
  }
  return (
    <Container fluid="md">
      <Col md="auto">
      <div className="App col-md-12" style={{backgroundColor: 'transparent'}}><br/>
      <div className="justify-content-center d-flex">
      <img  src={require("../Assets/logo.png")} style={{width:'20%'}}/>
      </div>
      <Col xs={12} md={8}>
      <div id="username" className='text-center' style={{marginTop: '5%'}}><br/>
            <div className="offset-md-3 col-size">
            <h2 style={{fontWeight: 'bold'}}>Username</h2><br/>
            <div className='col-md-6 d-flex'>
                <Form.Control className='col-md-1 offset-md-6' placeholder='Enter Username'/>
                <Button style={{marginLeft: '2%',borderRadius: '50%', backgroundColor: '#01d976', borderColor: '#01d976'}} onClick={displayButtonQuiz}><FaArrowRight/></Button>
            </div><br/>
            <span style={{color: '#01d976', fontWeight: 'bold'}}>---------- or ----------</span><br/><br/>
            <Button style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='rounded-pill col-md-4' onClick={displayButtonQuiz}>Anonymously</Button><br/><br/>
            </div>

        </div>
      </Col>
      <Col xs={12} md={8}>

        <div id="chooseQuiz" className='col-size offset-md-3' style={{display: 'none', marginTop: '10%'}}>
          <h2 className='text-center'>Choose the type of quiz:</h2><br/>
          <div className='d-flex'>
            <Button className='col-md-4 offset-md-2 rounded-pill' style={{fontSize:'17px', marginRight:'2%', backgroundColor: '#01d976', borderColor: '#01d976'}}>Quiz for Minor</Button>
            <Button className='col-md-4 rounded-pill'style={{fontSize:'17px'}} variant="danger">Quiz for Majeur</Button>
          </div>

        </div>
        </Col>

    </div>
      </Col>

    </Container>

  );
}

export default Home;