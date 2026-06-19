import React, { useState } from 'react';
import { Info } from 'lucide-react';
import './Home.css';

const Home = ({ cities, onCalculate }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [autonomy, setAutonomy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalc = () => {
    if (!origin || !destination || !fuelPrice || !autonomy) {
      setErrorMessage('Preencha todos os campos para o correto calculo!');
      return;
    }
    setErrorMessage('');
    onCalculate(origin, destination, parseFloat(fuelPrice), parseFloat(autonomy));
  };

  const handleInputChange = (value, setter) => {
    if (value === '' || parseFloat(value) >= 0) {
      setter(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  return (
    <div className="home-wrapper">
      <div className="top-right-icon" onClick={() => setIsModalOpen(true)}>
        <Info size={32} />
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Passos a Passo</h2>
            <ol>
              <li>Selecione a cidade de origem.</li>
              <li>Selecione a cidade de destino.</li>
              <li>Insira o valor do combustivel.</li>
              <li>Insira a autonomia do seu veiculo.</li>
              <li>Clique em calcular para ver a rota.</li>
            </ol>
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}

      <h1 className="title">CAMINHO MAIS BARATO</h1>

      <div className="main-content">
        <div className="form-container">
          <div className="select-group">
            <select value={origin} onChange={e => setOrigin(e.target.value)}>
              <option value="">Origem</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={destination} onChange={e => setDestination(e.target.value)}>
              <option value="">Destino</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="input-group">
            <input
              type="number"
              min="0"
              placeholder="Valor Combustivel"
              value={fuelPrice}
              onChange={e => handleInputChange(e.target.value, setFuelPrice)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="number"
              min="0"
              placeholder="Autonomia (km/l)"
              value={autonomy}
              onChange={e => handleInputChange(e.target.value, setAutonomy)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {errorMessage && <p className="validation-error">{errorMessage}</p>}

          <div className="button-group">
            <button className="btn-calcular" onClick={handleCalc}>Calcular</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;