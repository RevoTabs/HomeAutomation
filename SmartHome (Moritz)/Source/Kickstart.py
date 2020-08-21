import os
import subprocess

os.chdir("/home/pi/Desktop/SmartHome/AddOns/MagicMirror")
running = subprocess.call("nohup pm2 start run-mm.sh &", shell = True)
