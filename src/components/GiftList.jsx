import React, { useState, useEffect } from 'react';

const API_URL = 'https://gift-list-backend.onrender.com'; 

const GiftList = () => {
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const [availableGifts, setAvailableGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega dados iniciais
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [giftsRes, selectedRes] = await Promise.all([
          fetch(`${API_URL}/gifts`),
          fetch(`${API_URL}/selectedGifts`)
        ]);
        
        if (!giftsRes.ok || !selectedRes.ok) {
          throw new Error('Falha ao carregar presentes');
        }

        const gifts = await giftsRes.json();
        const selected = await selectedRes.json();
        
        setAvailableGifts(gifts);
        setSelectedGifts(selected);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gifts:', error);
        setError('Não foi possível carregar os presentes. Tente novamente.');
        setIsLoading(false);
      }
    };

    fetchGifts();
    
    // Atualiza a cada 5 segundos
    const interval = setInterval(fetchGifts, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectGift = async (gift) => {
    try {
      // Log detalhado
      console.log('Tentando selecionar presente:', gift);

      // Remove do available
      const deleteResponse = await fetch(`${API_URL}/gifts/${gift.id}`, {
        method: 'DELETE'
      });

      console.log('Resposta DELETE:', deleteResponse);

      if (!deleteResponse.ok) {
        const errorBody = await deleteResponse.text();
        console.error('Corpo do erro DELETE:', errorBody);
        throw new Error(`Falha ao remover presente: ${deleteResponse.status} ${deleteResponse.statusText}`);
      }

      // Adiciona ao selected
      const addResponse = await fetch(`${API_URL}/selectedGifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gift)
      });

      console.log('Resposta POST:', addResponse);

      if (!addResponse.ok) {
        const errorBody = await addResponse.text();
        console.error('Corpo do erro POST:', errorBody);
        throw new Error(`Falha ao adicionar presente selecionado: ${addResponse.status} ${addResponse.statusText}`);
      }

      // Atualiza os estados localmente
      setSelectedGifts(prev => [...prev, gift]);
      setAvailableGifts(prev => prev.filter(g => g.id !== gift.id));
      
      // Limpa qualquer erro anterior
      setError(null);
    } catch (error) {
      console.error('Erro detalhado ao selecionar presente:', error);
      setError(`Erro ao selecionar presente: ${error.message}`);
    }
  };

  const returnGift = async (gift) => {
    try {
      // Remove do selected
      const deleteResponse = await fetch(`${API_URL}/selectedGifts/${gift.id}`, {
        method: 'DELETE'
      });

      if (!deleteResponse.ok) {
        throw new Error('Falha ao remover presente selecionado');
      }

      // Adiciona de volta ao available
      const addResponse = await fetch(`${API_URL}/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gift)
      });

      if (!addResponse.ok) {
        throw new Error('Falha ao adicionar presente de volta');
      }

      // Atualiza os estados localmente
      setAvailableGifts(prev => [...prev, gift].sort((a, b) => a.id - b.id));
      setSelectedGifts(prev => prev.filter(g => g.id !== gift.id));
      
      // Limpa qualquer erro anterior
      setError(null);
    } catch (error) {
      console.error('Error returning gift:', error);
      setError(`Erro ao devolver presente: ${error.message}`);
    }
  };

  // Componente de carregamento
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        Carregando presentes...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Componente de erro */}
      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <h1 style={{
        textAlign: 'center',
        fontSize: '2rem',
        color: '#333',
        marginBottom: '2rem'
      }}>
        Lista de Presentes
      </h1>

      {selectedGifts.length > 0 && (
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '1.5rem',
            textAlign: 'center',
            cursor: 'pointer'
          }} onClick={() => setShowSelected(!showSelected)}>
            Minha Escolha {showSelected ? '▼' : '▶'}
          </h2>

          {showSelected && (
            <div style={{
              display: 'grid',
              gap: '1rem',
              maxHeight: '70vh',
              overflowY: 'auto',
              padding: '0.5rem'
            }}>
              {selectedGifts.map(gift => (
                <div 
                  key={gift.id}
                  style={{ 
                    display: 'flex', 
                    flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: window.innerWidth <= 480 ? 'stretch' : 'center',
                    gap: window.innerWidth <= 480 ? '0.5rem' : '0',
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '6px',
                    border: '1px solid #dcfce7'
                  }}
                >
                  <span style={{ 
                    fontSize: '1rem',
                    color: '#334155',
                    marginBottom: window.innerWidth <= 480 ? '0.5rem' : '0'
                  }}>
                    {gift.name}
                  </span>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexDirection: window.innerWidth <= 480 ? 'column' : 'row'
                  }}>
                    <a 
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#22c55e',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontWeight: '500',
                        transition: 'background 0.2s'
                      }}
                    >
                      Onde Comprar
                    </a>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        returnGift(gift);
                      }}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'background 0.2s'
                      }}
                    >
                      Devolver para lista
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ 
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1.5rem',
        height: 'fit-content'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#2563eb',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Presentes Disponíveis
        </h2>
        
        {availableGifts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#718096',
            padding: '2rem'
          }}>
            Não há presentes disponíveis no momento.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1rem',
            maxHeight: '70vh',
            overflowY: 'auto',
            padding: '0.5rem'
          }}>
            {availableGifts.map(gift => (
              <div 
                key={gift.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: '1px solid #e2e8f0'
                }}
                onClick={(e) => {
                  e.preventDefault(); // Previne qualquer comportamento padrão
                  selectGift(gift);
                }}
              >
                <span style={{ fontSize: '1rem', color: '#334155' }}>{gift.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o evento de clique da div seja acionado
                    selectGift(gift);
                  }}
                  style={{ 
                    background: '#3b82f6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                >
                  Selecionar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftList;