import MainMap from '../components/home/Map/MainMap.jsx';
import { CreateBeaconButton } from '../components/home/index.js';

const Home = () => {
  return (
    <div>
        <MainMap />
        <CreateBeaconButton />
    </div>
  )
}

export default Home;