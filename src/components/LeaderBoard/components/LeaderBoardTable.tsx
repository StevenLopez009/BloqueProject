import { Player } from "@/models/Players";

interface LeaderBoardTableProps {
  players: Player[];
}

const LeaderBoardTable = ({ players }: LeaderBoardTableProps) => {
  return (
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
  );
};

export default LeaderBoardTable;
