import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from './quiz.js'
function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Quiz/>}/>
          </Routes>
        </Router>
  );
}

export default App;
