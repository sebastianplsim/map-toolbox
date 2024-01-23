export function loader() {
  return new Response(null, {
    status: 200,
    headers: { "Content-Type": "application/vnd.mapbox-vector-tile" },
  });
}
