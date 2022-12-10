import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContextProvider from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  );
}

export default App;
