import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/page/Header';
import Main from './components/page/Main';
import Histoire from './components/page/Histoire';
import Character from './components/page/Character';
import NotFound from './components/error/NotFound';
import Secret from './components/easter-egg/Secret';
import PersonnageChoice from './components/page/personnage';
import CharacterTorture from './components/page/CharacterTorture';

import { SecretProvider, useSecret } from './components/easter-egg/SecretContext';
import HackingOverlay from './components/easter-egg/HackingOverlay';

import './style/menu.css';
import './style/404Error.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const { getSecret } = useSecret();
  const revelSecret = getSecret('AMreturn');

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main className="main text-light" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/story" element={<Histoire />} />
          <Route path="/character/:name" element={<Character />} />
          <Route path="/character/:name/torture" element={<CharacterTorture />} />
          <Route path="/Secret" element={<Secret />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/character" element={<PersonnageChoice />} />
        </Routes>
      </main>
      {revelSecret && <HackingOverlay />} {/* Ajout de l'overlay si le secret est activé */}
    </div>
  );
}

function App() {
  return (
    <SecretProvider>
      <Router>
        <AppContent />
      </Router>
    </SecretProvider>
  );
}

export default App;
