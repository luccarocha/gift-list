import React, { useState, useEffect } from 'react';

const GiftList = () => {
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [availableGifts, setAvailableGifts] = useState([
    { id: 1, name: 'Item 1', category: 'Cozinha', link: 'link1' },
    { id: 2, name: 'Item 2', category: 'Quarto', link: 'link2' },
  ]);

  const selectGift = (gift) => {
    setSelectedGifts([...selectedGifts, gift]);
    setAvailableGifts(availableGifts.filter(g => g.id !== gift.id));
    localStorage.setItem('selectedGifts', JSON.stringify([...selectedGifts, gift]));
    localStorage.setItem('availableGifts', JSON.stringify(availableGifts.filter(g => g.id !== gift.id)));
  };

  const returnGift = (gift) => {
    setAvailableGifts([...availableGifts, gift]);
    setSelectedGifts(selectedGifts.filter(g => g.id !== gift.id));
    localStorage.setItem('availableGifts', JSON.stringify([...availableGifts, gift]));
    localStorage.setItem('selectedGifts', JSON.stringify(selectedGifts.filter(g => g.id !== gift.id)));
  };

  useEffect(() => {
    const savedSelected = localStorage.getItem('selectedGifts');
    const savedAvailable = localStorage.getItem('availableGifts');
    
    if (savedSelected) setSelectedGifts(JSON.parse(savedSelected));
    if (savedAvailable) setAvailableGifts(JSON.parse(savedAvailable));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lista Disponível */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Presentes Disponíveis</h2>
          {availableGifts.map(gift => (
            <div 
              key={gift.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => selectGift(gift)}
            >
              <span>{gift.name}</span>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                Selecionar
              </button>
            </div>
          ))}
        </div>

        {/* Lista Selecionada */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Meus Presentes</h2>
          {selectedGifts.map(gift => (
            <div 
              key={gift.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
            >
              <span>{gift.name}</span>
              <div>
                <a 
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Comprar
                </a>
                <button 
                  onClick={() => returnGift(gift)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Devolver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;