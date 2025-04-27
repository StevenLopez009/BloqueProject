import "./Market.css";
import { marketService } from "@/services/market.service";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import fishingRod from "@/assets/caña.png";
import poison1 from "@/assets/poison1.png";
import poison2 from "@/assets/poison2.png";
import poison3 from "@/assets/poison3.png";
import poison4 from "@/assets/poison4.png";
import { Item  } from "@/models/Item";
import MarketCard from "./components/MarketCard";
import { useEffect, useState } from "react";

const Market: React.FC = () => {
  const products = useOfflineSync<Item>("items", marketService);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  const images = [fishingRod, poison1, poison2, poison3, poison4];

  return (
    <div className="market">
      {isLoading ? (
        <p className="leaderboard__loading">Loading market...</p>
      ) : (
        <div className="market__list"> 
          {products.map((product, index) => (
            <MarketCard key={product.id} product={product} index={index} images={images} />
          ))}
        </div>
      )}
    </div>  
  );
};

export default Market; 
