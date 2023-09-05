import "@phala/pink-env";

const odds_http_endpoint = "https://api.the-odds-api.com/v4/sports/";
const kvdb_http_endpoint = "https://kvdb.io/{}/";
const tg_bot_http_endpoint = "https://api.telegram.org/bot{}/sendMessage?chat_id=-1001986190934&text={}";

function stringToHex(str: string): string {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return "0x" + hex;
}

export default function(args: any[]) {
  let headers = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
  };
  let headers2 = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
    "Authorization": "Bearer {}",
  };
  const profileId = '0x01'
  let query = JSON.stringify({
    query: `query Profile {
            profile(request: { profileId: \"${profileId}\" }) {
                stats {
                    totalFollowers
                    totalFollowing
                    totalPosts
                    totalComments
                    totalMirrors
                    totalPublications
                    totalCollects
                }
            }
        }`,
  });
  const body = stringToHex(query);
  console.log(`${body}`);
  const res1 = pink.batchHttpRequest([{
    url: 'https://api-mumbai.lens.dev/',
    method: "POST",
    headers,
    body,
    returnTextBody: true,
  }]);
  console.info(res1);
  const res2 = pink.httpRequest({
    url: 'https://api.chainsafe.io/api/v1/buckets',
    method: "GET",
    headers: headers2,
    returnTextBody: true,
  });
  console.info(res2);

  // Convert JSON data to a Buffer
  const jsonBuffer = JSON.stringify({
    "txn": [
      {"set": "hello", "value": "world"}
      //{"delete": "users:email:old@example.com"}
    ]
  });

  const body2 = stringToHex(jsonBuffer);
  console.log(body2)
  const res3 = pink.httpRequest({
    url: 'https://kvdb.io/{}/hello',
    method: "POST",
    headers: headers2,
    body: body2,
    returnTextBody: true,
  });
  console.info(res3);
  return args[0];
}
