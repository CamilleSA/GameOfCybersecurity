import { Button, Form } from 'react-bootstrap';
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
    <div className="App col-md-12"><br/>
        <h1 className="text-center">The Game of Cybersecurity</h1>
        <div id="username" className='text-center' style={{marginTop: '10%'}}><br/>
            <h2>Username</h2><br/>
            <div className='col-md-12 d-flex'>
                <Form.Control className='offset-md-5' style={{width: '17%', marginRight: '1%'}} placeholder='Enter Username'/>
                <Button style={{borderRadius: '50%'}} onClick={displayButtonQuiz}><FaArrowRight/></Button>
            </div><br/>
            <span>----- or -----</span><br/><br/>
            <Button variant="light" className='col-md-2' onClick={displayButtonQuiz}>Anonymously</Button><br/><br/>
        </div>
        <div id="chooseQuiz" className='' style={{display: 'none', marginTop: '10%'}}>
          <h2 className='text-center'>Choose the type of quiz:</h2><br/>
          <div className='d-flex'>
            <Button className='col-md-2 offset-md-4' style={{fontSize:'25px', marginRight:'2%'}} variant="success">Quiz for Minor</Button>
            <Button className='col-md-2'style={{fontSize:'25px'}} variant="danger">Quiz for Majeur</Button>
          </div>

        </div>
    </div>
  );
}

export default Home;