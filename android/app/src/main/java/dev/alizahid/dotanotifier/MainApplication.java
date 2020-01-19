package dev.alizahid.dotanotifier;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();

        return packages;
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, false);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

      if (notificationManager != null) {
        NotificationChannel readyCheck = new NotificationChannel("ready_check", "ready_check", NotificationManager.IMPORTANCE_HIGH);
        NotificationChannel matchReady = new NotificationChannel("match_ready", "match_ready", NotificationManager.IMPORTANCE_HIGH);

        AudioAttributes attributes = new AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_NOTIFICATION)
          .build();

        readyCheck.setSound(Uri.parse((getResources().getResourceEntryName(R.raw.ready_check_no_focus))), attributes);
        matchReady.setSound(Uri.parse((getResources().getResourceEntryName(R.raw.match_ready_no_focus))), attributes);

        notificationManager.createNotificationChannel(readyCheck);
        notificationManager.createNotificationChannel(matchReady);
      }
    }
  }
}
