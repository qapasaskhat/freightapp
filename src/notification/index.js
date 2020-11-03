import firebase from 'react-native-firebase';
import {Platform} from 'react-native';
import store from '../api/store';
import {fetchAnnouncementsId} from '../api/Announcements/actions'

class FCMService {
register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  checkPermission = onRegister => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission Rejected', error);
      });
  };
  getToken = onRegister => {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch(error => {
        console.log('[FCMService] GetToken rejected', error);
      });
  };

  requestPermission = onRegister => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permissions rejected ', error);
      });
  };
  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    firebase.messaging.deleteToken().catch(error => {
      console.log('[FCMService] delete token error ', error);
    });
  };
  
  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        onNotification(notification);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(async notificationOpen => {
        //onOpenNotification(notificationOpen);

        if (notificationOpen) {
          console.log('notificationOpenedListener',notificationOpen)
          const notification = notificationOpen.notification;
          console.log('notificationOpen',notification)
          onOpenNotification(notification);
          this.removeDeliveredNotification(notification);
        }
      });

    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          const notification = notificationOpen.notification;
          console.log('notificationOpen ', notificationOpen);
          console.log('getInitialNotification ', notification);
          onOpenNotification(notification);
          this.removeDeliveredNotification(notification);
        }
      });
    
      this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notificationOpen) => {
        if (notificationOpen) {
          const notification = notificationOpen.notification;
          console.log('onNotificationDisplayed ', notification);
          onOpenNotification(notification);
          this.removeDeliveredNotification(notification);
        }
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log('message',message)
      onNotification(message);
    });

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        console.log('[FCMService] new token refresh: ', fcmToken);
        onRegister(fcmToken);
      });
  };

  unRegister = () => {
    this.messageListener();
    this.onTokenRefreshListener();
    this.notificationOpenedListener();
    this.notificationListener();
  };

  buildChannel = obj => {
    console.log(obj, 'build channel android');
    const channel = new firebase.notifications.Android.Channel(
      obj.channelId,
      obj.channelName,
      firebase.notifications.Android.Importance.High,
    ).setDescription(obj.channelDes)
    //.setSound(obj.sound);
    firebase.notifications().android.createChannel(channel);
    return channel;
  };

  buildNotification = obj => {
    console.log(obj, 'build notification android ');
    let badge_count = 0
    firebase.notifications().getBadge().then(res=>{
      badge_count = res
    })
    //firebase.notifications().setBadge(badge_count + 1)
    
    firebase.notifications().android.createChannel(obj.channel);
    return new firebase.notifications.Notification()
     // .setSound(obj.sound)
      .setNotificationId(obj.dataId)
      .setTitle(obj.title)
      .setBody(obj.content)
      .setData(obj.data)
      .ios.setBadge(badge_count + 1)
      // for android
      .android.setChannelId(obj.channel.channelId)
      .android.setLargeIcon(obj.largeIcon)
      .android.setSmallIcon(obj.smallIcon)
      .android.setColor(obj.color)
      //.android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Summary)
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setVibrate(obj.vibrate);
  };

  displayNotify = notification => {
    console.log('displayNotify',notification)
    firebase
      .notifications()
      .displayNotification(notification)
      .catch(error => {
        console.log('Display notification error: ', error);
      });
  };

  removeDeliveredNotification = notification => {
    firebase.notifications().removeDeliveredNotification(notification.notificationId)
    //firebase.notifications().removeAllDelive redNotifications();
  };

  removeDeliveredAllNotification = ()=>{
    firebase.notifications().removeAllDeliveredNotifications()
  }

  cancellAllNotification = () => {
    firebase
      .notifications()
      .cancelAllNotifications()
      .catch(error => {
        console.log(error);
      });
  };
}
export const fcmService = new FCMService();
