import getAccessToken from "./getAccessToken.js";

export default class RequestManager {
    async plainRequest(path) {
        if (!this.hasOwnProperty('headers')) {
            this.headers = new Headers()
            this.headers.append("Authorization", `Bearer ${await getAccessToken()}`)
        }
        return fetch(`https://api.ticktick.com${path}`, {method: 'GET', headers: this.headers, redirect: 'follow'})
          .then(response => response.json())
          .then(response => response.error
            ? (() => {
                throw new Error(`${response.error}: ${response.error_description}`)
            })()
            : response
          )
    }

    async request(path) {
        const response = await this.plainRequest(path)
        if (response.hasOwnProperty('errorCode') && response.errorCode === 'exceed_query_limit') {
            console.log('waiting because of query limit')
            await new Promise(resolve => setTimeout(resolve, 10000))
            return this.request(path)
        } else {
            return response
        }
    }
}
