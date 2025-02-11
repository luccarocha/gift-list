import { useState, useEffect } from 'react';

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
   <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
       {/* Lista Disponível */}
       <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Presentes Disponíveis</h2>
         {availableGifts.map(gift => (
           <div 
             key={gift.id}
             style={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               alignItems: 'center',
               padding: '0.5rem',
               marginBottom: '0.5rem',
               border: '1px solid #eee',
               borderRadius: '4px',
               cursor: 'pointer'
             }}
             onClick={() => selectGift(gift)}
           >
             <span>{gift.name}</span>
             <button style={{ 
               background: '#3b82f6', 
               color: 'white', 
               padding: '0.5rem 1rem', 
               borderRadius: '4px',
               border: 'none',
               cursor: 'pointer'
             }}>
               Selecionar
             </button>
           </div>
         ))}
       </div>

       {/* Lista Selecionada */}
       <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Meus Presentes</h2>
         {selectedGifts.map(gift => (
           <div 
             key={gift.id}
             style={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               alignItems: 'center',
               padding: '0.5rem',
               marginBottom: '0.5rem',
               border: '1px solid #eee',
               borderRadius: '4px'
             }}
           >
             <span>{gift.name}</span>
             <div>
               <a 
                 href={gift.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   background: '#22c55e',
                   color: 'white',
                   padding: '0.5rem 1rem',
                   borderRadius: '4px',
                   textDecoration: 'none',
                   marginRight: '0.5rem'
                 }}
               >
                 Comprar
               </a>
               <button 
                 onClick={() => returnGift(gift)}
                 style={{
                   background: '#ef4444',
                   color: 'white',
                   padding: '0.5rem 1rem',
                   borderRadius: '4px',
                   border: 'none',
                   cursor: 'pointer'
                 }}
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