import "./Market.css";
import { marketService } from "@/services/market.service";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import fishingRod from "../../assets/caña.png";
import poison1 from "../../assets/poison1.png";
import poison2 from "../../assets/poison2.png";
import poison3 from "../../assets/poison3.png";
import poison4 from "../../assets/poison4.png";
import { Link } from "react-router-dom";

type Item = {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
};

const MarketComponent: React.FC = () => {
  const products = useOfflineSync<Item>("items", marketService);

  return (
    <div className="market">
      <Link to={"/"}>
        <button className="market__button">BACK</button>
      </Link>
      
      <div className="market__images">
        <img src={fishingRod} alt="Fishing Rod" className="market__image" />
        <img src={poison1} alt="Poison 1" className="market__image" />
        <img src={poison2} alt="Poison 2" className="market__image" />
        <img src={poison3} alt="Poison 3" className="market__image" />
        <img src={poison4} alt="Poison 4" className="market__image" />
      </div>
      <div className="market__list">
        {products.map((product) => (
          <div key={product.id} className="market__item">
            <h2 className="market__name">{product.name}</h2>
            <p className="market__description">{product.description}</p>
            <p className="market__cost">{product.cost} $</p>
            <button>BUY</button>
          </div>
        ))}
      </div>

  </div>  
  );
};

export default MarketComponent;
