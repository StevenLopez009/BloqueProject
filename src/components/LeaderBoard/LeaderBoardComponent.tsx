import fish from "@assets/pez.png";
import Fisherman from "@assets/pescador.png";
import "./LeaderBoard.css";
import { leaderboardService } from "@services/leaderBoard.service";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useEffect, useState } from "react";

type Player = {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
};

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
        <table className="leaderboard__table">
          <thead className="leaderboard__head">
            <tr className="leaderboard__row">
              <th className="leaderboard__header">Rank</th>
              <th className="leaderboard__header">Username</th>
              <th className="leaderboard__header">Level</th>
              <th className="leaderboard__header">XP</th>
              <th className="leaderboard__header">Gold</th>
            </tr>
          </thead>
          <tbody className="leaderboard__body">
            {currentPlayers.map((player) => (
              <tr key={player.rank} className="leaderboard__row">
                <td className="leaderboard__cell">{player.rank}</td>
                <td className="leaderboard__cell">{player.username}</td>
                <td className="leaderboard__cell">{player.level}</td>
                <td className="leaderboard__cell">{player.xp}</td>
                <td className="leaderboard__cell">{player.gold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      )}

      {totalPages > 1 && (
        <div className="leaderboard__pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
      <img src={Fisherman} alt="Fisherman" className="img-fisherman" />
    </div>
  );
};

export default LeaderBoardComponent;

