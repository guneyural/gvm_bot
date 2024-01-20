const { makeSignedRequest } = require("./makeRequest");
const EventEmitter = require("events");

let latestOrders = [];

class GetAllOrders extends EventEmitter {
  constructor(interval, symbol, limit) {
    super();
    this.interval = interval;
    this.ordersData = [];
    this.intervalId = null;
    this.symbol = symbol;
    this.limit = limit;
  }

  startFetching() {
    this.fetchAllOrders();

    this.intervalId = setInterval(() => {
      this.fetchAllOrders();
    }, this.interval);
  }

  stopFetching() {
    clearInterval(this.intervalId);
  }

  async fetchAllOrders() {
    try {
      const response = await makeSignedRequest("GET", "/allOrders", {
        symbol: this.symbol,
        limit: this.limit,
      });

      this.ordersData = response.data;
      latestOrders = this.ordersData;

      this.emit("ordersFetched", this.ordersData);
    } catch (error) {
      console.log(error);
    }
  }
}

const getAllOrders = new GetAllOrders(5000, "ETHUSDT", 5);

getAllOrders.on("ordersFetched", (data) => {
  console.log("Orders Fetched:", new Date());
  console.log(latestOrders);
});

getAllOrders.startFetching();
