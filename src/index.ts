import "@phala/pink-env";

function stringToHex(str: string): string {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return "0x" + hex;
}

export default function(args: any[]) {
  const sportName = 'baseball_mlb'
  const odds_http_endpoint = `https://api.the-odds-api.com/v4/sports/${sportName}/scores/?apiKey={}`;
  const kvdb_http_endpoint = `https://kvdb.io/{}`;
  const tg_bot_http_endpoint = `https://api.telegram.org/bot{}/sendMessage?chat_id=-1001986190934&text=`;

  let headers = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
  };
  let headers2 = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
    "Authorization": `Bearer {}`,
  };

  // Convert JSON data to a Buffer
  const kvdbUpdate = JSON.stringify({
    "txn": [
      {"set": "hello", "value": "world"}
      //{"delete": "users:email:old@example.com"}
    ]
  });
  const body2 = stringToHex(kvdbUpdate);
  console.log(body2)

  const [res1, res2] = pink.batchHttpRequest([
      {
        url: odds_http_endpoint,
        method: "GET",
        headers,
        returnTextBody: true,
      },
      {
        url: `${kvdb_http_endpoint}/hello`,
        method: "POST",
        headers: headers2,
        body: body2,
        returnTextBody: true,
      }
  ]);
  console.info(res1, res2);
  const res3 = pink.httpRequest({
    url: `${tg_bot_http_endpoint}${res1.body}`,
    method: "POST",
    headers,
    returnTextBody: true,
  });
  console.info(res3);
  return args[0];
}
