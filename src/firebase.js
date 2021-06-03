import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

/**
 * Note: Firebase uses a public API key.
 *
 * See https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053
 */
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
