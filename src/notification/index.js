import firebase from 'react-native-firebase';
import {Platform} from 'react-native';

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
      .onNotificationOpened(notificationOpen => {
        onOpenNotification(notificationOpen);
        if (notificationOpen) {
          const notification = notificationOpen.notification;
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
          console.log('getInitialNotification ', notification);
          onOpenNotification(notification);
          this.removeDeliveredNotification(notification);
        }
      });

    this.messageListener = firebase.messaging().onMessage(message => {
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
    console.log(obj, ' build channel android');
    const channel = new firebase.notifications.Android.Channel(
      obj.channelId,
      obj.channelName,
      firebase.notifications.Android.Importance.High,
    ).setDescription(obj.channelDes);
    firebase.notifications().android.createChannel(channel);
    return channel;
  };

  buildNotification = obj => {
    console.log(obj, ' build notification android ');
    firebase.notifications().android.createChannel(obj.channel);

    return new firebase.notifications.Notification()
      .setSound(obj.sound)
      .setNotificationId(obj.dataId)
      .setTitle(obj.title)
      .setBody(obj.content)
      .setData(obj.data)
      .android.setChannelId(obj.channel.channelId)
      .android.setLargeIcon(obj.largeIcon)
      .android.setSmallIcon(obj.smallIcon)
      .android.setColor(obj.color)
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setVibrate(obj.vibrate);
  };

  displayNotify = notification => {
    firebase
      .notifications()
      .displayNotification(notification)
      .catch(error => {
        console.log('Display notification error: ', error);
      });
  };

  removeDeliveredNotification = notification => {
    //firebase.notifications().removeDeliveredNotification(notification.notificationId)
    firebase.notifications().removeAllDeliveredNotifications();
  };
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
