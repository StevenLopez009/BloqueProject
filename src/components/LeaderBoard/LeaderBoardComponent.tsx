import fish from "@assets/pez.png";
import Fisherman from "@assets/pescador.png";
import "./LeaderBoard.css";
import { leaderboardService } from "@services/leaderBoard.service";
import { useOfflineSync } from "@/hooks/useOfflineSync";

type Player = {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
};

const LeaderBoardComponent = () => {
  const players = useOfflineSync<Player>("players", leaderboardService);

  return (
    <div className="leaderboard">
      <h1 className="leaderboard__title">Leaderboard</h1>
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
          {players.map((player) => (
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
      <img src={Fisherman} alt="Fisherman" className="img-fisherman" />
    </div>
  );
};

export default LeaderBoardComponent;
