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
  <li>Run the command "npm start"</li>
</ul>
<h5>Step 4: Start the Front-End Web App</h5>
<ul>
  <li>Open a new terminal while keeping the previous terminal running</li>
  <li>Navigate to EC463_SW_Project\miniApp\angular-app</li>
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

<h3> File Descriptions </h3>

<strong>server.py</strong>: This python script acts as a server. It is run on an AWS EC2 Windows Instance
continuously. The script opens up a port to allow communiction through it. If anything 
except "disconnect" is sent to the server, it spits back a dictionairy in the form of a
json string. 

<strong>connection.py</strong>: Testing python script which examines the communication to the server and
if there is an error with the retrieving data with the server, it sends a text message
to my cell phone number using free twilio API. 

<strong>test.bat</strong>: Batch file that is run on another AWS EC2 Windows Instance continuously. It 
runs "connection.py" every 20 minutes, until there is error. 
Assumption: test.bat assumes that connection.py and test.bat are in the same directory.
