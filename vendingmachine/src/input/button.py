import RPi.GPIO as GPIO
from vendingmachine.src.addeventdetection import *
from logger.logger import Logger

##-----------------------------------------------------------------------
#   Button
#
#   Controls one button
##-----------------------------------------------------------------------
class Button(object):
    value = 0
    pin = None
    logger = None

    def __init__(self, pin, callback):
        self.logger = Logger()
        self.pin = pin
        if callback is None:
            add_event_detection(self.pin, self.__default_callback, True)
        else:
            add_event_detection(self.pin, callback, True)
        self.__handle_change

    def __default_callback(self):
        self.logger.log("Button: at pin %s callback with default callback")

    def get_value(self):
        self.__handle_change(1)
        return self.value
