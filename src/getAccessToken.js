import fs from 'fs'
import request from "./request.js";

export default async function getAccessToken() {
  const accessTokenPath = './access-token'
  if (fs.existsSync(accessTokenPath)) {
    return fs.readFileSync(accessTokenPath).toString()
  } else {
    const accessToken = await getNewAccessToken()
    fs.writeFileSync('./access-token', accessToken)
    return accessToken
  }
}

async function getNewAccessToken() {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  const urlencoded = new URLSearchParams()
  urlencoded.append("grant_type", "authorization_code")
  urlencoded.append("code", process.env.OAUTH_CODE)
  urlencoded.append("client_id", process.env.OAUTH_CLIENT_ID)
  urlencoded.append("client_secret", process.env.OAUTH_CLIENT_SECRET)
  urlencoded.append("redirect_uri", process.env.OAUTH_REDIRECT_URI)
  urlencoded.append("scope", "tasks:write tasks:read")

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }

  return await request('/oauth/token', requestOptions).access_token
}
