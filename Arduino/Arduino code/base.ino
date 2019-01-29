// Variables
int delayValue = 500;
int arduinoState = 0;

void setup() {
  Serial.begin(9600);

  pinMode(2, INPUT); // Capacative Touch Sensor
  pinMode(8, INPUT); // Button Carne
  pinMode(9, INPUT); // Button Peixe
  pinMode(10, INPUT); // Button Vegetariano
  pinMode(11, INPUT); // Button Dieta
  
  digitalWrite(8, HIGH);
  digitalWrite(9, HIGH);
  digitalWrite(10, HIGH);
  digitalWrite(11, HIGH);
}

void loop() {
  // Change Arduino state
  if (digitalRead(2) == HIGH && arduinoState == 0) {
    //Serial.println("Changing state to 1!");
    changeState(1);
  } else if (digitalRead(2) == HIGH && arduinoState == 1) {
    //Serial.println("Changing state to 0!");
     changeState(0);
  }

  // If arduino is "awake", let buttons send data
  if (arduinoState == 1) {
    if (!digitalRead(8)) {
    sendMeat();
  } else if (!digitalRead(9)) {
    sendFish();
  } else if (!digitalRead(10)) {
    sendVegetarian();
  } else if (!digitalRead(11)) {
    sendDiet();
  } 
  // If buttons are pressed but the arduino is asleep
  } else if (arduinoState == 0) {
    if (!digitalRead(8) || !digitalRead(9) || !digitalRead(10) || !digitalRead(11)) {
      Serial.println("Wake up the Arduino to be able to save data to the server!");
      delay(delayValue);
    }
  }
}

// Change the state of the arduino
int changeState(int state) {
  arduinoState = state;

  if (state == 1) {
    Serial.println("Arduino is now awake!");
  } else {
    Serial.println("Arduino went to sleep...");
  }

  delay(delayValue);
  return arduinoState;
}

// Sends "0" through Serial
void sendMeat() {
  Serial.println(0);
  delay(delayValue);
}

// Sends "1" through Serial
void sendFish() {
  Serial.println(1);
  delay(delayValue);
}

// Sends "2" through Serial
void sendVegetarian() {
  Serial.println(2);
  delay(delayValue);
}

// Sends "3" through Serial
void sendDiet() {
  Serial.println(3);
  delay(delayValue);
}
