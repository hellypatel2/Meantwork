const protocol = "https";
// const host = "localhost:5002/api/v1/";
const host = "api-meantwork.herokuapp.com/api/v1/";
const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

const config = {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl
};
export default config;
