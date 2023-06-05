import * as dotenv from 'dotenv'
import getAccessToken from './src/getAccessToken.js'
import request from "./src/request.js";
dotenv.config()

const accessToken = await getAccessToken()

const myHeaders = new Headers()
myHeaders.append("Authorization", `Bearer ${accessToken}`)

const projects = await request('/open/v1/project', {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
})

// for each project, get the tasks
// it looks like the task-by-id endpoint is useless
