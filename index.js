import * as dotenv from 'dotenv'
dotenv.config()

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

let urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "authorization_code");
urlencoded.append("code", process.env.OAUTH_CODE);
urlencoded.append("client_id", process.env.OAUTH_CLIENT_ID);
urlencoded.append("client_secret", process.env.OAUTH_CLIENT_SECRET);
urlencoded.append("redirect_uri", process.env.OAUTH_REDIRECT_URI);
urlencoded.append("scope", "tasks:write tasks:read");

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

let response = await (
  await fetch("https://ticktick.com/oauth/token", requestOptions)
).json();
if (response.error) {
  throw new Error(`${response.error}: ${response.error_description}`);
}
let accessToken = response.access_token;

console.log(accessToken);