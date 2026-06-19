import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './Result.css';

const Result = ({ result, onBack }) => {
  return (
    <div className="result-wrapper">
      <div className="back-button-container" onClick={onBack} title="voltar">
        <ArrowLeft size={40} className="back-icon" />
      </div>
      <div className="result-content">
        {result && !result.errorType ? (
          <div className="success-card">
            <h2 className="result-title">Rota Encontrada</h2>
            <div className="path-display">
              {result.path.join(' -> ')}
            </div>
            <div className="cost-display">
              Custo Total: R$ {result.cost.toFixed(2)}
            </div>
          </div>
        ) : result && result.errorType === 'same_city' ? (
          <div className="error-card">
            <p>Você já se encontra nesta cidade!</p> 
            <p>Volte para a tela anterior para escolher outro destino.</p>
          </div>
        ) : (
          <div className="error-card">
            <p>Não é possível chegar a este destino :(</p> 
            <p>Volte a tela anterior e escolha outro destino.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;