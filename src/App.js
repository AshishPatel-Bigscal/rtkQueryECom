import Login from './components/auth/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/auth/signup';
import HomePage from './components/homePage';
import ProductMaster from './components/ProductMaster';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ProductMaster /> */}
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/homepage' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App;