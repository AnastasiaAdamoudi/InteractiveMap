import MainMap from '../components/home/Map/index.js';
import { CreateBeaconButton } from '../components/home/HomeButtons/index.js';

const Home = () => {

  return (
    <div>
        <MainMap />
        <CreateBeaconButton />
    </div>
  )
}

export default Home;