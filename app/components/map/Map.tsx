interface MapElementProps {
  id: string;
}

export function MapElement({ id }: MapElementProps) {
  return <div className="h-full w-full" id={id} />;
}
