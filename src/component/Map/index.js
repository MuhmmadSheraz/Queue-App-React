import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 25.1933895, lng: 66.5949635 }}
    >
      {props.isMarkerShown && (
        <Marker
          draggable={true}
          onDragEnd={(event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            fetch(
              `https://api.foursquare.com/v2/venues/search?client_id=1LZPR3RSBOVC431GJ22CYJCNE1K5EDRXFMVC3L4KM0UP04IR&client_secret=YCIX5AWPX1H2PDP1PP1G3TCTFVVPT2Z5P4XSTLPZTBNKLV4X&v=20180323&ll=${lat},${lng}`
            )
              .then((res) => res.json())
              .then((res) => {
                props.hello(res);
              });
          }}
          position={{ lat: props.marker.lat, lng: props.marker.lng }}
        />
      )}
    </GoogleMap>
  ))
);
const MyMapComponents = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: props.axis.lat, lng: props.axis.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.marker.lat, lng: props.marker.lng }} />
      )}
    </GoogleMap>
  ))
);

export { MyMapComponents, MyMapComponent };
