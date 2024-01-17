import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { lineDistance, along, bearing, point } from "@turf/turf";

const AnimatedMap = ({
  startLatitude,
  startLongitude,
  endLatitude,
  endLongitude,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [-96, 37.8],
      zoom: 3,
    });

    // // San Francisco
    // const origin = [
    //   isNaN(startLatitude) || !startLatitude ? -122.414 : startLatitude,
    //   isNaN(startLongitude) || !startLongitude ? 37.776 : startLongitude,
    // ];

    // // Washington DC
    // const destination = [
    //   isNaN(endLatitude) || !endLatitude ? -77.032 : endLatitude,
    //   isNaN(endLongitude) || !endLongitude ? 38.913 : endLongitude,
    // ];

    const origin = [-122.414, 37.776];

    // Washington DC
    const destination = [-77.032, 38.913];
    console.log("Inside Animated Map", origin, destination);
    // // A simple line from origin to destination.
    const route = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [origin, destination],
          },
        },
      ],
    };

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    const p = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: origin,
          },
        },
      ],
    };

    // Calculate the distance in kilometers between route start/end point.
    const ld = lineDistance(route.features[0], "kilometers");

    const arc = [];

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    const steps = 500;

    // Draw an arc between the `origin` & `destination` of the two points
    for (let i = 0; i < ld; i += ld / steps) {
      const segment = along(route.features[0], i, "kilometers");
      arc.push(segment.geometry.coordinates);
    }

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    // Used to increment the value of the point measurement against the route.
    let counter = 0;

    map.on("load", () => {
      // Add a source and layer displaying a point which will be animated in a circle.
      map.addSource("route", {
        type: "geojson",
        data: route,
      });

      map.addSource("point", {
        type: "geojson",
        data: p,
      });

      map.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 2,
          "line-color": "#007cbf",
        },
      });

      map.addLayer({
        id: "point",
        source: "point",
        type: "symbol",
        layout: {
          "icon-image": "airport_15",
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-overlap": "always",
          "icon-ignore-placement": true,
        },
      });

      function animate() {
        // Update point geometry to a new position based on counter denoting
        // the index to access the arc.
        console.log("route.features", route.features);
        p.features[0].geometry.coordinates =
          route.features[0].geometry.coordinates[counter];

        // Calculate the bearing to ensure the icon is rotated to match the route arc
        // The bearing is calculate between the current point and the next point, except
        // at the end of the arc use the previous point and the current point
        p.features[0].properties.bearing = bearing(
          point(
            route.features[0].geometry?.coordinates[
              counter >= steps ? counter - 1 : counter
            ] || origin
          ),
          point(
            route.features[0].geometry?.coordinates[
              counter >= steps ? counter : counter + 1
            ] || origin
          )
        );

        // Update the source with this new data.
        map.getSource("point").setData(p);

        // Request the next frame of animation so long the end has not been reached.
        if (counter < steps) {
          requestAnimationFrame(animate);
        }

        counter = counter + 1;
      }

      // Start the animation.
      animate(counter);
    });

    return () => map.remove();
  }, [startLatitude, startLongitude, endLatitude, endLongitude]);

  return <div ref={mapContainer} style={{ width: "90%", height: "400px" }} />;
};

export default AnimatedMap;
