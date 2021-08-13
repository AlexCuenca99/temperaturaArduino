#define SENSOR_TEMP 0
#define LED_ROJO 2
#define LED_VERDE 3
#define BUZZER 8
#define VENTILADOR 9

void setup() {
  Serial.begin(9600);
  
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(VENTILADOR, OUTPUT);
}

int senyalVoltaje, tempCelcius, valFreq;
float valSen;

void loop() {
  //Emisión de una señal análoga de 0 a 1023
  senyalVoltaje = analogRead(SENSOR_TEMP);
  
  //Conversión a grados celcius
  tempCelcius = (5 * senyalVoltaje * 100) / 1024;

  //Impresión de los datos tomados en la pantalla serial
  Serial.println(tempCelcius);
  
  encenderLeds(tempCelcius);
}

void encenderLeds(int tempCelcius){

  //Apagado/Encendido de leds, ventilador y alarma cuando se sobrepasa 26°
  if(tempCelcius >= 26) {

    encenderAlarma();
    digitalWrite(VENTILADOR, HIGH);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_ROJO, HIGH);
  } else {
    noTone(BUZZER);
    digitalWrite(VENTILADOR, LOW);
    //digitalWrite(BUZZER, LOW);
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_ROJO, LOW);
  }

  delay(900);
}

void encenderAlarma(){
  for(int i=0; i < 180; i++){
      valSen = (sin(i*(PI/180)));
      valFreq = 4000 + (int(valSen*500));
      tone(BUZZER, valFreq);
      delay(3);
   }
}
