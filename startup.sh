# This file should be moved to the Pi's home directory

sleep 5
# sudo pkill -9 -f python
cd /home/pi/vending-core/frontend/dist/ ; python -m SimpleHTTPServer 4200 &
cd /home/pi
sudo python -i vending-core/start.py
