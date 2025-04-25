import { Link } from 'react-router-dom';
import LeaderBoardComponent from '@components/LeaderBoard/LeaderBoardComponent';
import "./Home.css"

const Home: React.FC = () => {
  return (
    <div className='home'>
      <LeaderBoardComponent/>
      <div className='home__buttons'>
        <Link to="/market" >
          <button>MARKET</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;