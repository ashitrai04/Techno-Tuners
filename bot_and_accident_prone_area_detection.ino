/*This code is used for accidental prone area detection and telegram bot creation.*/
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define OLED_RESET -1 
#define OLED_ADDR 0x3C 
#define SCREEN_WIDTH 128 // OLED display width, in pixels  GND TPO GND,VCC TO VCC ,SCK TO D1,SDA TO D2
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);


#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <math.h>

SoftwareSerial gpsSerial(12, 13); // RX, TX pins for GPS module RX TO D7 ,TX TO D6
TinyGPSPlus gps; // GPS object

const double targetLat = 23.816395, targetLng = 86.442486; // target latitude and target longitude in degrees
const int ledPin = 14;  //D5-accidental prone area
const int vehicle = 0;  //D3-auto-mode
 // pin number for LED

String latitude, longitude;;
#include "CTBot.h"
CTBot myBot;  
String token = "6199952557:AAEfvUWheWVgmqXJ6YFjhhZnLwGd6N1W_4U";   // REPLACE myToken WITH YOUR TELEGRAM BOT TOKEN
                     
               
#include <SoftwareSerial.h>
#define LED_PIN 16  //buzzer
#include <ESP8266WiFi.h>
#include <Wire.h>                      // The serial connection to the GPS device
const char* ssid = "iPhone";          // REPLACE myPassword YOUR WIFI PASSWORD, IF ANY
const char* password = "ashit@123";    
void accident();
void setup()
{
   pinMode(LED_PIN, OUTPUT);
   pinMode(vehicle, OUTPUT);
   pinMode(ledPin, OUTPUT);
   
   Serial.begin(9600);
   gpsSerial.begin(9600);
	 myBot.setTelegramToken(token); 
   display.begin(SSD1306_SWITCHCAPVCC, 0x3C);  
   display.clearDisplay();
   display.display();
   
   WiFi.begin(ssid, password);
   while (WiFi.status() != WL_CONNECTED)
   {   
     delay(500);
     Serial.print(".");
   }
    // Serial.println("");
    // Serial.println("WiFi connected");
   // Print the IP address
   //Serial.println(WiFi.localIP());
}
double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
  double R = 6371000; // radius of Earth in meters
  double lat1Rad = degToRad(lat1);
  double lat2Rad = degToRad(lat2);
  double deltaLatRad = degToRad(lat2 - lat1);
  double deltaLonRad = degToRad(lon2 - lon1);
  double a = sin(deltaLatRad/2) * sin(deltaLatRad/2) + cos(lat1Rad) * cos(lat2Rad) * sin(deltaLonRad/2) * sin(deltaLonRad/2);
  double c = 2 * atan2(sqrt(a), sqrt(1-a));
  double d = R * c;
  return d;
}
void loop()
{  
  display.clearDisplay();
  display.setTextSize(3);
  display.setTextColor(WHITE);
  display.setCursor(27, 2);
  display.print(gps.speed.kmph());
  display.setTextSize(1);
  display.setCursor(0, 50);
  display.print("SPEED KMPH");
  display.display();
  while (gpsSerial.available() > 0) 
  {
    if (gps.encode(gpsSerial.read())) 
    {
      double lat = gps.location.lat(), lng = gps.location.lng(), dist = calculateDistance(lat, lng, targetLat, targetLng);
      latitude = String(gps.location.lat(), 6);
      longitude = String(gps.location.lng(), 6);
      Serial.print(lat, 6);
      Serial.print(lng, 6);
      if (dist <= 100.0) {
        digitalWrite(ledPin, HIGH); 
        delay(10000);
        digitalWrite(ledPin, LOW);
        delay(1000);
      } else {
        digitalWrite(ledPin, LOW); // turn off LED
      }
    }
  }

  TBMessage msg;

	while (CTBotMessageText == myBot.getNewMessage(msg)) {

		if (msg.text.equalsIgnoreCase("VEHICLE ON")) {              // if the received message is "LIGHT ON"...
			                          // turn on the LED (inverted logic!)
			myBot.sendMessage(msg.sender.id, "VEHICLE is now ON");  // notify the sender
		}
		else if (msg.text.equalsIgnoreCase("VEHICLE OFF")) {        // if the received message is "LIGHT OFF"...
			     
            // turn off the led (inverted logic!)
			myBot.sendMessage(msg.sender.id, "VEHICLE is now OFF"); // notify the sender
		}
    
		if (msg.text.equalsIgnoreCase("/setup"))
     {              // if the received message is "LIGHT ON"...
			                          // turn on the LED (inverted logic!)
			myBot.sendMessage(msg.sender.id, "Setup mode is on"); 
      myBot.sendMessage(msg.sender.id, "For which vehicle Do you want to use\n/Car\n/Bike\n/Heavyvehicle"); // notify the sender
     }
	 if (msg.text.equalsIgnoreCase("/Car")) {        // if the received message is "LIGHT OFF"...
			      
            // turn off the led (inverted logic!)
			myBot.sendMessage(msg.sender.id, "Setup is in Car Mode\n You Can Drive Safe Now!  "); // notify the sender
		}
    else  if (msg.text.equalsIgnoreCase("/bike")) {        // if the received message is "LIGHT OFF"...
			      
            // turn off the led (inverted logic!)
			myBot.sendMessage(msg.sender.id, "Setup is in Bike Mode\n You Can Drive Safe Now!  "); // notify the sender
		}
    else if (msg.text.equalsIgnoreCase("/Heavyvehicle")) {        // if the received message is "LIGHT OFF"...
			      
            // turn off the led (inverted logic!)
			myBot.sendMessage(msg.sender.id, "Setup is in Heavyvehicle Mode\n You Can Drive Safe Now! "); // notify the sender
		}
   
    if(msg.text.equalsIgnoreCase("Lost Key"))
    {
       	myBot.sendMessage(msg.sender.id, "Enter your Passcode");}
     if (msg.text.equalsIgnoreCase("Ashit@123")) 
     {    
       	myBot.sendMessage(msg.sender.id, "You are Authorized user\nVehicle is on!! you can start it ");    // if the received message is "LIGHT OFF"...
			  digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
        digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
     }
     

		if (msg.text.equalsIgnoreCase("Location")) {              // if the received message is "LIGHT ON"...
			                               // turn on the LED (inverted logic!)
			 // notify the sender
	      latitude = String(gps.location.lat(), 6);
        longitude = String(gps.location.lng(), 6);

          // Send the location to the Telegram bot
         String message = "Latitude: " + latitude + "\nLongitude: " + longitude;
         myBot.sendMessage(msg.sender.id, message); 
        } 
        if (msg.text.equalsIgnoreCase("/automode")&&(WiFi.status() == WL_CONNECTED )) {              // if the received message is "LIGHT ON"...
			     digitalWrite(vehicle, HIGH);
       
			myBot.sendMessage(msg.sender.id, "Auto mode is on"); 
        digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
        digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
      
      // notify the sender
		}
 
	 if (msg.text.equalsIgnoreCase("/automodeoff")&&(WiFi.status() == WL_CONNECTED )) {        // if the received message is "LIGHT OFF"...
	    digitalWrite(vehicle, LOW); // turn off the led (inverted logic!)
			myBot.sendMessage(msg.sender.id, "Automode is off"); // notify the sender
		}
  
  }
}  

double degToRad(double deg) {
  return deg * (M_PI/180);
}
