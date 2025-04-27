import fish from "@assets/pez.png";
import Fisherman from "@assets/pescador.png";
import "./LeaderBoard.css";
import { leaderboardService } from "@services/leaderBoard.service";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useEffect, useState } from "react";
import LeaderBoardTable from "./components/LeaderBoardTable";
import { Player } from "@/models/Players";
import Pagination from "./components/Pagination";

const LeaderBoardComponent = () => {
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
    <div className="leaderboard">
      <h1 className="leaderboard__title">Leaderboard</h1>
      {isLoading ? (
        <p className="leaderboard__loading">Loading leaderboard...</p>
      ) : (
      <>
        <img src={fish} alt="Pez" className="img-fish" />
        <LeaderBoardTable players={currentPlayers} />
      </>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
      />
      )}
      <img src={Fisherman} alt="Fisherman" className="img-fisherman" />
    </div>
  );
};

export default LeaderBoardComponent;

