import React from 'react';
import './App.css';
import HeroesList from './components/HeroesList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroDetails from './components/Hero';
import CreateHero from './components/CreateHero';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroesList />} />
        <Route path="/create" element={<CreateHero />} />
        <Route path="/hero/:id" element={<HeroDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
