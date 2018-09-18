import socket
import random
import json
import datetime

def create_json():
#Creates a jsonstring with random data as an array of dict in the form of: {"Time": "00:00", "Temperature": 77, "Humidity": 56}

    #Function returns num random integers between start and end
    def Rand(start, end, num): 
        res = [] 
  
        for j in range(num): 
             res.append(random.randint(start, end)) 
  
        return res 


    hours = 24
    temp_vec = Rand(64, 86, hours)
    humidity_vec = Rand(34, 66, hours)


    #Preallocating dictionary which will be converted to jsonstring in the end
    jsonstring = [dict() for x in range(3)]


    time_vec = []
    for i in range(0,hours):
        if i < 10:
            time_vec.append("0" + str(i) + ":00")
        else:
            time_vec.append(str(i) + ":00")

    jsonstring = {"Time": time_vec, "Temperature": temp_vec, "Humidity": humidity_vec}
    jsonstring = json.dumps(jsonstring) #convert to jsonstring
    return jsonstring


#Creating the server with localhost and port number 6969
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
name = socket.gethostname()
ip = socket.gethostbyname(name)
port = 6969
address = (ip, port)
server.bind(address)
server.listen(1)    #Listening only from one client at a time
connection_str = "Started listening on " + str(ip) + ":" + str(port)
print(connection_str)

#Infinite loop waiting for client to connect and send data
while (True):
    client, addr = server.accept()
    validation_str = "Got a connection from " + str(addr[0]) + ":" + str(addr[1])
    data_received = client.recv(port)
    receive_str = "Received: " + data_received.decode()
    print(receive_str)
    print("Giving Data back________________________________________________")
    data_sent = create_json()
    client.send(data_sent.encode())
    #if client send 'disconnect'
    if (data_received == b"disconnect"):
        client.close()
        break
    