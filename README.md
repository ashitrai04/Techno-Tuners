# Techno-Tuners
![device](https://user-images.githubusercontent.com/116189633/230726565-ed604742-2a03-4ad1-b651-b5a2efb06dde.jpg)
![bot features](https://user-images.githubusercontent.com/116189633/230726479-93fde404-264a-4011-b87f-dff5edd5a85e.jpg)



##About Device
Our device is developed to control the speed of the vehicle. It is based on Geo-Fencing. Geo-Fences are virtual boundaries which are created around a object. Geofences are built with mapping software, which allows the user to build the geo-fence across the chosen geographic region. It is composed of a set of coordinates, such as latitude and longitude, or, in the case of a circular geofence, one point that serves as the center and radius. With the help of Geo-Fencing we can detect the motion of the object withing the boundaries, through which our microcontroller decides that whether the object is under the area or not and if it is not then alert message is send and it slows the vehicle.

Along with controlling speed it also alerts the driver behind 100 metres of an accident prone area. This enables the user to be careful while driving in that area. 
It had additional features such as turning the vehicle on/off remotely. In case you forget the keys you can still access the vehicle by entering your password and it also helps in tracking vehicle in real-time. In case of any accident it sends an SOS message to the loved ones along with the loacion.

##Setting up software part:
Code is divided into three secions: speed control, bot and accident prone area and GSM modles.
1. Speed Control
This part of the code is used to control the speed of the vehicle by taking data from GPS and comparing it with offline database available. ESP-32 is used which creates a interface.
2. Bot and Accident Prone Area Detection
This part of the code is used to setup a telegram bot which will be used to access the vehicle by giving command to the bot.
Accident Prone Area Detection is used to warn the driver in case he/she is entering a accident prone area. This will make the driver aware thus preventing accident. GPS is used to take data and it is compared with the accident prone area database. In case of entering a accident prone area beep sound will come and red light will start beeping. 
3. GSM 
GSM is used to create a communication channel between device and user. It creates the channel through cell network. 
