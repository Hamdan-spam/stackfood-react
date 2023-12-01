importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
  apiKey: "AIzaSyCUflvHoddQtRBfilqZBsC2WCq0DJfD4JI",
  authDomain: "salva-fast-food.firebaseapp.com",
  databaseURL: "https://salva-fast-food-default-rtdb.firebaseio.com",
  projectId: "salva-fast-food",
  storageBucket: "salva-fast-food.appspot.com",
  messagingSenderId: "947298372691",
  appId: "1:947298372691:web:2991d74f0b7b3e70d8caa6",
  measurementId: "G-ES6NQL2ZZD",
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
