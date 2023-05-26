import React from 'react';
import './App.css';
import HeroesList from './components/HeroesList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroDetails from './components/Hero';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroesList />} />
        <Route path="/hero/:id" element={<HeroDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
