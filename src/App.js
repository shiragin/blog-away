import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TweetContextProvider from './lib/TweetContext';
import UserContextProvider from './lib/UserContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <UserContextProvider>
      <TweetContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </TweetContextProvider>
    </UserContextProvider>
  );
}

export default App;
