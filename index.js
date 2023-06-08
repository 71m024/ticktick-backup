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

const projectsWithTasks = []
for (const p of projects) {
  console.log(`load project data for: ${p.name}`)
  projectsWithTasks.push(
    await request(`/open/v1/project/${p.id}/data`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  }))
}

console.log(projectsWithTasks)

// try to solve the problem with the query limit
// store everything in csv
