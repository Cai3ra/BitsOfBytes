int led_one   = 13;
int led_two   = 12;
int led_three = 11;  
int level = 0;
int time = 1000;
int loops = 0;
boolean completeLedLoops = false;

void setup() {                
  pinMode(led_one, OUTPUT);     
  pinMode(led_two, OUTPUT);     
  pinMode(led_three, INPUT);
}

void preparePinMode(int pinOne, int pinTwo, int pinThree){

  if(pinOne == 0){
    pinMode(led_one, OUTPUT);
    digitalWrite(led_one, LOW);
  }
  else if(pinOne == 1){
    pinMode(led_one, OUTPUT);
    digitalWrite(led_one, HIGH);
  }
  else if(pinOne == 2)
    pinMode(led_one, INPUT);

  
  if(pinTwo == 0){
    pinMode(led_two, OUTPUT);
    digitalWrite(led_two, LOW);
  }
  else if(pinTwo == 1){
    pinMode(led_two, OUTPUT);
    digitalWrite(led_two, HIGH);
  }
  else if(pinTwo == 2)
    pinMode(led_two, INPUT);
  
 if(pinThree == 0){
    pinMode(led_three, OUTPUT);
    digitalWrite(led_three, LOW);
 }
  else if(pinThree == 1){
    pinMode(led_three, OUTPUT);
    digitalWrite(led_three, HIGH);
  }
  else if(pinThree == 2)
    pinMode(led_three, INPUT);
}


void ledPossibilities(int idLevel){
  
  // Para piscar os Leds use esta sequencia, os pinos tem 3 estados, 5V, 0V e INPUT.
  if(idLevel == 0){
    //01I
    preparePinMode(0,1,2);   
  }
  else if(idLevel == 1){
    //10I
    preparePinMode(1,0,2);
  }
  else if(idLevel == 2){
    //I01
    preparePinMode(2,0,1);
  }
  else if(idLevel == 3){
    //I10
    preparePinMode(2,1,0);
  }
  else if(idLevel == 4){
    //0I1
    preparePinMode(0,2,1);
  }
  else if(idLevel == 5){
    //1I0
    preparePinMode(1,2,0);
  }
  else if(idLevel == 6){
    //1I0
    preparePinMode(1,1,1);
  }
  else if(idLevel == 7){
    //1I0
    preparePinMode(2,1,2);
  }
}

void loop() {
  ledPossibilities(level); 
 
  completeLedLoops = (level >= 5);
  level = (level >= 5 ? 0 : level + 1);
  
  delay(time); 
  
  if(completeLedLoops){
      completeLedLoops = false;
      
      if(time <= 1){
        if(loops > 500){
          time = 1000;
          loops = 0;
        } else {
          loops++;
          time = 1;
        }
      }else{
        time /= 2;
      }
  }
}
