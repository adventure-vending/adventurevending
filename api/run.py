import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import json
from threading import Thread
import os
from logger.logger import Logger
from tinydb import TinyDB, Query
import uuid

tmpfilepath = os.path.join(os.path.dirname(__file__), 'avdatatmp')

av_data = {}
db = TinyDB('/home/pi/vending-core/api/adventuredatabase.json')

logger = Logger()
last_data = {}


class VendingRequestHandler(SimpleHTTPRequestHandler):


    def _set_headers(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200')
        self.send_header('Access-Control-Allow-Headers', 'Content-type')
        # tell ember it can delete, put, and post
        self.send_header('Access-Control-Allow-Methods', 'OPTIONS,GET,DELETE,POST,PUT')

    def _json_loads_byteified(self, json_text):
        return self._byteify(
            json.loads(json_text, object_hook=self._byteify),
            ignore_dicts=True
        )

    def _update_adventure(self, newadventure):
        def transform(element):
            element['title'] = newadventure['title']
            element['desc'] = newadventure['desc']
            element['enabled'] = newadventure['enabled']
            return element

    def _onchange(self):
        empty = "method"
        #try:
        #    os.remove(tmpfilepath)
        #except OSError:
        #    pass
        #f = open(tmpfilepath, 'w')
        #f.write(json.dumps(av_data, separators=(',', ':')))
        #f.close()

    def _byteify(self, data, ignore_dicts=False):
        # if this is a unicode string, return its string representation
        if isinstance(data, unicode):
            return data.encode('utf-8')
        # if this is a list of values, return list of byteified values
        if isinstance(data, list):
            return [self._byteify(item, ignore_dicts=True) for item in data]
        # if this is a dictionary, return dictionary of byteified keys and values
        # but only if we haven't already byteified it
        if isinstance(data, dict) and not ignore_dicts:
            return {
                self._byteify(key, ignore_dicts=True): self._byteify(value, ignore_dicts=True)
                for key, value in data.iteritems()
            }
        # if it's anything else, return it in its original form
        return data

    def do_GET(self):
        self._set_headers()
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        Adventure = Query()
        if self.path == '/api/adventures':
            logger.log("  returning adventures")
            adventures = db.search((Adventure.event_source == "google_sheet") & ~( Adventure.desc == ""))
            adventures_data = json.dumps(adventures)
            #adventures_data = json.dumps(av_data.values()[0:10])
            logger.log(adventures_data)
            self.wfile.write('{"adventures":' + adventures_data + '}')
        elif self.path.startswith('/api/adventures?'):
            page_to_get = int(self.path[21:])
            logger.log("  returning adventures with paging %s" % page_to_get)
            start_index = 10 * page_to_get
            end_index = start_index + 10
            #paged_adventures_data = json.dumps(av_data.values()[start_index:end_index])
            logger.log(paged_adventures_data)
            self.wfile.write('{"adventures":' + paged_adventures_data + '}')
        elif self.path.startswith('/api/adventures/'):
            adventure_to_get = None
            id_to_get = self.path[16:]
            logger.log("  returning adventure with id: %s" % id_to_get)

            try:
                adventure_to_get = db.search(Adventure.id == id_to_get)[0]
            except IndexError:
                pass
            #adventure_to_get = av_data[id_to_get]

            if adventure_to_get != None:
                logger.log("  found adventure and returning")
                self.wfile.write(json.dumps({"adventures":[adventure_to_get]}, separators=(',', ':')))
            else:
                logger.log("  no adventure found by id: %s" % id_to_get)

    def do_POST(self):
        self._set_headers()
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        data_string = self.rfile.read(int(self.headers['Content-Length']))
        logger.log("%s" % data_string)
        post_data = self._json_loads_byteified(data_string)
        last_data = post_data
        
        if post_data.has_key('adventure'):
            #av_data[post_data['adventure']['id']] = post_data['adventure']
            adventure = post_data['adventure']
            adventure["event_source"] = "google_sheet"
            adventure["id"] = str(uuid.uuid4())
            db.insert(adventure)

        self.wfile.write('{}')
        self._onchange()

    def do_PUT(self):
        self._set_headers()
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        data_string = self.rfile.read(int(self.headers['Content-Length']))
        put_data = self._json_loads_byteified(data_string)
        Adventure = Query()

        if self.path.startswith('/api/adventures/'):
            id_to_update = self.path[16:]
            try:
                idnumber = int(id_to_update)
                id_to_update = idnumber
            except ValueError:
                id_to_updated = id_to_update
                #keep it as a string...
            adventure = db.search(Adventure.id == id_to_update)[0]
            new_adventure = put_data['adventure']
            db.remove(Adventure.id == id_to_update)
            adventure['title'] = new_adventure['title']
            adventure['desc'] = new_adventure['desc']
            adventure['enabled'] = new_adventure['enabled']
            adventure['type'] = new_adventure['type']
            if not "event_type" in adventure:
                adventure['event_type'] = {}
            adventure['event_type']['label'] = new_adventure['type']
            adventure['loc'] = new_adventure['loc']
            
            db.insert(adventure)
            #adventure = db.search(Adventure.id == id_to_update)[0]
            #db.update(self._update_adventure(put_data['adventure']), Adventure.id == id_to_update)

            #for adventureid in av_data:
            #    adventure = av_data[adventureid]
            #    if adventure['id'] == id_to_update:
            #        self._update_adventure(adventure, put_data['adventure'])

        self.wfile.write('{}')
        self._onchange()

    def do_OPTIONS(self):
        self._set_headers()
        # Send empty JSON object to appease ember
        self.send_header("Content-Length", 0)
        self.end_headers()

    def do_DELETE(self):
        self._set_headers()
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # get id
        params = self.path.split('/')
        last_data = params
        record_id = params[3]
        Adventure = Query()
        db.remove(Adventure.id == record_id)

        #if params[2] == 'adventures':
            #for adventureid in av_data:
                #adventure = av_data[adventureid]
                #if adventure["id"] == record_id:
                    #av_data.remove(adventure_record)

        self.wfile.write('{}')
        self._onchange()


try:
    with open(tmpfilepath) as data_file:
        av_data = json.load(data_file)
except IOError:
    pass

if len(db) == 0:
    for adventureid in av_data:
        adventure = av_data[adventureid]
        db.insert(adventure)

del av_data

HandlerClass = VendingRequestHandler
ServerClass = BaseHTTPServer.HTTPServer
Protocol = "HTTP/1.0"

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8080
server_address = ('127.0.0.1', port)

HandlerClass.protocol_version = Protocol

class ServerController(object):
    httpd = None
    thread = None

    def start(self):
        self.httpd = ServerClass(server_address, HandlerClass)
        sa = self.httpd.socket.getsockname()
        # print"Serving HTTP on", sa[0], "port", sa[1], "..."
        logger.log("Serving HTTP on %s port %s" % (sa[0], sa[1]))
        self.thread = Thread(target=self.httpd.serve_forever)
        self.thread.start()

    def stop(self):
        logger.log("Stopping Server")
        self.httpd.server_close()
        logger.log("Server stopped, terminating thread")
        self.thread.join()
        logger.log("Thread terminated")
