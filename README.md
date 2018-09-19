# EC463_SW_Project
EC463: Senior Design Project 1

server.py: This python script acts as a server. It is run on an AWS EC2 Windows Instance
continuously. The script opens up a port to allow communiction through it. If anything 
except "disconnect" is sent to the server, it spits back a dictionairy in the form of a
json string. 

connection.py: Testing python script which examines the communication to the server and
if there is an error with the retrieving data with the server, it sends a text message
to my cell phone number using free twilio API. 

test.bat: Batch file that is run on another AWS EC2 Windows Instance continuously. It 
runs "connection.py" every 20 minutes, until there is error. 
Assumption: test.bat assumes that connection.py and test.bat are in the same directory.
