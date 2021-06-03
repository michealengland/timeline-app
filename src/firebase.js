import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCSEIhAp2di9BDh0itMjwEzCTX6WlChY_E",
  authDomain: "timeline-app-bab5f.firebaseapp.com",
  databaseURL: "https://timeline-app-bab5f.firebaseio.com",
  projectId: "timeline-app-bab5f",
  storageBucket: "timeline-app-bab5f.appspot.com",
  messagingSenderId: "485647181936",
  appId: "1:485647181936:web:fbc6a57e9fb734485decb5"
};

firebase.initializeApp(firebaseConfig)

export default firebase
