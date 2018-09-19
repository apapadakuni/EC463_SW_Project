import socket
import sys
from twilio.rest import Client




def check_connection():
#Checks for Server connection. Returns -1 if nothing received and 0 for success
    client = socket.socket()
    ip =  '13.59.178.74'
    client.connect((ip, 6969))
    client.send("Send Data Test".encode())
    data_received = client.recv(1024)
    if (type(data_received)==str and len(data_received)!=0):
        return 0
    else:
        return -1 #-1 for error


def send_alert():
#Uses free twilio API to send alert to my cellphone number. 
    account_sid = 'AC2e2b6ec4e802dd82d1c18ff889340a6d'
    auth_token = '1fe81a38eaec21162a4c5007e93cde95'
    client = Client(account_sid, auth_token)
    message = client.messages \
                .create(
                     body="Mini Software Project: ERROR. SERVER DOWN",
                     from_='+19783156960',
                     to='+16177687795'
                 )

if __name__ == "__main__":
    result = check_connection() #Check connection
    if (result == -1):          #If error, send alert
        send_alert()
    sys.stdout.write(str(result))       #write result to console.
