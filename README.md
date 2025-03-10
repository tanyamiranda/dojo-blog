<h1>For this app, you need to start json server first and then the local server.</h1>
<p>Currently, this app can only run locally. No json-server hosting is available to run this app on github.</p>

### 1st - install json-server in this local project instance
```
npm install jason-server
``` 
### 2nd - Run JSON server to server json files on port 5555. The code uses the json file at this specific port.
```
npx json-server data/db.json --port 2222
```
### 3rd - Open separate terminal windpw and run server app.
```
npm run serve
```
