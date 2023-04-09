# Techno-Tuners
## DEVICE:
![device](https://user-images.githubusercontent.com/116189633/230726565-ed604742-2a03-4ad1-b651-b5a2efb06dde.jpg)


## Problem Statement
We are working on two main problems which deals with the following problems:

1.The first problem pertains to the prevalent issue of speeding in our country, which accounts for a significant 60% of all accidents.
  Despite the government's efforts to enforce speed limits in designated areas, most people do not comply with these regulations and are often penalized for     breaking the rule. Sometimes thhis problem affects people who are unaware with the speed limit system. Our focus is to find effective solutions to minimize     the incidence of overspeeding and make our roads safer for everyone.


2. There are areas which often faces accidents and such areas are known as accidental prone areas. In our country most of the heavy vehicle drives meets accident at acciddent prone areas. This problem is also faced by vehicles which mostly runs during night e.g.transportation vehicles.


##Solution

1. Automatic Speed Limit Controller
2. Accident Prone Area Alert System
##Additional Features
1. Can be controlled and located from remote place
2. Auto Unlock (Automatically unlocks upon reaching near vehicle and vice versa)
3. Lost Key(Can be unlocked using passcode in case you lost/forgot the keys)
4. Emergency Mode(All features will get deactivated for an hour)

##Brief Intro to Features:

1. Automatic Speed Limit Controller
   In this feature we are going to control the speed of the vehicle. By controlling the flow of fuel, speed of the vehicle is kept under the speed limit of        that area. Nowdays we have BS-6 versions in motorvehicles which can be easily integrated with this device The speed limit of area is taken from google maps    and open street map a database is created where  all this data is stored. We have demonstrated the control of the plug with the help of relay.  
  
  How it works?
  
  We are using ESP-8266 microcontroller in which we are feeding the database of speed limit of areas. We are using virtual boundaries i.e. geo-fencing to         detect whether the device is inside the speed limit area or not. In geo-fencing we create a  polygon i.e.virtual boundaries, around the object and several 
  points is taken from then polygon and angle formed from object and the co-ordinate of the point is calculated. If the sum of all such angles is less than       360, it implies that the object is under the area. If the angle is equal to 360, it implies that vehicle is exactly on the border and if it is greater then     360, it implies that vehicle is outside the area.
  The given diagram will bring clarity in concept:
   
   
   ![geo-fencing](https://user-images.githubusercontent.com/116189633/230754794-9fb52530-2238-49c5-b1bd-05657d83c21c.gif)


2. Accident Prone Area Detection
   We have created a database of accident prone areas stated by Ministry of Roads and Transportation. Using GPS location of the vehicle is tracked down which  
   is compared with the database. If the vehicle is near any accidental prone area(100m behind the area), driver gets a alert message followed by a beep sound.    Alert message is displayed on the OLED display used.
   
3. Controlling from Remote Place
   There are two ways to control the vehicle from remote place--(a) Using Telegram Bot
                                                                (b) Using GSM(through SMS)
   We can track down the location of the vehicle from remote place by sending a message "Location" to the medium we are using. There are three options            available among which our vehicle can be setup. These are as follows: (a)Car   (b)Bike  (c)Heavy Vehicle Mode
   Below photo shows the use of GSM for controlling the vehicle remotely
   ![a7f7fa9d-f207-45ea-b09e-844cbe451ae8](https://user-images.githubusercontent.com/116189633/230751242-3234a867-0cff-4719-8b17-1d9153f4c47b.jpg)
   
   Below photo shows the use of Telegram Bot for controlling the vehicle remotely
   ![bot features](https://user-images.githubusercontent.com/116189633/230726479-93fde404-264a-4011-b87f-dff5edd5a85e.jpg)
 
4. Auto Unlock
   Our device gives the user feature to unlock the car automatically as soon as the user comes near the vehicle. This feature is enabled by giving command        "/automode". Once this command is given to the system this feature gets activated. In similar manner we can turn auto-mode off by giving command                "/offautomode".
  
5. Lost Key
   In present scenario of busy schedule of people it happens that people forget to take their car keys along with them or it might be possible that the user      might loose his/her key and it is not possible to get another key instantly then in such situations our "LOST KEY" feature comes to rescue. Using this          feature we can unlock as well as turn on/off our vehicle. To enable this feature user just have to send "lost Key" command to the system. System will ask      for the passcode and if the password is correct vehicle gets unlocked without keys.
   
 6. Emergency Mode
    In case of some misfortune user can disable all the features of the device. Vehicle will get deactivated for an hour. Only one hour is alloted for             emergency mode in one day. To activate this mode user needs to give command "Emergency Mode" to the system through the interface.



