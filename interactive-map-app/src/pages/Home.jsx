import MainMap from '../components/home/Map/index.js';
import { CreateBeaconButton } from '../components/home/HomeButtons/index.js';
import './Home.css';

const Home = ({ formOpen, setFormOpen, closeForm }) => {

  return (
    <div className="home">
        <MainMap />
        <CreateBeaconButton formOpen={formOpen} setFormOpen={setFormOpen} closeForm={closeForm} />
    </div>
  )
}

export default Home;