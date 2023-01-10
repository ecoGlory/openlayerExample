import { useContext } from 'react';
import MapContext from './Map/MapContext';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { OSM, XYZ } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';

function App() {
  
    const { map } = useContext(MapContext);

    // zoom in
    const handleZoomInClick = () => {
        // map.getView().setZoom(map.getView().getZoom() + 1);
        const zoom = map.getView().getZoom() + 1;
        map.getView().animate({
          zoom,
          duration: 500
        });
    };

    // zoom out
    const handleZoomOutClick = () => {
        // map.getView().setZoom(map.getView().getZoom() - 1);
        const zoom = map.getView().getZoom() - 1;
        map.getView().animate({
          zoom,
          duration: 500
        });
    };
    
    // reset button
    const handleReset = () => {
      const zoom = map.getView().getZoom() - 1;
        map.getView().animate({
          zoom: 15,
          duration: 500,
          center: fromLonLat([127.9745613, 37.3236563], getProjection('EPSG:3857')),
        });
    }
    
    // handleSatelliteMap button
    function handleSatelliteMap(){
      const satelliteMap = new TileLayer({
        name: 'Satellite',
        visible: true,
        source: new XYZ({
          url: `http://api.vworld.kr/req/wmts/1.0.0/62C2DB30-BD88-33BE-AECE-4011F6D1C6E7/Satellite/{z}/{y}/{x}.jpeg`
        })
      });
      map.addLayer(satelliteMap);
    }
    
    // handlehybridMap button
    function handlehybridMap() {
      const hybridMap = new TileLayer({
        name: 'Hybrid',
        visible: true,
        source: new XYZ({
          url: `http://api.vworld.kr/req/wmts/1.0.0/62C2DB30-BD88-33BE-AECE-4011F6D1C6E7/Hybrid/{z}/{y}/{x}.png`
        })
      });
      map.addLayer(hybridMap);
    }

    return (
        <>
            <button onClick={handleZoomInClick}>zoomIn</button>
            <button onClick={handleZoomOutClick}>zoomOut</button>
            <button onClick={handleReset}>reset</button>
            <button onClick={handleSatelliteMap}>SatelliteMap</button>
            <button onClick={handlehybridMap}>SatelliteMap</button>
            <div id="map" style={{ width: '100%', height: 700 }}>
            </div>
        </>
    );
}

export default App;
