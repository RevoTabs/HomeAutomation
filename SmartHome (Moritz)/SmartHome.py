from bs4 import BeautifulSoup as bs
import functools
import numpy as np
from tkinter import *
from tkinter.ttk import *
from tkinter.messagebox import *
import os
import sys
import subprocess
import threading
from yeelight import *
import time
import requests
import json
import base64, PIL, urllib
from PIL import Image, ImageTk
import urllib.request

class SmartHome:

         #Declare Variables
         jarvis_status = False
         mirror_status = False
         light_status = False
         stock_status = False
         Moritz_presence = False
         livingroom = ""
         
         #Stock Variables
         Anzahl_Apple = 0.0


         EK_Apple = 0.0


         apple_bilanz = 0.0


         
         #Weather API
         base_url = "http://api.openweathermap.org/data/2.5/weather?"
         api_key = "e5cb46d6c3b64a589f03a2106a09c6f1"
         complete_url = base_url + "appid=" + api_key + "&q=Mettmann&units=metric&lang=de"
                
         def __init__(self, hauptmenue):

                 #Declare Button Images
                 self.photojarvis = PhotoImage(file = "/home/pi/Desktop/SmartHome/Images/JARVISresize.png")
                 self.photosmartmirror = PhotoImage(file = "/home/pi/Desktop/SmartHome/Images/SmartMirrorresize.png")
                 self.photolightoff = PhotoImage(file = "/home/pi/Desktop/SmartHome/Images/SmartLightoffresize.png")
                 self.photolighton = PhotoImage(file = "/home/pi/Desktop/SmartHome/Images/SmartLightonresize.png")
                 self.stock = PhotoImage(file = "/home/pi/Desktop/SmartHome/Images/Aktienresize.png")
                 self.moritz_avatar = PhotoImage(file = "/home/pi/Desktop/SmartHome/Images/Person_schwarz.png")

                 #Hauptmenue GUI
                 self.hauptmenue = hauptmenue
                 self.hauptmenue.title("SmartHome")
                 self.hauptmenue.geometry("1024x600")

                 #Set up Buttons
                 #self.jarvis_button = Button(self.hauptmenue, image=self.photojarvis, command= lambda: self.jarvis_switch())
                 #self.jarvis_button.pack(side=TOP, anchor=W)
                 
                 self.mirror_button = Button(self.hauptmenue, image=self.photosmartmirror, command= lambda: self.mirror_switch())
                 self.mirror_button.place(x=0, y=70, width=310, height=100)
                 
                 self.light_button = Button(self.hauptmenue, image=self.photolightoff, command= lambda: self.light_switch(SmartHome.livingroom))
                 self.light_button.place(x=310, y=70, width=310, height=100)
                
                 self.stock_button = Button(self.hauptmenue, image=self.stock, command= lambda: self.stock_switch())
                 self.stock_button.place(x=620, y=70, width=310, height=100)
                 
                 self.time_label = Label(self.hauptmenue, font="Arial 20 bold")
                 self.time_label.place(x=450, y=0, width=140, height=50)
                 self.tick()
                 
                 #self.moritz_presence = Label(self.hauptmenue)
                 #self.moritz_presence.place(x=0, y=250, width=310, height=100)
                 self.presence_label = Label(self.hauptmenue)
                 self.presence_label.place(x=0, y=300, width=140, height=50)
                 self.fing()
                 self.presence()
                 
                 #self.weather_label = Label(self.hauptmenue)
                 #self.weather_label.pack(side=TOP, anchor=W)
                 #self.temperature_label = Label(self.hauptmenue)
                 #self.temperature_label.pack(side=TOP, anchor=W)
                 #self.weather()
                 
                 #Define Stock Labels
                 self.apple_label = Label(self.hauptmenue, text="Apple", font="Arial 10 bold")
                 self.apple_preis = Label(self.hauptmenue)
                 self.apple_gewinn = Label(self.hauptmenue)
                 self.Kurs("Apple", SmartHome.EK_Apple, SmartHome.Anzahl_Apple, self.apple_preis, self.apple_gewinn)


                 self.bilanz_label = Label(self.hauptmenue, text="Aktienbilanz", font="Arial 10 bold")
                 self.bilanz_preis = Label(self.hauptmenue)
                 self.Bilanz()

                 
                 

         #Define functions
         def Bilanz(self):
             if SmartHome.apple_bilanz != 0:
                 self.bilanz = SmartHome.apple_bilanz
                 self.bilanz_preis.config(text="Ergebnis: " + str(round(self.bilanz, 2)) + "€")
                 self.bilanz_preis.after(740000, self.Bilanz)
 
 
         def Kurs(self, aktie, ek, anzahl, label_preis, label_gewinn):
             if (aktie == "bitcoin-euro-kurs"):
                 req = requests.get("https://www.finanzen.net/devisen/" + aktie)
                 page = req.content
                 soup = bs(page, 'html.parser')
  
                 preis = soup.find("div", {"class": "col-xs-5 col-sm-4 text-sm-right text-nowrap"})
                 preis_str = preis.text
                 preis = preis.text
                 preis_str = preis_str.replace("EUR", "€")
                 preis_str = preis_str.replace("\n","")
                 preis = preis.replace("EUR", "")
                 preis = preis.replace(".", "")
                 preis = preis.replace(",", ".")
                 preis = float(preis)
  
                 kauf = ek * anzahl
                 verkauf = preis * anzahl
                 gewinn_euro = verkauf - kauf
  
                 label_preis.config(text="Preis: " + preis_str)
                 label_gewinn.config(text="Ergebnis: " + str(round(gewinn_euro, 2)) + "€")
                 label_preis.after(720000, self.Kurs, aktie, ek, anzahl, label_preis, label_gewinn)
           
             else:
                 req = requests.get("https://www.finanzen.net/aktien/" + aktie + "-aktie")
                 page = req.content
                 soup = bs(page, 'html.parser')
  
                 preis = soup.find("div", {"class": "col-xs-5 col-sm-4 text-sm-right text-nowrap"})
                 preis_str = preis.text
                 preis_str = preis_str.replace("EUR", "€")
                 preis = preis.contents[0].strip()
                 preis = preis.replace(",", ".")
                 preis = float(preis)
  
                 kauf = ek * anzahl
                 verkauf = preis * anzahl
                 gewinn_euro = verkauf - kauf
  
                 label_preis.config(text="Preis: " + preis_str)
                 label_gewinn.config(text="Ergebnis: " + str(round(gewinn_euro, 2)) + "€")
                 label_preis.after(730000, self.Kurs, aktie, ek, anzahl, label_preis, label_gewinn)
  
                 if aktie == "Apple":
                     SmartHome.apple_bilanz = gewinn_euro;

        
        
        #Define stock switch
         def stock_switch(self):
             if SmartHome.stock_status == False:
                 self.apple_label.place(x=0, y=350, width=180, height=20)
                 self.apple_preis.place(x=0, y=370, width=180, height=20)
                 self.apple_gewinn.place(x=0, y=390, width=180, height=20)
                 
                 self.bilanz_label.place(x=900, y=350, width=180, height=20)
                 self.bilanz_preis.place(x=900, y=370, width=180, height=20)
                 SmartHome.stock_status = True
                 
             else:
                 self.apple_label.place_forget()
                 self.apple_preis.place_forget()
                 self.apple_gewinn.place_forget()
                 
                 self.bilanz_label.place_forget()
                 self.bilanz_preis.place_forget()
                 SmartHome.stock_status = False
        
        #Define weather API
         def weather(self):
             self.response = requests.get(SmartHome.complete_url)
             self.x = self.response.json()
             
             if self.x["cod"] != "404":
                 self.y = self.x["main"]
                 self.current_temperature = self.y["temp"]
                 self.current_pressure = self.y["pressure"]
                 self.current_humidity = self.y["humidity"]
                 self.z = self.x["weather"]
                 self.weather_description = self.z[0]["description"]
                 #self.weather_icon = self.z[0]["icon"]
                 self.weather_label.config(text="Wetter: " + self.weather_description)
                 self.temperature_label.config(text="Temperatur: " + str(self.current_temperature) + "°C")
                 
             self.weather_label.after(30000, self.weather)
          
         def fing(self):
             self.running = subprocess.call("nohup sudo fing -o table,text,/home/pi/Desktop/SmartHome/hosts.txt &", shell = True)
             
         #Define presence
         def presence(self):
             content = open('/home/pi/Desktop/SmartHome/hosts.txt', 'r').read().split('\n')
             for lines in range(0, len(content)):
                 
                 if "UP" in content[lines]:
                     pass
                     if "Moritz" in content[lines]:
                         SmartHome.Moritz_presence = True
                         self.presence_label.config(text="Moritz ist zuhause")
                         #self.moritz_presence.config(image=self.moritz_avatar)
            
                 elif "DOWN" in content[lines]:
                     pass
                     if "Moritz" in content[lines]:
                         SmartHome.Moritz_presence = False
                         self.presence_label.config(text="")
                         
             self.presence_label.after(30000, self.presence)
             
         #Define clock
         def tick(self):
             self.time_status = time.strftime('%H:%M Uhr')
             self.time_label.config(text=self.time_status)
             self.time_label.after(200, self.tick)
             
         #Define lightswitch
         def light_switch(self, ip):
             self.bulb = Bulb(ip)
             
             if SmartHome.light_status == True:
                 self.light_button.configure(image=self.photolightoff)
                 #self.bulb.turn_off()
                 SmartHome.light_status = False

             elif SmartHome.light_status == False:
                 #self.bulb.turn_on()
                 self.light_button.configure(image=self.photolighton)
                 SmartHome.light_status = True
                
         #Define switch for voice control JARVIS
         def jarvis_switch(self):

             if SmartHome.jarvis_status == True:
                 self.MsgBox = askyesno(message="Willst du JARVIS schließen?")
                 
                 if self.MsgBox == True:
                     #Close JARVIS with command
                     print("closed")
                     SmartHome.jarvis_status = False

             elif SmartHome.jarvis_status == False:
                 #Open Jarvis with Command
                SmartHome.jarvis_status = True
                
         #Define switch for MagicMirror
         def mirror_switch(self):

             if SmartHome.mirror_status == True:
                 self.MsgBox = askyesno(message="Willst du den SmartMirror schließen?")
                 
                 if self.MsgBox == True:
                     #Close MagicMirror
                     os.system("pm2 stop run-mm")
                     SmartHome.mirror_status = False

             elif SmartHome.mirror_status == False:
                #Open Kickstart.py in the backround to start MagicMirror.
                self.running = subprocess.call("nohup python Kickstart.py &", shell = True)
                SmartHome.mirror_status = True
                
            


root = Tk()
GUI = SmartHome(root)
root.mainloop()





