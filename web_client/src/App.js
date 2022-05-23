import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Home from './Pages/Home';
import ChooseQuiz from './Pages/ChooseQuiz';
import QuizMajor from './Pages/QuizMajor';
import QuizMinor from './Pages/QuizMinor';
import ScoreMinor from './Pages/ScoreMinor';
import ScoreMajor from './Pages/ScoreMajor';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/choose-quiz" element={<ChooseQuiz/>}></Route>
          <Route path="/quiz-major" element={<QuizMajor/>}></Route>
          <Route path="/quiz-minor" element={<QuizMinor/>}></Route>
          <Route path="/score-minor" element={<ScoreMinor/>}></Route>
          <Route path="/score-major" element={<ScoreMajor/>}></Route>
        </Routes>
    </div>
    </Router>

  );
}

export default App;
