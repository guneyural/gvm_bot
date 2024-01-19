const { makePublicRequest, makeSignedRequest } = require("./makeRequest");

makePublicRequest("GET", "/time")
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

makeSignedRequest("GET", "/account")
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

makeSignedRequest("GET", "/myTrades", { symbol: "BTCUSDT", limit: 500 })
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
