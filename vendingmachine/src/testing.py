import RPi.GPIO as GPIO
import time
import datetime
import threading
import imp
import random
import textwrap
# import ..lights
from vendingmachine.src.printer import Printer
from vendingmachine.src.coinmachine import CoinMachine
from vendingmachine.src.lightingcontroller import LightingController
from vendingmachine.src.binaryboxcontroller import BinaryBoxController
from vendingmachine.src.binaryknob import BinaryKnob
from vendingmachine.src.addeventdetection import *
from vendingmachine.src.input.button import Button
from logger.logger import Logger
import api.run
from tinydb import Query

##-----------------------------------------------------------------------
#   Vending Machine
#
#   Main class, use this to control the vending machine.
#   Toggle the demo_mode flag to use for the burn
##-----------------------------------------------------------------------
class VendingMachine(object):
    adventure_button_pin = 18
    gift_button_pin = 16
    adventure_type_pin = 22
    box_select_pins_a = [24,26,32]
    box_select_pins_b = [36,38,40]
    out_of_service_pin = 23
    price_pins = [33,35,37]
    #Change this to False to use in the real vending machine
    #Leave as True to use the demo box with three buttons
    demo_mode = False
    random_box_mode = False

    print_adventures = True

    box_controller = None
    printer = None
    lighting = None
    server = None
    adventure_knob_a = None
    adventure_knob_b = None
    coin_machine = None
    logger = None
    api = None

    adventure_count = 0
    gift_count = 0
    adv_types = [["bmapi", 40], ["fun", 10], ["coin", 60]]

    def __init__(self):
        GPIO.cleanup()
        GPIO.setmode(GPIO.BOARD)
        self.logger = Logger()
        self.__init_pins()
        self.box_controller = BinaryBoxController()
        self.printer = Printer()
        self.lighting = LightingController()
        self.adventure_knob_a = BinaryKnob(self.box_select_pins_a)
        self.adventure_knob_b = BinaryKnob(self.box_select_pins_b)
        self.coin_machine = CoinMachine(self.lighting, self.demo_mode)
        self.server = api.run.ServerController()
        self.api = api.run

    # Private -------------------------------------------

    def __init_pins(self):
        self.logger.log("Machine: initializing pins")
        GPIO.setup(self.out_of_service_pin, GPIO.OUT)
        GPIO.setup(self.price_pins, GPIO.OUT)
        GPIO.setup(self.adventure_type_pin, GPIO.IN)
        GPIO.output(self.out_of_service_pin, True)
        GPIO.output(self.price_pins[0], True)
        GPIO.output(self.price_pins[1], True)
        GPIO.output(self.price_pins[2], True)

    def __adventure_button_cb(self, pin):
        self.logger.log("Machine: adventure button pressed with waiting status: %s" % self.waiting_to_give_adventure)
        if self.waiting_to_give_adventure == True:
            self.logger.log("  Dispensing Adventure")
            self.dispense_adventure()
            self.waiting_to_give_adventure = False
            t = threading.Timer(1.0, self.__allow_dispensing_adventures)
            t.start()

    def __allow_dispensing_adventures(self):
        self.waiting_to_give_adventure = True

    def __start_waiting_for_user(self):
        self.logger.log("Machine: waiting for user at pin %s" % self.adventure_button_pin)
        add_event_detection(self.adventure_button_pin, callback=self.__adventure_button_cb)
        add_event_detection(self.gift_button_pin, callback=self.__gift_button_pressed)

        self.__allow_dispensing_adventures()

    def __reset_box(self):
        self.box_controller.close_boxes()

    def __start_waiting_for_boxes(self):
        self.logger.log("Machine: waiting for boxes with demo mode: %s" % self.demo_mode)
        if self.demo_mode == True:
            add_event_detection(self.box_select_pins_a[0], callback=self.__box_a_pressed)
            add_event_detection(self.box_select_pins_a[1], callback=self.__box_b_pressed)
            add_event_detection(self.box_select_pins_a[2], callback=self.__box_c_pressed)


    def __box_a_pressed(self, channel):
        self.logger.log("Machine: box button a pressed")
        self.open_prize_box(1)
        self.lighting.box_selected(1)

    def __box_b_pressed(self, channel):
        self.logger.log("Machine: box button b pressed")
        self.open_prize_box(2)
        self.lighting.box_selected(2)

    def __box_c_pressed(self, channel):
        self.logger.log("Machine: box button b pressed")
        self.open_prize_box(3)
        self.lighting.box_selected(3)

    def __gift_button_pressed(self, pin):
        self.logger.log("Machine: gift Button Pressed")
        box_number = self.adventure_knob_a.get_value()
        wall_number = self.adventure_knob_b.get_value()
        if box_number > 4 or self.random_box_mode == True:
            #random box number if nothing is selected
            box_number = random.randint(1,4)
        if wall_number > 7 or self.random_box_mode == True:
            #random wall number if nothing is selected
            wall_number = random.randint(1,4)
        latch_number = ((wall_number - 1) * 4) + box_number
        self.logger.log("  selected box %s" % latch_number)
        self.open_prize_box(latch_number)

    def __weighted_choice(self, choices):
            total = sum(w for c, w in choices)
            r = random.uniform(0, total)
            upto = 0
            for c,w in choices:
                if upto + w >= r:
                    return c
                upto += w
            assert False, "Shouldn't get here"  

    # Public --------------------------------------------

    def open_prize_box(self, box_number):
        self.logger.log("Machine: selected box %s with credits: %s" % (box_number, self.coin_machine.current_value))
        #For now, all boxes cost one. TODO: Hook this up with prices
        box_cost = 1
        if (self.coin_machine.current_value >= box_cost):
        #if (True):
            self.logger.log("  Signalling to open box %s" % box_number)
            self.box_controller.set_box(box_number)
            # lights.LightSystemManager.open_box()
            self.box_controller.open_current_box()
            self.lighting.dispense_prize(box_number)
            self.gift_count = self.gift_count + 1
            self.coin_machine.subtract_coins(box_cost)
            if self.demo_mode == True:
                self.coin_machine.clear_coins()
            t = threading.Timer(5.0, self.__reset_box)
            t.start()

    def get_adventure(self):
        #adventures = api.run.av_data
        #enabled_adventures = []            
        adv_type = self.__weighted_choice(self.adv_types)
        time_format = '%Y-%m-%dT%X+00:00'
        #now = datetime.datetime.now()
        now = datetime.datetime.strptime("2016-09-02T18:00:00+00:00", time_format)
        Adventure = Query()

        def adventure_query(val, now, adv_type):
            return val and val["label"] and val["label"] == "coin"

        def time_query(val, now):
            match = True
            if not val:
                #If something doesn't have a time, then just show it anyways
                return True
            for event_time in val:
                start_time = datetime.datetime.strptime(event_time["start_time"], time_format)
                start_time_minus_hour = start_time - datetime.timedelta(hours=1)
                end_time = datetime.datetime.strptime(event_time["end_time"], time_format)
                if now < (start_time - datetime.timedelta(hours=1)) or now > (end_time - datetime.timedelta(hours=1)):
                    match = False
            return match

        if adv_type == "coin":
            enabled_adventures = self.api.db.search((Adventure["event_type"]["label"] == "coin") & (Adventure.enabled == True))
        elif adv_type == "fun":
            enabled_adventures = self.api.db.search((Adventure["event_type"]["label"] == "Fun") & ~(Adventure.desc == ""))
        else:
            enabled_adventures = self.api.db.search((Adventure["occurrence_set"].test(time_query, now)) & (Adventure["event_source"] == adv_type))
        
        
        return random.choice(enabled_adventures)

    def dispense_adventure(self):
        self.logger.log("Machine: preparing to dispense adventure with printing set to: %s" % self.print_adventures)
        adventure_type = GPIO.input(self.adventure_type_pin)
        #TODO: Use the adventure type to pick an adventure
        adventure = self.get_adventure()
        self.adventure_count = self.adventure_count + 1
        if self.print_adventures == True:
            self.logger.log("  Printing adventure: %s" % adventure['id'])
            self.printer.printAdventure(adventure)
        self.lighting.dispense_adventure()

    def open_all_boxes(self):
        for i in range(1, 32):
            self.box_controller.set_box(i)
            self.box_controller.open_current_box()
            time.sleep(1)
        self.box_controller.close_all_boxes()
            
    
    def start(self):
        self.logger.log("Machine: starting")
        self.__start_waiting_for_boxes()
        self.__start_waiting_for_user()
        self.server.start()

    def stop(self):
        self.logger.log("Machine: stopping")
        self.server.stop()
