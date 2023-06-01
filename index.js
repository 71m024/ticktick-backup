import * as dotenv from 'dotenv';
import GetAccessToken from './src/getAccessToken.js';
dotenv.config()

const accessToken = await GetAccessToken();
console.log(accessToken);
