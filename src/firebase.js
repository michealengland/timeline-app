import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyBoqiWn6qVoT_UM130yzTaZXlKfLD2OQdg',
	authDomain: 'timeline-app-bab5f.firebaseapp.com',
	databaseURL: 'https://timeline-app-bab5f.firebaseio.com',
	projectId: 'timeline-app-bab5f',
	storageBucket: 'timeline-app-bab5f.appspot.com',
	messagingSenderId: '485647181936',
	appId: '1:485647181936:web:2df837530f50e5595decb5'
};

firebase.initializeApp(config);

export default firebase;