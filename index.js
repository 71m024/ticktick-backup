import * as dotenv from 'dotenv';
import getAccessToken from './src/getAccessToken.js';
import request from "./src/request.js";
dotenv.config();

const accessToken = await getAccessToken()

const myHeaders = new Headers()
myHeaders.append("Authorization", `Bearer ${accessToken}`)

const projects = await request('/open/v1/project', {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
})

const loadProject = async (p) => {
  console.log(`load project data for: ${p.name}`)
  const response = await request(`/open/v1/project/${p.id}/data`, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
  if (response.hasOwnProperty('project')) {
    return response
  } else if (response.hasOwnProperty('errorCode') && response.errorCode === 'exceed_query_limit') {
    console.log('waiting because of query limit')
    await new Promise(resolve => setTimeout(resolve, 10000))
    return loadProject(p)
  } else {
    throw new Error(`could not load project: ${JSON.stringify(response)}`)
  }
}

const projectsWithTasks = []
for (const p of projects) {
  projectsWithTasks.push(await loadProject(p))
}

console.log(projectsWithTasks)

// try to solve the problem with the query limit
// store everything in csv

console.log(projectsWithTasks.filter((p) => p.hasOwnProperty('project')).length)
