import csv
import datetime 
import random
import json

#Getting current date
full_datetime = str(datetime.datetime.now()) 				

#get date as string and hour as int in military time
date = str(full_datetime[0:10])
hour = int(full_datetime[11:13]) 

#generate vector of random #s for Temperature and Humidity
temp_vec = random.sample(range(64, 86), hour + 1) #+1 because we count 0
humidity_vec = random.sample(range(34,66), hour + 1)


#Preallocating list of dictionaries
dic_list = [dict() for x in range(hour+1)]

#Creating list of dictionaries
for i in range(0,hour+1):
	if i < 10:
		time_i = "0" + str(i) + ":00"
	else:
		time_i = str(i) + ":00"
	dic_list[i]={
		"Time": time_i,
		"Temperature": temp_vec[i],
		"Humidity": humidity_vec[i]
	}
filename = date + ".json"

with open(filename, 'w') as outfile:
    json.dump(dic_list, outfile)


