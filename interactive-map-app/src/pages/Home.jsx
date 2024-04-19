import { MainMap } from '../components/home/Map/index.js';
import { CreateBeaconButton } from '../components/home/HomeButtons/index.js';
import './Home.css';
import PropTypes from 'prop-types';

const Home = ({ formOpen, setFormOpen, closeForm, beacons }) => {

Home.propTypes = {
  formOpen: PropTypes.bool.isRequired,
  setFormOpen: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  beacons: PropTypes.array.isRequired,
};

  return (
    <div className="home">
        <MainMap beacons={beacons} />
        <CreateBeaconButton formOpen={formOpen} setFormOpen={setFormOpen} closeForm={closeForm} beacons={beacons} />
    </div>
  )
}

export default Home;