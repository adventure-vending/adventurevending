from kinet import *
import csv, json
from time import sleep
import random
# see https://github.com/vishnubob/kinet

pds = PowerSupply("192.168.1.120")
#TODO, read from config file that includes fixures and starting addresses,
#TODO, create simple UI for setting number of fixtures and addresses


# HOW HSV Works

# the Hue is 0-359 degrees,
# 000/360 = 0.00000 is red
# 030/360 = 0.08334 is orange
# 060/360 = 0.16667 is yellow
# 120/360 = 0.33334 is green
# 240/360 = 0.66667 is blue
# 280/360 = 0.77778 is purple
# 300/360 = 0.83334 is pink

# for bright colors Always set Saturation = 1 and, Vibrance = 1
# for all white h=0, s=0, v=1

#This will import all the light addresses,
#there is a bug, each address should be -1 than whats written on the light
with open('light_addresses.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        pds.append(FixtureRGB(int(row['light_address'])))



#HSV Colors
color = 0.83334
red = 0
orange = 0.08334
yellow = 0.16667
green = 0.33334
blue = 0.66667
purple = 0.77778
pink =0.83334

def allBlack():

  #Column 1 Top
  pds[0].hsv = (0, 0, 0)
  pds[1].hsv = (0, 0, 0)
  pds[2].hsv = (0, 0, 0)
  pds[3].hsv = (0, 0, 0)
  # Column 1 Bottom

  #Column 2 Top
  pds[07].hsv = (0, 0, 0)
  pds[06].hsv = (0, 0, 0)
  pds[5].hsv = (0, 0, 0)
  pds[4].hsv = (0, 0, 0)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (0, 0, 0)
  pds[9].hsv = (0, 0, 0)
  pds[10].hsv = (0, 0, 0)
  pds[11].hsv = (0, 0, 0)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (0, 0, 0)
  pds[14].hsv = (0, 0, 0)
  pds[13].hsv = (0, 0, 0)
  pds[12].hsv = (0, 0, 0)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (0, 0, 0)
  pds[17].hsv = (0, 0, 0)
  pds[18].hsv = (0, 0, 0)
  pds[19].hsv = (0, 0, 0)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (0, 0, 0)
  pds[22].hsv = (0, 0, 0)
  pds[21].hsv = (0, 0, 0)
  pds[20].hsv = (0, 0, 0)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (0, 0, 0)
  pds[25].hsv = (0, 0, 0)
  pds[26].hsv = (0, 0, 0)
  pds[27].hsv = (0, 0, 0)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (0, 0, 0)
  pds[29].hsv = (0, 0, 0)
  pds[30].hsv = (0, 0, 0)
  pds[31].hsv = (0, 0, 0)
  pds[32].hsv = (0, 0, 0)
  pds[33].hsv = (0, 0, 0)
  pds[34].hsv = (0, 0, 0)
  pds[35].hsv = (0, 0, 0)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()


def allWhite():

  #Column 1 Top
  pds[0].hsv = (0, 0, 1)
  pds[1].hsv = (0, 0, 1)
  pds[2].hsv = (0, 0, 1)
  pds[3].hsv = (0, 0, 1)
  # Column 1 Bottom

  #Column 2 Top
  pds[07].hsv = (0, 0, 1)
  pds[06].hsv = (0, 0, 1)
  pds[5].hsv = (0, 0, 1)
  pds[4].hsv = (0, 0, 1)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (0, 0, 1)
  pds[9].hsv = (0, 0, 1)
  pds[10].hsv = (0, 0, 1)
  pds[11].hsv = (0, 0, 1)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (0, 0, 1)
  pds[14].hsv = (0, 0, 1)
  pds[13].hsv = (0, 0, 1)
  pds[12].hsv = (0, 0, 1)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (0, 0, 1)
  pds[17].hsv = (0, 0, 1)
  pds[18].hsv = (0, 0, 1)
  pds[19].hsv = (0, 0, 1)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (0, 0, 1)
  pds[22].hsv = (0, 0, 1)
  pds[21].hsv = (0, 0, 1)
  pds[20].hsv = (0, 0, 1)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (0, 0, 1)
  pds[25].hsv = (0, 0, 1)
  pds[26].hsv = (0, 0, 1)
  pds[27].hsv = (0, 0, 1)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (0, 0, 1)
  pds[29].hsv = (0, 0, 1)
  pds[30].hsv = (0, 0, 1)
  pds[31].hsv = (0, 0, 1)
  pds[32].hsv = (0, 0, 1)
  pds[33].hsv = (0, 0, 1)
  pds[34].hsv = (0, 0, 1)
  pds[35].hsv = (0, 0, 1)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()



def allColor(color):

  #Column 1 Top
  pds[0].hsv = (color, 1, 1)
  pds[1].hsv = (color, 1, 1)
  pds[2].hsv = (color, 1, 1)
  pds[3].hsv = (color, 1, 1)
  # Column 1 Bottom

  #Column 2 Top
  pds[07].hsv = (color, 1, 1)
  pds[06].hsv = (color, 1, 1)
  pds[5].hsv = (color, 1, 1)
  pds[4].hsv = (color, 1, 1)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (color, 1, 1)
  pds[9].hsv = (color, 1, 1)
  pds[10].hsv = (color, 1, 1)
  pds[11].hsv = (color, 1, 1)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (color, 1, 1)
  pds[14].hsv = (color, 1, 1)
  pds[13].hsv = (color, 1, 1)
  pds[12].hsv = (color, 1, 1)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (color, 1, 1)
  pds[17].hsv = (color, 1, 1)
  pds[18].hsv = (color, 1, 1)
  pds[19].hsv = (color, 1, 1)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (color, 1, 1)
  pds[22].hsv = (color, 1, 1)
  pds[21].hsv = (color, 1, 1)
  pds[20].hsv = (color, 1, 1)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (color, 1, 1)
  pds[25].hsv = (color, 1, 1)
  pds[26].hsv = (color, 1, 1)
  pds[27].hsv = (color, 1, 1)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (color, 1, 1)
  pds[29].hsv = (color, 1, 1)
  pds[30].hsv = (color, 1, 1)
  pds[31].hsv = (color, 1, 1)
  pds[32].hsv = (color, 1, 1)
  pds[33].hsv = (color, 1, 1)
  pds[34].hsv = (color, 1, 1)
  pds[35].hsv = (color, 1, 1)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()

def rowColor(color1, color2, color3, color4):

  #Column 1 Top
  pds[0].hsv = (color1, 1, 1)
  pds[1].hsv = (color2, 1, 1)
  pds[2].hsv = (color3, 1, 1)
  pds[3].hsv = (color4, 1, 1)
  # Column 1 Bottom

  #Column 2 Top
  pds[7].hsv = (color1, 1, 1)
  pds[6].hsv = (color2, 1, 1)
  pds[5].hsv = (color3, 1, 1)
  pds[4].hsv = (color4, 1, 1)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (color1, 1, 1)
  pds[9].hsv = (color2, 1, 1)
  pds[10].hsv = (color3, 1, 1)
  pds[11].hsv = (color4, 1, 1)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (color1, 1, 1)
  pds[14].hsv = (color2, 1, 1)
  pds[13].hsv = (color3, 1, 1)
  pds[12].hsv = (color4, 1, 1)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (color1, 1, 1)
  pds[17].hsv = (color2, 1, 1)
  pds[18].hsv = (color3, 1, 1)
  pds[19].hsv = (color4, 1, 1)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (color1, 1, 1)
  pds[22].hsv = (color2, 1, 1)
  pds[21].hsv = (color3, 1, 1)
  pds[20].hsv = (color4, 1, 1)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (color1, 1, 1)
  pds[25].hsv = (color2, 1, 1)
  pds[26].hsv = (color3, 1, 1)
  pds[27].hsv = (color4, 1, 1)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (color1, 1, 1)
  pds[29].hsv = (color1, 1, 1)
  pds[30].hsv = (color1, 1, 1)
  pds[31].hsv = (color1, 1, 1)
  pds[32].hsv = (color1, 1, 1)
  pds[33].hsv = (color1, 1, 1)
  pds[34].hsv = (color1, 1, 1)
  pds[35].hsv = (color1, 1, 1)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()


def columnColor(color1, color2, color3, color4, color5, color6, color7):

  #Column 1 Top
  pds[0].hsv = (color1, 1, 1)
  pds[1].hsv = (color1, 1, 1)
  pds[2].hsv = (color1, 1, 1)
  pds[3].hsv = (color1, 1, 1)
  # Column 1 Bottom

  #Column 2 Top
  pds[7].hsv = (color2, 1, 1)
  pds[6].hsv = (color2, 1, 1)
  pds[5].hsv = (color2, 1, 1)
  pds[4].hsv = (color2, 1, 1)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (color3, 1, 1)
  pds[9].hsv = (color3, 1, 1)
  pds[10].hsv = (color3, 1, 1)
  pds[11].hsv = (color3, 1, 1)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (color4, 1, 1)
  pds[14].hsv = (color4, 1, 1)
  pds[13].hsv = (color4, 1, 1)
  pds[12].hsv = (color4, 1, 1)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (color5, 1, 1)
  pds[17].hsv = (color5, 1, 1)
  pds[18].hsv = (color5, 1, 1)
  pds[19].hsv = (color5, 1, 1)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (color6, 1, 1)
  pds[22].hsv = (color6, 1, 1)
  pds[21].hsv = (color6, 1, 1)
  pds[20].hsv = (color6, 1, 1)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (color7, 1, 1)
  pds[25].hsv = (color7, 1, 1)
  pds[26].hsv = (color7, 1, 1)
  pds[27].hsv = (color7, 1, 1)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (color1, 1, 1)
  pds[29].hsv = (color2, 1, 1)
  pds[30].hsv = (color3, 1, 1)
  pds[31].hsv = (color4, 1, 1)
  pds[32].hsv = (color5, 1, 1)
  pds[33].hsv = (color6, 1, 1)
  pds[34].hsv = (color7, 1, 1)
  pds[35].hsv = (0, 0, 1)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()


def checkerBox2(color1, color2):

  #Column 1 Top
  pds[0].hsv = (color1, 1, 1)
  pds[1].hsv = (color2, 1, 1)
  pds[2].hsv = (color1, 1, 1)
  pds[3].hsv = (color2, 1, 1)
  # Column 1 Bottom

  #Column 2 Top
  pds[7].hsv = (color2, 1, 1)
  pds[6].hsv = (color1, 1, 1)
  pds[5].hsv = (color2, 1, 1)
  pds[4].hsv = (color1, 1, 1)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (color1, 1, 1)
  pds[9].hsv = (color2, 1, 1)
  pds[10].hsv = (color1, 1, 1)
  pds[11].hsv = (color2, 1, 1)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (color2, 1, 1)
  pds[14].hsv = (color1, 1, 1)
  pds[13].hsv = (color2, 1, 1)
  pds[12].hsv = (color1, 1, 1)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (color1, 1, 1)
  pds[17].hsv = (color2, 1, 1)
  pds[18].hsv = (color1, 1, 1)
  pds[19].hsv = (color2, 1, 1)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (color2, 1, 1)
  pds[22].hsv = (color1, 1, 1)
  pds[21].hsv = (color2, 1, 1)
  pds[20].hsv = (color1, 1, 1)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (color1, 1, 1)
  pds[25].hsv = (color2, 1, 1)
  pds[26].hsv = (color1, 1, 1)
  pds[27].hsv = (color2, 1, 1)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (color2, 1, 1)
  pds[29].hsv = (color1, 1, 1)
  pds[30].hsv = (color2, 1, 1)
  pds[31].hsv = (color1, 1, 1)
  pds[32].hsv = (color2, 1, 1)
  pds[33].hsv = (color1, 1, 1)
  pds[34].hsv = (color2, 1, 1)
  pds[35].hsv = (color1, 1, 1)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()

def checkerBox4(color1, color2, color3, color4):

  #Column 1 Top
  pds[0].hsv = (color1, 1, 1)
  pds[1].hsv = (color2, 1, 1)
  pds[2].hsv = (color3, 1, 1)
  pds[3].hsv = (color4, 1, 1)
  # Column 1 Bottom

  #Column 2 Top
  pds[7].hsv = (color4, 1, 1)
  pds[6].hsv = (color1, 1, 1)
  pds[5].hsv = (color2, 1, 1)
  pds[4].hsv = (color3, 1, 1)
  #Column 2 Bottom

  #Column 3 Top
  pds[8].hsv = (color3, 1, 1)
  pds[9].hsv = (color4, 1, 1)
  pds[10].hsv = (color1, 1, 1)
  pds[11].hsv = (color2, 1, 1)
  #Column 3 Bottom

  #Column 4 Top
  pds[15].hsv = (color2, 1, 1)
  pds[14].hsv = (color3, 1, 1)
  pds[13].hsv = (color4, 1, 1)
  pds[12].hsv = (color1, 1, 1)
  # Column 4 Bottom

  #Column 5 Top
  pds[16].hsv = (color1, 1, 1)
  pds[17].hsv = (color2, 1, 1)
  pds[18].hsv = (color3, 1, 1)
  pds[19].hsv = (color4, 1, 1)
  #Column 5 Bottom

  #Column 6 Top
  pds[23].hsv = (color4, 1, 1)
  pds[22].hsv = (color1, 1, 1)
  pds[21].hsv = (color2, 1, 1)
  pds[20].hsv = (color3, 1, 1)
  #Column 6 Bottom

  #Column 7 Top
  pds[24].hsv = (color3, 1, 1)
  pds[25].hsv = (color4, 1, 1)
  pds[26].hsv = (color1, 1, 1)
  pds[27].hsv = (color2, 1, 1)
  # Column 7 Bottom

  #Header Column Starting with Column 1
  pds[28].hsv = (color4, 1, 1)
  pds[29].hsv = (color3, 1, 1)
  pds[30].hsv = (color2, 1, 1)
  pds[31].hsv = (color1, 1, 1)
  pds[32].hsv = (color4, 1, 1)
  pds[33].hsv = (color3, 1, 1)
  pds[34].hsv = (color2, 1, 1)
  pds[35].hsv = (color1, 1, 1)
  #Header Ending with Control Row

  #Send Color to Lights
  pds.go()


def rainbowBasicBitch(pause, steps):
        for step in range(steps):
            ratio = 0
            for idx, fixture in enumerate(pds):
                ratio = step / float(steps)
                fixture.hsv = (ratio, 1.0, 1.0)
            pds.go()
            time.sleep(pause)

def rainbowFade(pause, steps):
        pause=.1
        steps=1000
        div = steps / len(pds)
        for step in range(steps):
            ratio = 0
            for idx, fixture in enumerate(pds):
                ratio += (step + idx * div) % steps / float(steps)
                fixture.hsv = (ratio, 1.0, 1.0)
            pds.go()
            time.sleep(pause)

def rowColorShuffle(pause, color1, color2, color3, color4):
  rowColor(color1, color2, color3, color4)
  sleep(pause)
  rowColor(color4, color1, color2, color3)
  sleep(pause)
  rowColor(color3, color4, color1, color2)
  sleep(pause)
  rowColor(color2, color3, color4, color1)
  sleep(pause)

def columnColorShuffle(pause, color1, color2, color3, color4, color5, color6, color7):
  columnColor(color1, color2, color3, color4, color5, color6, color7)
  sleep(pause)
  columnColor(color7, color1, color2, color3, color4, color5, color6)
  sleep(pause)
  columnColor(color6, color7, color1, color2, color3, color4, color5)
  sleep(pause)
  columnColor(color5, color6, color7, color1, color2, color3, color4)
  sleep(pause)
  columnColor(color4, color5, color6, color7, color1, color2, color3)
  sleep(pause)
  columnColor(color3, color4, color5, color6, color7, color1, color2)
  sleep(pause)
  columnColor(color2, color3, color4, color5, color6, color7, color1)
  sleep(pause)

def checkerBox2shuffle(pause, color1, color2):
  checkerBox2(color1, color2)
  sleep(pause)
  checkerBox2(color2, color1)
  sleep(pause)
  checkerBox2(color1, color2)
  sleep(pause)
  checkerBox2(color2, color1)
  sleep(pause)

def checkerBox4shuffle(pause, color1, color2, color3, color4):
  checkerBox4(color1, color2, color3, color4)
  sleep(pause)
  checkerBox4(color4, color1, color2, color3)
  sleep(pause)
  checkerBox4(color3, color4, color1, color2)
  sleep(pause)
  checkerBox4(color2, color3, color4, color1)
  sleep(pause)

def runRandom():
  random.choice([checkerBox2shuffle(10, purple, orange),
                checkerBox4shuffle(10, purple, orange, green, blue),
                rainbowBasicBitch(0.1, 100),
                rainbowBasic(0.1, 100),
                rainboxFade(0.1, 100),
                columnColorShuffle(10, red, orange, yellow, green, blue, purple, pink),
                rowColorShuffle(10, orange, purple, yellow, green)
                ])


#set how long of a random lightshow you want, default is 15mins
t_end = time.time() + 60 * 15
while time.time() < t_end:
    runRandom()

    #List of all routines
    #allBlack()
    #allWhite()
    #allColor(pink)
    #rainbowBasicBitch(0.1, 100)
    #rainbowBasic(0.1, 1000)
    #rainboxFade(0.1, 1000)
    #rowColor(pink, orange, yellow, purple)
    #columnColor(red, orange, yellow, green, blue, purple, pink)
    #checkerBox2(orange, purple)
    #checkerBox4(orange, pink, yellow , purple)
    #checkerBox2shuffle(10, purple, orange)
    #checkerBox4shuffle(1, purple, orange, green, blue)
    #columnColorShuffle(10, red, orange, yellow, green, blue, purple, pink),
    #rowColorShuffle(10, orange, purple, yellow, green)
