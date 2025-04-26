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
    <img src={images[index]} alt={product.name} />
    <div key={product.id} className="market__info">
        <h2 className="market__name">{product.name}</h2>
        <p className="market__description">{product.description}</p>
        <p className="market__cost">{product.cost} $</p>
        <button>BUY</button>
    </div>
  </div>
  );
};

export default MarketCard;