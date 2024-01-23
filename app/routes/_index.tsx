import type { MetaFunction } from "@remix-run/node";
import { MapElement, useMap } from "~/components/map";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [mapId] = useMap();

  return (
    <div className="h-full w-full">
      <MapElement id={mapId} />
    </div>
  );
}
