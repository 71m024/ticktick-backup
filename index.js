import * as dotenv from 'dotenv';
import RequestManager from "./src/RequestManager.js";
import fs from "fs";
dotenv.config();

const cachePath = './cache.json'
let projectsWithTasks = []

if (process.argv.includes('--use-cache') && fs.existsSync(cachePath)) {

  console.log('load data projects from cache')
  projectsWithTasks = JSON.parse(fs.readFileSync(cachePath).toString())

} else {

  console.log('load projects from api')
  const requestManager = new RequestManager()
  const projects = await requestManager.request('/open/v1/project')

  for (const p of projects) {
    console.log(`load project data for: ${p.name}`)
    projectsWithTasks.push(await requestManager.request(`/open/v1/project/${p.id}/data`))
  }
  fs.writeFileSync(cachePath, JSON.stringify(projectsWithTasks))

}

if (!fs.existsSync('data')){
  fs.mkdirSync('data');
}

fs.writeFileSync('data.json', JSON.stringify(projectsWithTasks))
