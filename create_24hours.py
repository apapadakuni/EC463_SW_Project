import random
import json
import datetime


#Function returns num random integers between start and end
def Rand(start, end, num): 
    res = [] 
  
    for j in range(num): 
        res.append(random.randint(start, end)) 
  
    return res 


hours = 24
temp_vec = Rand(64, 86, hours)
humidity_vec = Rand(34, 66, hours)


#Preallocating list of dictionaries
dic_list = [dict() for x in range(hours+1)]

#Creating list of dictionaries
for i in range(0,hours):
	if i < 10:
		time_i = "0" + str(i) + ":00"
	else:
		time_i = str(i) + ":00"
	dic_list[i]={
		"Time": time_i,
		"Temperature": temp_vec[i],
		"Humidity": humidity_vec[i]
	}
print(dic_list)
#Create json file with name as the current date
full_datetime = str(datetime.datetime.now()) 
date = str(full_datetime[0:10])
filename = date + ".json"
with open(filename, 'w') as outfile:
    json.dump(dic_list, outfile)