import * as dotenv from 'dotenv';
import getAccessToken from './src/getAccessToken.js';
dotenv.config()

const accessToken = await getAccessToken();
console.log(accessToken);
