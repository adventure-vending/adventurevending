from kinet import *
import csv, json
# see https://github.com/vishnubob/kinet

pds = PowerSupply("192.168.1.120")
#TODO, read from config file that includes fixures and starting addresses,
#TODO, create simple UI for setting number of fixtures and addresses


with open('light_addresses.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        pds.append(FixtureRGB(int(row['light_address'])))


#pds.append(FixtureRGB(25))
#pds.append(FixtureRGB(64))
#pds.append(FixtureRGB(70))
#pds.append(FixtureRGB(10))

#pds[0].rgb = (255, 255, 255)
#pds[1].rgb = (255, 255, 255)
#pds[2].rgb = (255, 255, 255)
#pds[3].rgb = (255, 255, 255)
pds.go()



