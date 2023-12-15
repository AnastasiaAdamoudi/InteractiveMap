import MainMap from '../components/home/Map/index.js';
import { CreateBeaconButton } from '../components/home/HomeButtons/index.js';
import './Home.css';

const Home = () => {

  return (
    <div className="home">
        <MainMap />
        <CreateBeaconButton />
    </div>
  )
}

export default Home;