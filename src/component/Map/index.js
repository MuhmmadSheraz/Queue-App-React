import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker draggable={true} onDragEnd={(event)=>{
            console.log(event)
            const lat=event.latLng.lat()
            const lng=event.latLng.lng()
            console.log("Lat",lat)
            console.log("Lng",lng)
        }} position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ))
);

export default MyMapComponent;
