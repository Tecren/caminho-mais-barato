import React, { useState, useEffect } from 'react';
import Home from './Home';
import Result from './Result';
import capitaisData from './capitais.json';
import { buildGraph, findCheapestPath } from './algorithm';
import './App.css';

const App = () => {
  const [screen, setScreen] = useState('home');
  const [result, setResult] = useState(null);
  const [graph, setGraph] = useState({});

  useEffect(() => {
    setGraph(buildGraph(capitaisData));
  }, []);

  const handleCalculate = (origin, destination, fuelPrice, autonomy) => {
    if (origin === destination) {
      setResult({ errorType: 'same_city' });
      setScreen('result');
      return;
    }

    const res = findCheapestPath(graph, origin, destination, fuelPrice, autonomy);
    if (res) {
      setResult(res);
    } else {
      setResult({ errorType: 'no_path' });
    }
    setScreen('result');
  };

  const handleBack = () => {
    setScreen('home');
    setResult(null);
  };

  return (
    <div className="app-container">
      {screen === 'home' ? (
        <Home
          cities={Object.keys(graph)}
          onCalculate={handleCalculate}
        />
      ) : (
        <Result result={result} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;