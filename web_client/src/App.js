import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' 
import Home from './Pages/Home';
function App() {
  return (
    <Router>
      <div style={{backgroundImage: "url(/img/background.png)"}}>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
    </div>
    </Router>

  );
}

export default App;
