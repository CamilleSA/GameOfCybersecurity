import { Button, Container, Col } from 'react-bootstrap';
import '../App.css';

function QuizMajor() {
    const username = sessionStorage.getItem('username');

  return (
    <Container fluid="md">
      <Col md="auto">
      <div className="App col-md-12" style={{backgroundColor: 'transparent'}}><br/>
      <div className="justify-content-center d-flex">
      <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <Col xs={12} md={12}>
          <div className='offset-md-0' style={{marginTop: '5%'}}>
              <h1 className='text-center'>Welcome {username} to the major quiz !</h1>
              <h2 className='text-center'>Are you ready ?</h2>
              <Button style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='rounded-pill col-md-2 offset-md-5'>Start</Button><br/><br/>
          </div>
        </Col>

    </div>
      </Col>

    </Container>

  );
}

export default QuizMajor;