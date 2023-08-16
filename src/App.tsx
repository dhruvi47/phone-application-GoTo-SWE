import React from 'react';
import ContactList from './components/ContactList';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <h1>My Phone Book</h1>
      <ContactList />
    </div>
  );
}

export default App;
