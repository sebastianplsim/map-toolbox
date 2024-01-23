import mapboxgl from "mapbox-gl";

import { useEffect, useId, useState } from "react";

export function useMap() {
  const containerId = useId();
  const [mapRef, setMapRef] = useState<mapboxgl.Map>();

  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: window.ENV.MAPBOX_ACCESS_TOKEN,
      container: containerId,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // container: "map",
      projection: {
        name: "mercator",
      },
    });

    setMapRef(map);
    map.on("render", () => map.resize());
  }, [setMapRef, containerId]);

  return [containerId, mapRef] as const;
}
