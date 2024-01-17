import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const Map = ({ latitude, longitude }) => {
  const mapContainer = useRef(null);

  console.log(latitude, longitude);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [longitude, latitude],
      zoom: 12,
    });

    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(map);
    new maplibregl.Marker()
      .setLngLat([longitude + 0.002, latitude + 0.002])
      .addTo(map);

    return () => map.remove();
  }, [latitude, longitude]);

  return <div ref={mapContainer} style={{ width: "90%", height: "400px" }} />;
};

export default Map;
