import * as dotenv from 'dotenv';
import RequestManager from "./src/RequestManager.js";
dotenv.config();

const requestManager = new RequestManager()

const projects = await requestManager.request('/open/v1/project')

const projectsWithTasks = []
for (const p of projects) {
  console.log(`load project data for: ${p.name}`)
  projectsWithTasks.push(await requestManager.request(`/open/v1/project/${p.id}/data`))
}

console.log(projectsWithTasks)

// try to solve the problem with the query limit
// store everything in csv

console.log(projectsWithTasks.filter((p) => p.hasOwnProperty('project')).length)
