import axios from "axios";

function startCronJob(url) {
  async function pingServer() {
    try {
      const response = await axios.get("https://pretest-nvyk.onrender.com/dummy");
    } catch (error) {
      console.error(`Error pinging ${url}: ${error?.message}`);
    }
  }

  setInterval(pingServer, 30000);

  pingServer();
}

export { startCronJob };
