import multiprocessing
from time import sleep
import sys
import signal
import constants
import csv, json
from kinet import *

# see https://github.com/vishnubob/kinet

#TODO, fix but in kinet library that chooses wifi interface when avalible

class LightSystem(multiprocessing.Process):
    pds = None
    box = None
    def __init__(self, q):
        super(LightSystem, self).__init__()
        self.q = q
        self.setup_handlers()
        #ethernet attached power supply.
        #The PowerSupply class inherits from list
        self.pds = PowerSupply("192.168.1.120")
        self.box = 0
        #TODO, create simple UI for setting number of fixtures and addresses

        # address light fixtures using lowest dmx address
        # example if using RGB addresses 3,4,5 choose 5
        with open('light_addresses.csv') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                self.pds.append(FixtureRGB(int(row['light_address'])))


    def setup_handlers(self):
        def signal_handler(action, _):
            box = self.q.get()
            if action == constants.OPEN_BOX:
                self.open_box(box)
            elif action == constants.SELECT_BOX:
                self.select_box(box)
            self.idle()
        signal.signal(constants.OPEN_BOX, signal_handler)
        signal.signal(constants.SELECT_BOX, signal_handler)

    def run(self):
        self.idle()

    def idle(self):
        pause=.1
        steps=1000
        div = steps / len(self.pds)
        print "starting idle"
        for step in range(steps):
            ratio = 0
            for idx, fixture in enumerate(self.pds):
                ratio += (step + idx * div) % steps / float(steps)
                fixture.hsv = (ratio, 1.0, 1.0)
            print self.pds
            self.pds.go()
            time.sleep(pause)
            while True:
                print "in idle mode"
                sleep(.3)

    def open_box(self, box):
        pause=.1
        steps= 1000
        div = steps / len(self.pds)
        box = box -1
        print "box opened {}".format(box)
        for step in range(steps):
            ratio = 0
            for idx, fixture in enumerate(self.pds):
                if idx == box:
                  #if this is the selected prize then turn white
                  #TODO make light pulse
                  self.pds[idx].rgb = (255, 255, 255)
                else:
                  #if not the prize box do a slow rainbow patern
                  ratio += (step + idx * div) % steps / float(steps)
                  fixture.hsv = (ratio, 1.0, 1.0)
            print self.pds
            self.pds.go()
            time.sleep(pause)
        sys.stdout.flush()

    def select_box(self, box):
        pause=.1
        steps= 1000
        div = steps / len(self.pds)
        box = box -1
        print "box selected {}".format(box)
        for step in range(steps):
            ratio = 0
            for idx, fixture in enumerate(self.pds):
                if idx == box:
                  #if this is the selected prize then turn white
                  #TODO make light pulse
                  self.pds[idx].rgb = (255, 255, 255)
                else:
                  #if not the prize box do a slow rainbow patern
                  ratio += (step + idx * div) % steps / float(steps)
                  fixture.hsv = (ratio, 1.0, 1.0)
            print self.pds
            self.pds.go()
            time.sleep(pause)
        sys.stdout.flush()
