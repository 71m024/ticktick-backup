# TickTick Backup

1. `git clone git@github.com:71m024/ticktick-backup.git`
2. `cd ticktick-backup`
3. `mv .env.example .env `
4. Login on https://developer.ticktick.com/manage/1509
5. Create an app (you will need it in the following steps)
6. go to https://oauthdebugger.com/ and fill with:
    - `Authorize URI:` https://ticktick.com/oauth/authorize
    - `Redirect URI:` https://oauthdebugger.com/debug
    - `Client ID:` from your app (step 5)
    - `Scope:` tasks:write tasks:read
    - `State:` some random characters
    - `Nonce:` some random characters
    - `Response type:` code
    - `Response mode:` query
7. Click on "send"
8. Authorize with your ticktick-account
9. Open the `.env` file and fill with:
    * `OAUTH_CODE=` the authorization code from the previous step
    * `OAUTH_CLIENT_ID=` the client-id of your ticktick app (step 5)
    * `OAUTH_CLIENT_SECRET=` the client-secret of your ticktick app (step 5)
    * `OAUTH_REDIRECT_URI=` "https://oauthdebugger.com/debug"
10. `npm install`
11. `npm start`
