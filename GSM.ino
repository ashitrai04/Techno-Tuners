
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 
#define SCREEN_HEIGHT 64 


Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1); //SCK to D22 and SDA to D21


#include <HardwareSerial.h>
#include <TinyGPS++.h>
#define LED_PIN 23 //to  D23 accidental prone led Replace with the GPIO pin connected to the LED
#define TARGET_LATITUDE 23.816064 // Replace with the target latitude
#define TARGET_LONGITUDE 86.442063 // Replace with the target longitude

HardwareSerial gpsSerial(2); // Use hardware serial port 2
TinyGPSPlus gps;
String speed ;

const String PHONE = "+918090144807";

//GSM Module RX pin to ESP32 Pin 2
//GSM Module TX pin to ESP32 Pin 4
#define rxPin 4
#define txPin 2
#define BAUD_RATE 9600
HardwareSerial sim800(1);

#define RELAY_1 18 //D18 emergency mode
#define RELAY_2 19 //D19 buzzer
#define RELAY_3 13 //D13 accidental prone relay
String smsStatus,senderNumber,receivedDate,msg;
boolean isReply = false;

void setup() {
  pinMode(RELAY_1, OUTPUT); 
  pinMode(RELAY_2, OUTPUT); 
 pinMode(LED_PIN, OUTPUT);
  
  //delay(7000);
  
  Serial.begin(9600);
  gpsSerial.begin(9600, SERIAL_8N1, 16, 17); // Use pins 16 and 17 for RX and TX
  Serial.println("esp32 serial initialize");
  
  sim800.begin(BAUD_RATE, SERIAL_8N1, rxPin, txPin);
  Serial.println("SIM800L serial initialize");
  
  smsStatus = "";
  senderNumber="";
  receivedDate="";
  msg="";

  sim800.print("AT+CMGF=1\r"); 
  delay(1000);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);  
  display.clearDisplay();
  display.display(); 
}

void loop() {
display.clearDisplay();
  display.setTextSize(3);
  display.setTextColor(WHITE);
  display.setCursor(27, 2);
  display.print(gps.speed.kmph());
  display.setTextSize(1);
  display.setCursor(0, 50);
  display.print("SPEED KMPH");
  display.display();
while(sim800.available()){
  parseData(sim800.readString());
}

while(Serial.available())  {
  sim800.println(Serial.readString());
}

} 


void parseData(String buff){
  Serial.println(buff);

  unsigned int len, index;

  index = buff.indexOf("\r");
  buff.remove(0, index+2);
  buff.trim();
  
  if(buff != "OK"){
    index = buff.indexOf(":");
    String cmd = buff.substring(0, index);
    cmd.trim();
    
    buff.remove(0, index+2);
    
    if(cmd == "+CMTI"){
      
      index = buff.indexOf(",");
      String temp = buff.substring(index+1, buff.length()); 
      temp = "AT+CMGR=" + temp + "\r"; 
      
      sim800.println(temp); 
    }
    else if(cmd == "+CMGR"){
      extractSms(buff);
      
      
      if(senderNumber == PHONE){
        doAction();
      }
    }
  
  }
  else{
 
  }
}


void extractSms(String buff){
   unsigned int index;
   
    index = buff.indexOf(",");
    smsStatus = buff.substring(1, index-1); 
    buff.remove(0, index+2);
    
    senderNumber = buff.substring(0, 13);
    buff.remove(0,19);
   
    receivedDate = buff.substring(0, 20);
    buff.remove(0,buff.indexOf("\r"));
    buff.trim();
    
    index =buff.indexOf("\n\r");
    buff = buff.substring(0, index);
    buff.trim();
    msg = buff;
    buff = "";
    msg.toLowerCase();
}

void doAction(){
  if(msg == "emergency mode"){  
   digitalWrite(RELAY_1, HIGH);
    digitalWrite(RELAY_2, HIGH);
       delay(5000);
      digitalWrite(RELAY_2, LOW);
      delay(500);
       digitalWrite(RELAY_2, HIGH);
       delay(500);
        digitalWrite(RELAY_2, LOW);  
    Reply("Emergency mode activated!!!\n Now device is deactivated for 1 hour");
  }
  else if(msg == "Anti theft mode"){
  
    Reply("Anti theft mode On!!");
  }
  else if(msg == "location"){
    String url = "http://maps.google.com/maps?q=" + String(gps.location.lat(), 6) + "," + String(gps.location.lng(), 6);
    String message = "Location: " + url;
    
    Reply(message);
  }
  else if(msg == "speed"){
   speed = (gps.speed.kmph());
    Reply(speed);
  }
  else if(msg == "/setup"){
   
    Reply("Setup Mode is ON\n Choose your vehicle\n /Bike\n /Car \n /Heavy Vehicle");
    if(msg == "/Bike")
    {
      Reply("Vehicle is In Bike Mode.\n You can drive safe now!!");
       digitalWrite(RELAY_2, HIGH);
       delay(500);
      digitalWrite(RELAY_2, LOW);
      delay(500);
       digitalWrite(RELAY_2, HIGH);
       delay(500);
        digitalWrite(RELAY_2, LOW);   
    }
    else if(msg== "/Car")
    {
      Reply("Vehicle is In Car Mode.\n You can drive safe now!!");
      digitalWrite(RELAY_2, HIGH);
       delay(500);
      digitalWrite(RELAY_2, LOW);
      delay(500);
       digitalWrite(RELAY_2, HIGH);
       delay(500);
        digitalWrite(RELAY_2, LOW);  
    }
    else if(msg== "/Heavy Vehicle")
    {
      Reply("Vehicle is In Heavy Vehicle Mode.\n You can drive safe now!!");
      digitalWrite(RELAY_2, HIGH);
       delay(500);
      digitalWrite(RELAY_2, LOW);
      delay(500);
       digitalWrite(RELAY_2, HIGH);
       delay(500);
        digitalWrite(RELAY_2, LOW);  
    }
  }
  if(msg== "Lost Key")
  {
    Reply("Enter your password");
  }

    if(msg== "Ashit@123")
    {
      Reply("You are authorized to use the vehicle. \n Vehicle is ON!! You can start it.");
      digitalWrite(RELAY_2, HIGH);
       delay(500);
      digitalWrite(RELAY_2, LOW);
      delay(500);
       digitalWrite(RELAY_2, HIGH);
       delay(500);
        digitalWrite(RELAY_2, LOW);  
  
  }
  if(msg== "/automode")
  {
    Reply("Auto Mode is on.");
    digitalWrite(RELAY_2, HIGH);
       delay(500);
      digitalWrite(RELAY_2, LOW);
      delay(500);
       digitalWrite(RELAY_2, HIGH);
       delay(500);
        digitalWrite(RELAY_2, LOW);  
  }
  else if(msg== "/automode off")
  {
    Reply("Auto Mode turned off");
  }

  
  smsStatus = "";
  senderNumber="";
  receivedDate="";
  msg="";  
}

void Reply(String text)
{
    sim800.print("AT+CMGF=1\r");
    delay(1000);
    sim800.print("AT+CMGS=\""+PHONE+"\"\r");
    delay(1000);
    sim800.print(text);
    delay(100);
    sim800.write(0x1A); //ascii code for ctrl-26 //sim800.println((char)26); //ascii code for ctrl-26
    delay(1000);
    Serial.println("SMS Sent Successfully.");
}

void acci() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }

  if (gps.location.isValid()) {
    double distance = distanceBetween(gps.location.lat(), gps.location.lng(), TARGET_LATITUDE, TARGET_LONGITUDE);
    if (distance <= 100) {
      digitalWrite(LED_PIN, HIGH);
      digitalWrite(RELAY_3, HIGH);
      delay(1000);
      digitalWrite(LED_PIN, LOW);
      digitalWrite(RELAY_3, LOW);
      delay(10000);
    } else {
      digitalWrite(LED_PIN, LOW);
    }
  }
if (gps.location.isValid()) {
    Serial.print("Latitude: ");
    Serial.print(gps.location.lat(), 6);
    Serial.print(", Longitude: ");
    Serial.println(gps.location.lng(), 6);
  }
  delay(1000);
}

double distanceBetween(double lat1, double lon1, double lat2, double lon2) {
  const double R = 6371000; // Earth's radius in meters
  double phi1 = toRadians(lat1);
  double phi2 = toRadians(lat2);
  double deltaPhi = toRadians(lat2 - lat1);
  double deltaLambda = toRadians(lon2 - lon1);

  double a = sin(deltaPhi/2) * sin(deltaPhi/2) + cos(phi1) * cos(phi2) * sin(deltaLambda/2) * sin(deltaLambda/2);
  double c = 2 * atan2(sqrt(a), sqrt(1-a));

  return R * c;
}

double toRadians(double degrees) {
  return degrees * PI / 180;
}