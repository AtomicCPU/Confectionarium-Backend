import React from 'react';
import { NavbarComp } from './components/NavbarComp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styleSheets/login.css';

import { Home } from './pages/home';
import { About } from './pages/about';
import { Products } from './pages/products';
import { DarkChoco } from './pages/darkChoco';
import { ArtTruffle } from './pages/artTruffle';
import { Macarons } from './pages/macarons';
import { Login } from './pages/login';
import { Logout } from './pages/logout';
import { Signup } from './pages/signup';
import { NotFound } from './pages/notfound';


function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<NavbarComp loggedIn={user}/>} >
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path="/dark-chocolate" element={<DarkChoco />} />
          <Route path="/chocolate-truffles" element={<ArtTruffle />} />
          <Route path="/macarons" element={<Macarons />} />
          <Route path="/login" element={<Login loggedIn={user} />} />
          <Route path="/logout" element={<Logout loggedIn={user}/>}/>
          <Route path="/signup" element={<Signup loggedIn={user} />} />
          <Route path="*" element={<NotFound loggedIn={user} />} />

        </Route>
        </Routes>
      </BrowserRouter>
      <div className="App"></div>
    </div>
  );
}

export default App;
