import { useState, useEffect } from 'react';
import './Navigation.css';

interface NavigationProps {
  onViewChange: (view: string) => void;
}

const Navigation = ({ onViewChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewChange = (view: string) => {
    onViewChange(view);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="navigation" aria-label="Main navigation">
      <button 
        className="navigation__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
        aria-label="Toggle navigation menu"
      >
        <span className="navigation__toggle-icon"></span>
        <span className="navigation__toggle-icon"></span>
        <span className="navigation__toggle-icon"></span>
      </button>

      <div 
        id="navigation-menu"
        className={`navigation__menu ${isOpen ? 'navigation__menu--open' : ''}`}
      >
        <ul className="navigation__list">
          <li className="navigation__item">
            <button 
              className="navigation__link"
              onClick={() => handleViewChange("market")}
            >
              Market
            </button>
          </li>
          <li className="navigation__item">
            <button 
              className="navigation__link"
              onClick={() => handleViewChange("leaderboard")}
            >
              Leaderboard
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 