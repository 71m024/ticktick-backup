import * as dotenv from 'dotenv';
import RequestManager from "./src/RequestManager.js";
import fs from "fs";
dotenv.config();

const cachePath = './cache.json'
let projectsWithTasks = []

if (process.argv.includes('--use-cache') && fs.existsSync(cachePath)) {
  projectsWithTasks = JSON.parse(fs.readFileSync(cachePath))
} else {
  const requestManager = new RequestManager()
  const projects = await requestManager.request('/open/v1/project')

  for (const p of projects) {
    console.log(`load project data for: ${p.name}`)
    projectsWithTasks.push(await requestManager.request(`/open/v1/project/${p.id}/data`))
  }
  fs.writeFileSync('./data.json', JSON.stringify(projectsWithTasks))
}

console.log(projectsWithTasks)

// use cache with: node index.js --use-cache
// store everything in csv
