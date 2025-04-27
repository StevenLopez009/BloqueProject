import { Player } from "@/models/Players";
import { useState, useEffect } from "react";

interface LeaderBoardTableProps {
  players: Player[];
}

const LeaderBoardTable = ({ players }: LeaderBoardTableProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "🎣";
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isMobile) {
    return (
      <div className="leaderboard__table-container" role="region" aria-label="Leaderboard table">
        <div className="leaderboard__mobile-list">
          {players.map((player) => (
            <div 
              key={player.rank} 
              className={`leaderboard__mobile-card ${player.rank <= 3 ? 'leaderboard__mobile-card--top' + player.rank : ''}`}
            >
              <div className="leaderboard__mobile-rank">
                <span className="leaderboard__rank">
                  {getRankIcon(player.rank)} {player.rank}
                </span>
              </div>
              <div className="leaderboard__mobile-info">
                <div className="leaderboard__mobile-username">{player.username}</div>
                <div className="leaderboard__mobile-stats">
                  <span className="leaderboard__mobile-level">Lvl {player.level}</span>
                  <span className="leaderboard__mobile-xp">{formatNumber(player.xp)} XP</span>
                  <span className="leaderboard__gold">{formatNumber(player.gold)} 🪙</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard__table-container" role="region" aria-label="Leaderboard table">
      <table className="leaderboard__table">
        <thead className="leaderboard__head">
          <tr className="leaderboard__row">
            <th className="leaderboard__header" scope="col">Rank</th>
            <th className="leaderboard__header" scope="col">Username</th>
            <th className="leaderboard__header" scope="col">Level</th>
            <th className="leaderboard__header" scope="col">XP</th>
            <th className="leaderboard__header" scope="col">Gold</th>
          </tr>
        </thead>
        <tbody className="leaderboard__body">
          {players.map((player) => (
            <tr 
              key={player.rank} 
              className={`leaderboard__row ${player.rank <= 3 ? 'leaderboard__row--top' + player.rank : ''}`}
            >
              <td className="leaderboard__cell" scope="row">
                <span className="leaderboard__rank">
                  {getRankIcon(player.rank)} {player.rank}
                </span>
              </td>
              <td className="leaderboard__cell leaderboard__cell--username">{player.username}</td>
              <td className="leaderboard__cell">
                <span className="leaderboard__level">
                  {player.level}
                </span>
              </td>
              <td className="leaderboard__cell">{formatNumber(player.xp)} XP</td>
              <td className="leaderboard__cell leaderboard__cell--gold">
                <span className="leaderboard__gold">
                  {formatNumber(player.gold)} 🪙
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardTable;
