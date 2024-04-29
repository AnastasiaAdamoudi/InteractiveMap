import mongoose from 'mongoose';
import { beaconSchema } from './beaconSchema.js';
import { memberSchema } from './memberSchema.js';

const BeaconModel = mongoose.model('beacons', beaconSchema);
const MemberModel = mongoose.model('members', memberSchema);

export { BeaconModel, MemberModel };
