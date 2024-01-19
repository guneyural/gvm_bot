const { makePublicRequest, makeSignedRequest } = require("./makeRequest");

makePublicRequest("GET", "/time", { isim: "guney", soyisim: "ural" })
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

makeSignedRequest("GET", "/account", {})
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

makeSignedRequest("GET", "/myTrades", { symbol: "BTCUSDT", limit: 500 })
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
