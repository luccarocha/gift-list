import { useState, useEffect } from 'react';

const API_URL = 'https://gift-list-backend.onrender.com'; 

const GiftList = () => {
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const [availableGifts, setAvailableGifts] = useState([]);

  // Carrega dados iniciais
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const [giftsRes, selectedRes] = await Promise.all([
          fetch(`${API_URL}/gifts`),
          fetch(`${API_URL}/selectedGifts`)
        ]);
        
        const gifts = await giftsRes.json();
        const selected = await selectedRes.json();
        
        setAvailableGifts(gifts);
        setSelectedGifts(selected);
      } catch (error) {
        console.error('Error fetching gifts:', error);
      }
    };

    fetchGifts();
    
    // Atualiza a cada 5 segundos
    const interval = setInterval(fetchGifts, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectGift = async (gift) => {
    try {
      // Remove do available
      await fetch(`${API_URL}/gifts/${gift.id}`, {
        method: 'DELETE'
      });

      // Adiciona ao selected
      await fetch(`${API_URL}/selectedGifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gift)
      });

      setSelectedGifts([...selectedGifts, gift]);
      setAvailableGifts(availableGifts.filter(g => g.id !== gift.id));
    } catch (error) {
      console.error('Error selecting gift:', error);
    }
  };

  const returnGift = async (gift) => {
    try {
      // Remove do selected
      await fetch(`${API_URL}/selectedGifts/${gift.id}`, {
        method: 'DELETE'
      });

      // Adiciona de volta ao available
      await fetch(`${API_URL}/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gift)
      });

      setAvailableGifts([...availableGifts, gift].sort((a, b) => a.id - b.id));
      setSelectedGifts(selectedGifts.filter(g => g.id !== gift.id));
    } catch (error) {
      console.error('Error returning gift:', error);
    }
  };

  // JSX permanece o mesmo
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
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
              onClick={() => selectGift(gift)}
            >
              <span style={{ fontSize: '1rem', color: '#334155' }}>{gift.name}</span>
              <button style={{ 
                background: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'background 0.2s'
              }}>
                Selecionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;