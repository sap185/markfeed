import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Settings from './pages/Settings';
import CheckPage from './pages/CheckPage';
import SpacePage  from './pages/SpacePage';
import FeedbackPage from './pages/FeedbackPage';
import CheckVideoAudio from './pages/CheckVideoaudio';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/spaces' element={<SpacePage />} />
        <Route path="/feedback/:spaceId" element={<FeedbackPage />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path='/check' element={<CheckPage />}></Route>
        <Route path='/video' element={<CheckVideoAudio />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

