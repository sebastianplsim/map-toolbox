import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox/typed";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers/typed";
import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import { MapElement, useMap } from "~/components/map";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { bboxPolygon, centerOfMass } from "@turf/turf";

export const meta: MetaFunction = () => {
  return [
    { title: "Tile Debug | Map Toolbox" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [mapId, mapRef] = useMap();

  useEffect(() => {
    const deckOverlay = new DeckOverlay({
      layers: [
        new MVTLayer({
          id: "mvt-layer",
          data: "/mvt-endpoint?z={z}&x={x}&y={y}",
          renderSubLayers(subLayerProps) {
            const [[minX, minY], [maxX, maxY]] = subLayerProps.tile.boundingBox;

            const { z, x, y } = subLayerProps.tile.index;

            const tilePolygon = bboxPolygon([minX, minY, maxX, maxY]);

            return [
              new GeoJsonLayer({
                id: `${subLayerProps.id}-boundary`,
                data: tilePolygon,
                filled: false,
                stroked: true,
                getLineColor: [255, 0, 0, 255],
                lineWidthUnits: "pixels",
                getLineWidth: 5,
              }),
              new TextLayer({
                id: `${subLayerProps.id}-text`,
                data: [
                  {
                    text: `${z}/${x}/${y}`,
                    position: centerOfMass(tilePolygon).geometry.coordinates,
                  },
                ],
                sizeUnits: "pixels",
                getSize: 16,
                getTextAnchor: "middle",
                getPosition: (d) => d.position,
                getAlignmentBaseline: "center",
              }),
            ];
          },
        }),
      ],
    });

    mapRef?.addControl(deckOverlay);
    // mapRef?.addControl(new mapboxgl.NavigationControl());
  }, [mapRef]);

  return (
    <div className="h-full w-full">
      <MapElement id={mapId} />
    </div>
  );
}
