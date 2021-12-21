import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import classes from './Map.module.css';

const API_KEY =
  'pk.eyJ1IjoiZHVzYW52b2pub3ZpYyIsImEiOiJja3hidGlxa2gxMWQyMnFrdDNzZzRzcmNjIn0.ftthdp7yQAUeKAIqHaJhmA';

// const Map = (props) => {
//   const { center, zoom } = props;
//   const mapRef = useRef();
//   useEffect(() => {
//     mapboxgl.accessToken = API_KEY;
//     const map = new mapboxgl.Map({
//       container: mapRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: center,
//       zoom: zoom,
//     });
//     new mapboxgl.Marker({ position: center, map: map });
//   }, [center, zoom]);
//   return <div ref={mapRef} className={classes.map} style={props.style}></div>;
// };

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    let marker = new window.ol.Feature({
      geometry: new window.ol.geom.Point(
        window.ol.proj.fromLonLat([center.lng, center.lat])
      ),
    });

    let markerStyle = new window.ol.style.Style({
      image: new window.ol.style.Circle({
        radius: 8,
        fill: new window.ol.style.Fill({ color: '#fff' }),
        stroke: new window.ol.style.Stroke({
          color: 'red',
          width: 5,
        }),
      }),
    });

    marker.setStyle(markerStyle);

    const layer = new window.ol.layer.Vector({
      source: new window.ol.source.Vector({
        features: [marker],
      }),
    });

    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
        layer,
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={classes.map}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
