import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling
import AllRoutes from './Components/AllRoutes';

function App() {
  return (
    <div className="container">
      <AllRoutes/>
    </div>
  );
}

export default App;
