import MainMap from '../components/home/Map/index.js';
import { CreateBeaconButton } from '../components/home/HomeButtons/index.js';
import './Home.css';

const Home = ({ formOpen, setFormOpen, closeForm, beacons, updateBeacons }) => {

  return (
    <div className="home">
        <MainMap beacons={beacons} />
        <CreateBeaconButton formOpen={formOpen} setFormOpen={setFormOpen} closeForm={closeForm} beacons={beacons}
        updateBeacons={updateBeacons} />
    </div>
  )
}

export default Home;