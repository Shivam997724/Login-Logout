import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route,Routes } from "react-router-dom";
import Home from './Component/Home'
import Login from './Component/Login/Login';
import './App.css';
import Form from "./Component/Form/Form";




function App() {
  return (
    <div >
    <Routes>
      <Route path="/"  element={<Login/>}/>
      <Route path="/home"  element={<Home/>}/>
      <Route path='/form'  element={<Form/>}/>
      </Routes>  
    
    </div>
  );
}

export default App;
