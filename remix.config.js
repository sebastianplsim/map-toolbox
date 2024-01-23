/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [/(?<=@deck\.gl).*/, /(?<=gl-matrix).*/],
};
