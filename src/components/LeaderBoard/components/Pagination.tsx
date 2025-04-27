import { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ currentPage, totalPages, onPrev, onNext }: PaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="leaderboard__pagination-container">
      <div className="leaderboard__pagination">
        <button 
          onClick={onPrev} 
          disabled={currentPage === 1}
          aria-label="Previous page"
          title="Previous page"
        >
          {isMobile ? '←' : '← Cast Back'}
        </button>
        <span>Boat {currentPage} of {totalPages}</span>
        <button 
          onClick={onNext} 
          disabled={currentPage === totalPages}
          aria-label="Next page"
          title="Next page"
        >
          {isMobile ? '→' : 'Cast Forward →'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
