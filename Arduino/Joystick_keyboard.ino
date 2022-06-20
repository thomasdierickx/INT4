// ALPS joystick (GND,VCC,A0,A1)
// to act as WASD for SpecialEffect.org.uk
// 3/4/2021


// Keycodes via: https://www.arduino.cc/reference/en/language/functions/usb/keyboard/keyboardmodifiers/
// and https://www.asciitable.com/
// UP = Keyboard.press('W');
// LEFT = Keyboard.press('A');
// DOWN = Keyboard.press('S');
// RIGHT = Keyboard.press('D');


#include "Keyboard.h"


const int pinXAxis = A0;
const int pinYAxis = A1;


const int middleX = 512;
const int middleY = 512;


const int DEADZONE = 32;


bool leftWasActivated = false;
bool rightWasActivated = false;
bool upWasActivated = false;
bool downWasActivated = false;


void setup()
{
  Keyboard.begin();
}




void loop()
{
  int rawX = analogRead(pinXAxis);
  int rawY = analogRead(pinYAxis);


  boolean upIsActivated = rawY > (middleY + DEADZONE);
  boolean rightIsActivated = rawX < (middleX - DEADZONE);
  boolean downIsActivated = rawY < (middleY - DEADZONE);
  boolean leftIsActivated = rawX > (middleX + DEADZONE);


  if (upIsActivated != upWasActivated)
  {
    // Up has changed
    upWasActivated = upIsActivated;
    if (upIsActivated)
      Keyboard.press('W');
    else
      Keyboard.release('W');
  }


  if (leftIsActivated != leftWasActivated)
  {
    // Left has changed
    leftWasActivated = leftIsActivated;
    if (leftIsActivated)
      Keyboard.press('A');
    else
      Keyboard.release('A');
  }


  if (downIsActivated != downWasActivated)
  {
    // Down has changed
    downWasActivated = downIsActivated;
    if (downIsActivated)
      Keyboard.press('S');
    else
      Keyboard.release('S');
  }


  if (rightIsActivated != rightWasActivated)
  {
    // Right has changed
    rightWasActivated = rightIsActivated;
    if (rightIsActivated)
      Keyboard.press('D');
    else
      Keyboard.release('D');
  }
}
