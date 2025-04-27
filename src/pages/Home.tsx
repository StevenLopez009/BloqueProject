import { useState } from 'react';
import Navigation from '@/components/Navigation/Navigation';
import LeaderBoard from '@/components/LeaderBoard/LeaderBoard';
import Market from '@/components/Market/Market';
import './Home.css';

const Home = () => {
  const [currentView, setCurrentView] = useState<'market' | 'leaderboard'>('market');

  const handleViewChange = (view: string) => {
    setCurrentView(view as 'market' | 'leaderboard');
  };

  return (
    <div className="home">
      <Navigation onViewChange={handleViewChange} />
      
      <main className="home__content">
        {currentView === 'market' ? (
          <Market />
        ) : (
          <LeaderBoard />
        )}
      </main>
    </div>
  );
};

export default Home;