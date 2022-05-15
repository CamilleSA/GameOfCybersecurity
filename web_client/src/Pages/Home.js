import React from "react"
import { Button, Form, Container, Col } from 'react-bootstrap';
import '../App.css';
import { FaArrowRight } from 'react-icons/fa';

function Home() {

  const sendUsername = () => {
    const inputUsername = document.getElementById('usernameInput');
    
    if (inputUsername.value === '') {
      alert('Error : Username is empty !');
    } else if (inputUsername.value !== '') {
      sessionStorage.setItem('username', inputUsername.value);
      window.location.href = '/choose-quiz';
    }
  };

  const sendAnonymously = () => {
    sessionStorage.setItem('username', 'Anonymous');
    window.location.href = '/choose-quiz';
  };

  return (
    <Container fluid="md">
      <Col md="auto">
      <div className="App col-md-12" style={{backgroundColor: 'transparent'}}><br/>
      <div className="justify-content-center d-flex">
      <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <Col xs={12} md={8}>
      <div id="username" className='text-center' style={{marginTop: '5%'}}><br/>
            <div className="offset-md-3 col-size">
            <h2 style={{fontWeight: 'bold'}}>Enter your username :</h2><br/>
            <div className='col-md-6 d-flex'>
                <Form.Control type="email" id="usernameInput" className='col-md-1 offset-md-6' placeholder='Enter Username'/>
                <Button type="button" style={{marginLeft: '2%',borderRadius: '50%', backgroundColor: '#01d976', borderColor: '#01d976'}} onClick={sendUsername}><FaArrowRight/></Button>
            </div><br/>
            <span style={{color: '#01d976', fontWeight: 'bold'}}>---------- or ----------</span><br/><br/>
            <Button style={{backgroundColor: '#01d976', borderColor: '#01d976'}} className='rounded-pill col-md-4' onClick={sendAnonymously}>Anonymously</Button><br/><br/>
            </div>

        </div>
      </Col>
    </div>
      </Col>

    </Container>

  );
}

export default Home;