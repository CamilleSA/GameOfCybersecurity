import { Button, Container, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../App.css';
import { FaArrowLeft } from 'react-icons/fa';

function ChooseQuiz() {

  const username = sessionStorage.getItem('username');

  const renderTooltipBeginner = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Your use of the Internet is limited to reading emails, social networks and some research.
    </Tooltip>
  );

  const renderTooltipAdvanced = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You use the Internet at work, for your administrative procedures, you are subscribed to third party services.
    </Tooltip>
  );

  return (
    <Container fluid="md">
      <Col md="auto">
      <div className="App col-md-12" style={{backgroundColor: 'transparent'}}><br/>
      <div className="justify-content-center d-flex">
      <img  src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
      </div>
      <Col xs={12} md={8}>
        <div id="chooseQuiz" className='col-size offset-md-3' style={{marginTop: '10%'}}>
        <Button href='/home' className='button-user' style={{marginLeft: '-80%',borderRadius: '50%', backgroundColor: '#01d976', borderColor: '#01d976'}}><FaArrowLeft/></Button>
        <h2 className='text-center'>Welcome {username} !</h2>
          <h2 className='text-center'>Choose the type of quiz:</h2><br/>
          <div className='d-flex col-md-10 offset-md-2'>
          <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={renderTooltipBeginner}>
          <Button href='/quiz-minor' className='col-md-5 rounded-pill button-user' style={{fontWeight: 'bold', fontSize:'17px', marginRight:'2%', backgroundColor: '#01d976', borderColor: '#01d976'}}>Quiz for Beginner</Button>
          </OverlayTrigger>
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipAdvanced}>
            <Button href='/quiz-major' className='col-md-5 rounded-pill button-major'style={{marginRight:'1%', fontWeight: 'bold', fontSize:'17px'}} variant="danger">Quiz for Advanced</Button>
            </OverlayTrigger>
          </div>

        </div>
        </Col>

    </div>
      </Col>

    </Container>

  );
}

export default ChooseQuiz;