import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Componenets/Footer';
import Header from './Componenets/Header';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/home' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
