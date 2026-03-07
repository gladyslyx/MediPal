# MEDIPAL
Health tracking web application.

## FRONTEND
### Background
This section primarily handles the user interface, inputs and interactions.
Uses Node and React + Vite.

### Execution
To run the web application:  
1. Use the terminal, navigate to the folder "frontend".  
<img src="./DemoImages/NaviToFrontend.png" width="500">

Tip: Use command "dir" to find where you are.  
<img src="./DemoImages/DirTip.png" width="500">

2. Write "npm run dev" into terminal.  
<img src="./DemoImages/NpmRunDev.png" width="500">
Note: If this is your first time, write "npm install" to install missing dependencies.   

3. To close connect hold "ctrl" + "c".  

## BACKEND
### Background  
This section currently primarily handles the database and APIs.  
Uses Node, Express and SQLite.  

Authentication Server: <br>
Listening port: 3000  <br>
URL: http://localhost:3000  <br>
DESC: Handles user authentication and creation/deletion of tokens. <br>
CMD: npm run authServer 

Resource Server: <br>
Listening port: 4000 <br> 
URL: http://localhost:4000 <br>  
DESC: Handles retrieval of user data from database. <br>
CMD: npm run resServer 

### Execution  
To open server APIs:  
1. Use the terminal, navigate to the folder "backend".  
<img src="./DemoImages/NaviToBackend.png" width="500">

Tip: Use command "dir" to find where you are.  
<img src="./DemoImages/DirTip.png" width="500">

2. Write the CMD for whichever server you need. 
<img src="./DemoImages/npmRunAuthServer.png" width="500">

<img src="./DemoImages/npmRunResServer.png" width="500">
The response message should look similar to the above.  <br>

3. To close connect hold "ctrl" + "c".  
