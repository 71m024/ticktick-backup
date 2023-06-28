import getAccessToken from "./getAccessToken.js";

export default class RequestManager {
    async plainRequest(path, requestOptions = {}, withAuth = true) {
        if (withAuth && !this.hasOwnProperty('headers')) {
            this.headers = new Headers()
            this.headers.append("Authorization", `Bearer ${await getAccessToken()}`)
        }
        return fetch(`https://api.ticktick.com${path}`, {
            ...{method: 'GET', headers: this.headers, redirect: 'follow'},
            ...requestOptions
        })
          .then(response => response.json())
          .then(response => response.error
            ? (() => {
                throw new Error(`${response.error}: ${response.error_description}`)
            })()
            : response
          )
    }

    async request(path, requestOptions = {}, withAuth = true) {
        const response = await this.plainRequest(path, requestOptions, withAuth)
        if (response.hasOwnProperty('errorCode') && response.errorCode === 'exceed_query_limit') {
            console.log('waiting because of query limit')
            await new Promise(resolve => setTimeout(resolve, 10000))
            return this.request(path, requestOptions)
        } else {
            return response
        }
    }
}
