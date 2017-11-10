import React from 'react';
import Pomodoro from './pomodoro';
import Header from '../components/header';

const App = () => (
  <div>
    <Header />
    <main>
      <Pomodoro />
    </main>
  </div>
);

export default App;