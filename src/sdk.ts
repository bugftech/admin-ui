import { Bugfreed } from "./sdk/bugfreed/bugfreed";

const url = import.meta.env.VITE_API_SERVER_URL;
const bugfreed = new Bugfreed({
  requestWay: "axios",
  apiUrl: url,
});

export default bugfreed;
