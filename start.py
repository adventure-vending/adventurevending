from vendingmachine.src.testing import VendingMachine
from tinydb import Query

machine = VendingMachine()
machine.start()

#To make manual querying easier...
db = machine.api.db
Adventure = Query()

print "Machine started, enter 'machine.stop()' before exiting"
