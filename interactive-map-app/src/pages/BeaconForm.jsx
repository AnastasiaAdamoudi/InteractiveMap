import "./BeaconForm.css";
import { FormContent, ExpandGuidanceButton } from "../components/beacon-form/index";
import PropTypes from "prop-types";

const BeaconForm = ( {beacons} ) => {

  BeaconForm.propTypes = {
    beacons: PropTypes.array.isRequired,
  };

  return (
    <div className="form-page">

      <div className="form-header">
        <h2 className="page-title">Complete the form with your beacon information</h2>
        <ExpandGuidanceButton />
      </div>

      <div className="form-container">

        <FormContent beacons={beacons} />

      </div>
      
    </div>
  );
};

export default BeaconForm;
