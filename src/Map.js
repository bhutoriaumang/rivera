import './App.css'

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const marker = { lat: 12.916517, lng: 79.132500 };

function App (){
    <>

      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Showing static map with marker</h2>

          <div className="col">
            <MapContainer
              center={marker}
              zoom={12}
              className="static-map"
            >
              <TileLayer url={osm.maptiler.url} />
              <Marker position={[marker.lat, marker.lng]}></Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>

}
export default App