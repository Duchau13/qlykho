import './App.css';
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './hooks/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
