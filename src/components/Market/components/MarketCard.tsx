import { Item } from '@/models/Item';
import React from 'react';

type Props = {
  product:Item;
  index:number; 
  images: string[];
};

const MarketCard : React.FC<Props>=  ({product, index, images}) => {
  return (
    <div className="market__card" key={product.id}>
      <p className="market__cost">{product.cost} $</p>
    <img src={images[index]} alt={product.name} />
    <div key={product.id} className="market__info">
        <h2 className="market__name">{product.name}</h2>
        <div className="market__info-container">
          <p className="market__description">{product.description}</p>
        </div>
        <button>BUY</button>
    </div>
  </div>
  );
};

export default MarketCard;