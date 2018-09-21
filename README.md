# EC463_SW_Project
EC463: Senior Design Project 1

<h3>Install/Run Instructions</h3>

<h5>Step 1: Setup Node.js and Angular 5</h5>
<ul>
  <li>Download and Install Node.js following these instructions: https://nodejs.org/en/download/ in order to run the backend server</li>
  <li>Perform the command "npm install -g @angular/cli" to get the Angular CLI needed to run the web app</li>
</ul>
<h5>Step 2: Get the Source Files</h5>
<ul>
  <li>Clone the repo on your local machine by running the command "git clone https://github.com/apapadakuni/EC463_SW_Project.git"</li>
</ul>
<h5>Step 3: Start the Backend Server</h5>
<ul>
  <li>Navigate to EC463_SW_Project\miniApp in the terminal</li>
  <li>Run the command "npm install" to install all the necessary packages</li>
  <li>Run the command "npm start"</li>
</ul>
<h5>Step 4: Start the Front-End Web App</h5>
<ul>
  <li>Open a new terminal while keeping the previous terminal running</li>
  <li>Navigate to EC463_SW_Project\miniApp\angular-app</li>
  <li>Run the command "npm install" to install all the necessary packages</li>
  <li>Run the commmand "ng serve"</li>
</ul>
<h5>Step 5: Open the Application in a Browser</h5>
<ul>
  <li>Open a browser</li>
  <li>Enter the url: "http:localhost:4200"</li>
</ul>
<h5>Step 6: Sign in to the Application</h5>
<ul>
  <li>Click on the "Login" button on the homepage</li>
  <li>Enter your google credentials</li>
</ul>
<h5>Step 7: Register a New Room</h5>
<ul>
  <li>Navigate to the "Register a New Room" section at the bottom of the portal</li>
  <li>Enter the name of a room</li>
</ul>
<h5>Step 8: View Sensor Data for a Room</h5>
<ul>
  <li>Click on any of the buttons with the room names</li>
  <li>View the chart containing the temperature and humidity data</li>
</ul>
<br>
<h3> Design Description </h3>

<h4> Overview </h4>

<p> This repo contains a web application for viewing sensor data from rooms in a house. The application consists of an angular front end which the user interacts with in the browser. This web app communicates with a backend node.js server. This server makes calls to fetch data from a mongodb database, to authenticate users via google, and to fetch sensor data from a separate server hosted on Amazon EC2. </p>
  
<h4> Front-End: Angular Web App </h4>

<p>For the front-end application, the angular framework is used. HTML, CSS, and TS files are used to define several components, which are displayed when navigated to using basic routing. There are components for the data display, for the user portal, and for the home page. To display the sensor data, the Chart.js framework was used to construct the line graphs. This front-end web app makes all calls to the backend Node.js server to perform any sort of processing or data storage/fetching.</p>

<h4> Back-End: Node.js Server </h4>

<p>For the back-end server, the node.js framework is used. This server acts as a gateway, as it communicates with all of the other pieces in the system and routes the information backend to the front-end web app. This server communicates with the mongodb database hosted in mLab in order to fetch and save data. This server communicates with google to authenticate users and fetch user data. This server also communicates with the Amazon EC2 instance's server to fetch sensor data. </p>

<h4> Data Storage: MongoDB Database </h4>

<p>For permanent data storage, a mongoDB database has been created and hosted on mLab. This database stores User documents. These documents contain the username, google ID, and list of rooms registered for a user. A MongoDB NoSQL database was used since the setup was less complex and there was minimal data that needed to be stored. Thus, using SQL in order to manage complex relationships between tables was not necessary. </p>

<h4> Authentication: Google OAuth2 </h4>

<p>In order to login to the system, the user must supply their google credentials. Using passport, the node server communicates with google to authenticate the user and fetch the relevant google profile data. This authentication method utilizes OAuth2 technology. A third party login was used in order to avoid the development overhead of creating a new custom authentication system.</p>

<h4> Sensor Data: 1st Amazon EC2 Instance Server </h4>

<p>In order to simulate a Temperature and Humidity sensor, we create a json string in the form of a dictionary of random numbers. There is a script running continuously on an EC2 that, if it receives a request, shall send back the json string. The server will listen to at most 1 client at a time. The script uses the python module <i>sockets</i> to open and listen to the port number that Node.js server will connect to.</p>
  
<h4> Testing: 2nd Amazon EC2 Instance Server </h4>

<p>A 2nd server is required to test the data simulation server. This runs the python script every 20 minutes and checks if the correct data have been received. If there is an error in the connection, or an error in the data received, it will use the python module <i>twilio</i> to send a text message immediately to the developer and alert them of the error.</p>

 <br>
 
<h3> File Descriptions </h3>

<h4> AWS EC2 Cloud Files </h4>

<strong>server.py</strong>: This python script acts as a server. It is run on an AWS EC2 Windows Instance
continuously. The script opens up a port to allow communiction through it. If anything 
except "disconnect" is sent to the server, it spits back a dictionairy in the form of a
json string. This data represents the temperature and humidity data that would be captured by a sensor over a 24 hour period.

<strong>connection.py</strong>: Testing python script which examines the communication to the server and
if there is an error with the retrieving data with the server, it sends a text message
to my cell phone number using free twilio API. 

<strong>test.bat</strong>: Batch file that is run on another AWS EC2 Windows Instance continuously. It 
runs "connection.py" every 20 minutes, until there is error. 
Assumption: test.bat assumes that connection.py and test.bat are in the same directory.

<h4> Node.js Backend Server File </h4>

<strong>miniApp/app.js</strong> This js file contains the startup and configuration code for the server. This configuration includes creating a basic Express.js server, connecting to an external mongodb database hosted on mLab, and setting up the Google Authentication strategy via Passport.js. 

<strong>miniApp/routes/*</strong> Folder containing the js code for the different routes. Each file describes a router which handles certain requests to the backend server. For each route, a function is specified which shall be run when the route is requested. 

<strong>miniApp/models/User.js</strong> This js file contains the Mongoose.js schema describing the User collection in the mongoDB database. This collection contains data about the user such as the rooms they have registered with "sensors". This schema describes all of the field names and data types in a single record in the User collection. It also defines specific functions used to query the database and insert/update data in the database. 

<h4> Angular Frontend Web App </h4>

<strong>miniApp/angular-app/src/app/data/*</strong> TS, HTML, and CSS files for the component which displays the sensor data in the chart. 

<strong>miniApp/angular-app/src/app/home/*</strong> TS, HTML, and CSS files for the component which displays the user portal upon login. This component lists the user's rooms and allows for rooms to be registered. 

<strong>miniApp/angular-app/src/app/main-body/*</strong> TS, HTML, and CSS files for the component which displays the initial home page for the web app and allows the user to login. 

<strong>miniApp/angular-app/src/app/app.component.*</strong> TS, HTML, and CSS files for the component which acts as the parent for all other components. 

<strong>miniApp/angular-app/src/app/app.module.ts</strong> TS file used to setup the router and setup the components, services, and packages. 

<strong>miniApp/angular-app/src/app/data.service.ts</strong> TS file containing the service for fetching sensor data. Defines a function to be called when the sensor data needs to be fetched from the backend server using HTTP. 

<strong>miniApp/angular-app/src/app/user.service.ts</strong> TS file containing the service for fetching user data. Defines functions to be called when the user data needs to be fetched from or updated on the backend server using HTTP.

<strong>miniApp/angular-app/src/app/User.ts</strong> TS file containing a class definition for a User. Follows same structure as the backend mongoose schema. 

<strong>miniApp/angular-app/src/app/SensorData.ts</strong> TS file containing a class definition for a json object with sensor data.
<br><br>
<h3> Manual Testing </h3>
<h4> With already existing gmail address in picked browser: </h4>
<ul>
  <li>Go to “localhost:4200”.</li>
  <li>Click <i>Login</i>.</li>
  <li>Pick already existing gmail address (preferably not your BU account yet.)</li>
  <li>Enter “Kitchen” in the EditField under <i>Register a New Room</i> and hit Return.
  <li>Click on new button <i>Kitchen</i>.</li>
  <li>Check each point on pop up Graph for existing values.</li>
  <li>Click on the <i>X</i> at the top left corner of the Graph.</li>
  <li>Enter “Living Room” in the EditField under <i>Register a New Room</i> and hit Return. </li>
  <li>Click on new button <i>Living Room</i>.</li>
  <li>Check each point on pop up Graph for existing values.</li>
</ul>
<h4> Without already existing gmail address in picked browser: (For this to happen, I suggest opening an Icognito Mode Window.)</h4>
<ul>
  <li> Go to “localhost:4200”.</li>
  <li>Click <i>Login</i>.</li>
  <li>Enter your @bu.edu address.</li>
  <li>BU’s security will pop up. Enter your BU username and Kerberos password.</li>
  <li>Enter “Bathroom” in the EditField under <i>Register a New Room</i> and hit Return.</li>
  <li>Enter “Bedroom” in EditField under <i>Register a New Room</i> and hit Return. </li>
  <li>Close window and open a new one. </li>
  <li>Repeat steps 1-4. </li>
  <li>Click on new button <i>Bathroom</i>.</li>
  <li>Check each point on pop up Graph for existing values.</li>
  <li>Click on the <i>X</i> at the top left corner of the Graph.</li>
  <li>Click on new button <i>Bedroom</i>.</li>
  <li>Check each point on pop up Graph for existing values.</li>
</ul>

<h3> Software Architecture </h3>

![Software Architecture](https://user-images.githubusercontent.com/31832559/45859452-67a8dd80-bd30-11e8-8729-947e3298e5b6.png)



<h3> Project Contributions </h4>

<strong>Matthew Cote</strong> Created front-end web app, configured authentication system, and setup MongoDB database. 

<strong>Andreas Boyle Papadakis</strong> Created data-simulation server and python script, constructed testing server and programs, and wrote manual test cases.
