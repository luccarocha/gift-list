import { useState, useEffect } from 'react';

const GiftList = () => {
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [availableGifts, setAvailableGifts] = useState([
    { id: 1, name: 'Assadeiras', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-4-formas-assadeiras-retangulares-aluminio-p-bolos-e-tortas-postagem-rapida-mba/p/hhfghh5j8e/ud/fabo/' },
    { id: 2, name: 'Batedeira', link: 'https://www.magazinevoce.com.br/magazineluccastorels/batedeira-britania-diamante-inox-turbo-550w-preta/p/ag97b59j57/ep/btdc/' },
    { id: 3, name: 'Cafeteira', link: 'https://www.magazinevoce.com.br/magazineluccastorels/cafeteira-eletrica-electrolux-efficient-ecm10-15-cafes-preto-e-granite-gray/p/231236700/ep/otep/' },
    { id: 4, name: 'Chaleira Elétrica', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jarra-eletrica-bule-chaleira-inox-18-litros-amanzi-fix-110v-preta-inox-prime/p/cdb6jhc22a/ep/clre/' },
    { id: 5, name: 'Cortina Escritório', link: 'https://produto.mercadolivre.com.br/MLB-3629565701-cortina-tecido-blackout-100-com-voil-flame-gaze-300x230-_JM?attributes=COLOR_SECONDARY_COLOR:Q2luemE=' },
    { id: 6, name: 'Cortina Quarto', link: 'https://produto.mercadolivre.com.br/MLB-3629565701-cortina-tecido-blackout-100-com-voil-flame-gaze-300x230-_JM?attributes=COLOR_SECONDARY_COLOR:Q2luemE=' },
    { id: 7, name: 'Ferro de Passar', link: 'https://www.magazinevoce.com.br/magazineluccastorels/ferro-de-passar-roupa-a-vapor-e-a-seco-electrolux-efficient-esi10-azul/p/235627500/ep/ferr/' },
    { id: 8, name: 'Jogo de Faca', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-de-facas-tramontina-plenus-4-pecas-inox/p/agjh0e56h5/ud/fcud/' },
    { id: 9, name: 'Jogo de Jantar', link: 'https://www.magazinevoce.com.br/magazineluccastorels/aparelho-de-jantar-e-cha-20-pecas-biona-de-ceramica-redondo-branco-e-azul-donna/p/143282300/ud/apja/' },
    { id: 10, name: 'Jogo de Panelas', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-de-panelas-tramontina-turim-em-aluminio-com-revestimento-interno-e-externo-em-antiaderente-starflon-max-preto-10-pecas/p/ajgg173kk8/ud/cjpn/' },
    { id: 11, name: 'Jogo de Talheres Inox', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-de-talheres-tramontina-inox-colher-faca-garfo-24-pecas-inox/p/cf3jkk5gh8/ud/faqu' },
    { id: 12, name: 'Jogo de Talheres Preto', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-de-faqueiro-tramontina-talheres-24-pecas-ipanema-cores/p/jk8fe29ajb/ud/faqu/' },
    { id: 13, name: 'Kit 6 Taças', link: 'https://www.magazinevoce.com.br/magazineluccastorels/kit-6-tacas-vidro-para-vinho-agua-385ml-nadir-figueiredo/p/142245300/ud/tavi/' },
    { id: 14, name: 'Kit 6 Taças Champanhe', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-taca-champanhe-espumante-186ml-buffet-6-pecas-nadir/p/kf1gf1kfke/af/tads/' },
    { id: 15, name: 'Kit 6 Taças de Sobremesa', link: 'https://www.magazinevoce.com.br/magazineluccastorels/jogo-de-tacas-de-sobremesa-de-vidro-160ml-6-pecas-haus-concept-gelato/p/237309900/ud/tcsb/' },
    { id: 16, name: 'Kit Cobre Leito', link: 'https://www.mercadolivre.com.br/kit-cobre-leito-percal-200-fios-casal-unique-diversas-cores-cor-grafite/p/MLB27826443?attributes=COLOR:Grafite' },
    { id: 17, name: 'Kit Utensílios De Cozinha', link: 'https://www.magazineluiza.com.br/jogo-kit-com-12-pecas-utensilios-de-cozinha-colheres-espatulas-pegador-silicone-copo-suporte-prime/p/de7d9kc0ca/ud/cjtu/' },
    { id: 18, name: 'Liquidificador', link: 'https://www.magazinevoce.com.br/magazineluccastorels/liquidificador-mondial-easy-power-l-550-w-preto-2-velocidades-550w/p/021723000/ep/lqac/' },
    { id: 19, name: 'Lixeira Banheiro 1', link: 'https://www.magazinevoce.com.br/magazineluccastorels/lixeira-cesto-lixo-banheiro-5-litros-cozinha-escritorio-preta-viel/p/dg02he79a1/ud/udli/' },
    { id: 20, name: 'Lixeira Banheiro 2', link: 'https://www.magazinevoce.com.br/magazineluccastorels/lixeira-cesto-lixo-banheiro-5-litros-cozinha-escritorio-preta-viel/p/dg02he79a1/ud/udli/' },
    { id: 21, name: 'Lixeira Cozinha', link: 'https://www.magazinevoce.com.br/magazineluccastorels/lixeira-cesto-lixo-banheiro-5-litros-cozinha-escritorio-preta-viel/p/dg02he79a1/ud/udli/' },
    { id: 22, name: 'Mop', link: 'https://www.magazinevoce.com.br/magazineluccastorels/mop-giratorio-novica-original-com-balde/p/226737000/ud/mopi/' },
    { id: 23, name: 'Panela de Pressão', link: 'https://www.magazinevoce.com.br/magazineluccastorels/panela-de-pressao-aluminio-45l-fechamento-externo-grafite-preto-maximum-panelux/p/aceb0ac141/ud/udpp/' },
    { id: 24, name: 'Potes de Vidro Hermético', link: 'https://www.magazinevoce.com.br/magazineluccastorels/conjunto-5-potes-de-vidro-hermetico-mantimentos-tampa-640ml-u4home/p/gk6k1dcdjk/ud/porm/' },
    { id: 25, name: 'Sanduicheira', link: 'https://www.magazinevoce.com.br/magazineluccastorels/sanduicheira-grill-britania-bgr27i-2-em-1-prata-850w-antiaderente/p/235076200/ep/gset/' },
    { id: 26, name: 'Varal Retrátil', link: 'https://www.magazinevoce.com.br/magazineluccastorels/varal-de-chao-com-abas-retratil-roupas-intimas-apartamento-articulado-mini-aco-branco-portatil-preto-home-utilities/p/cd7aab54k9/ud/vral/' }
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