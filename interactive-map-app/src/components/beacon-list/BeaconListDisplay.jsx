import React from 'react'

const BeaconListDisplay = ( {beacons} ) => {
  return (
    <div>
        <h1>Beacon List</h1>
        <ul>
            {beacons.map((beacon, index) => {
            return (
                <li key={index}>
                <h2>{beacon.beaconName}</h2>
                <p>{beacon.creatorName}</p>
                <p>{beacon.createdOn}</p>
                <p>{beacon.beaconDescription}</p>
                <p>{beacon.beaconLocation}</p>
                </li>
            )
            })}
        </ul>
    </div>
  )
}

export default BeaconListDisplay;
