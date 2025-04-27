import fish from "@assets/pez.png";
import Fisherman from "@assets/pescador.png";
import "./LeaderBoard.css";
import { leaderboardService } from "@services/leaderBoard.service";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useEffect, useState } from "react";
import LeaderBoardTable from "./components/LeaderBoardTable";
import { Player } from "@/models/Players";
import Pagination from "./components/Pagination";

const LeaderBoard: React.FC = () => {
  const players = useOfflineSync<Player>("players", leaderboardService);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (players.length > 0) {
      setIsLoading(false);
    }
  }, [players]);

  const playersPerPage = 10;
  const totalPages = Math.ceil(players.length / playersPerPage);

  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const currentPlayers = players.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="leaderboard" aria-label="Leaderboard">
      <header className="leaderboard__header">
        <h2 className="leaderboard__title">Fisherman's Hall of Fame</h2>
      </header>

      <main className="leaderboard__content">
        {isLoading ? (
          <div className="leaderboard__loading-container" role="status">
            <div className="leaderboard__loading">
              <div className="leaderboard__loading-icon">🎣</div>
              <p>Casting lines to catch the leaderboard data...</p>
            </div>
          </div>
        ) : (
          <>            
            <LeaderBoardTable players={currentPlayers} />
            
            {totalPages > 1 && (
              <nav className="leaderboard__pagination" aria-label="Leaderboard pagination">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={handlePrevPage}
                  onNext={handleNextPage}
                />
              </nav>
            )}
          </>
        )}
      </main>
    </section>
  );
};

export default LeaderBoard; 

