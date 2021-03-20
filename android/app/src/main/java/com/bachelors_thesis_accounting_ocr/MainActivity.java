package com.bachelors_thesis_accounting_ocr;

import android.os.Bundle; // for react-native-splash-screen
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // for react-native-splash-screen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "bachelors_thesis_accounting_ocr";
  }


   /**
    * for react-native-splash-screen
    */
   @Override
   protected void onCreate(Bundle savedInstanceState) {
     SplashScreen.show(this);
     super.onCreate(savedInstanceState);
   }
}
