import cups
import os
from vendingmachine.src.adventure import Adventure
import threading
from logger.logger import Logger

##-----------------------------------------------------------------------
#   Printer
#
#   Printer class for printing out adventures
#   printer.printAdventure(text)
##-----------------------------------------------------------------------
class Printer(object):
    conn = cups.Connection()
    printers = conn.getPrinters()
    printer_name = printers.keys()[0]
    tmpfilePath = "/home/pi/tmpadventure.pdf"
    ready_to_print = True

    logger = None

    def __init__(self):
        self.logger = Logger()

    def __print(self):
        self.logger.log("Printer: printing using %s" % self.printer_name)
        self.conn.cancelAllJobs(self.printer_name)
        self.conn.printFile(self.printer_name, self.tmpfilePath, "adventure", {})

    def __create_file(self, adventure):
        self.logger.log("Printer: creating pdf")
        try:
            os.remove(self.tmpfilePath)
            self.logger.log("  Success")
        except OSError:
            self.logger.log("  Failure")
            pass
        title = adventure["title"].replace("\\n", "\n")
        desc = adventure["desc"].replace("\\n", "\n")

        pdf = Adventure()
        pdf.set_margins(left=18, top=0, right=0)
        pdf.set_auto_page_break(False)

        pdf.add_page(orientation='P', format=(90,115))
        pdf.set_font('Arial', 'B', 16)
        pdf.multi_cell(0, 6, title, align='C')
        pdf.ln()
        pdf.set_font('Arial', '', 12)
        pdf.multi_cell(0, 6, desc, align='C')
        pdf.output(self.tmpfilePath, 'F')

    def __ready_to_print(self):
        self.logger.log("Printer: setting ready to print from %s to True" % self.ready_to_print)
        self.ready_to_print = True

    def printAdventure(self, adventure):
        self.logger.log("Printer: trying to print adventure with id %s and ready status %s" % (adventure['id'], self.ready_to_print))
        if self.ready_to_print:
            self.__create_file(adventure)
            self.__print()
            self.ready_to_print = False
            t = threading.Timer(1.0, self.__ready_to_print)
            t.start()