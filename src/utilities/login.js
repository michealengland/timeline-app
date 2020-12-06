import firebase from '../firebase';

/**
 * Firebase login.
 *
 * @param {string} email
 * @param {string} password
 */
const onLogin = ( email, password ) => {
	return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.then( () => {
			// User must sign themselves out.
			return firebase.auth().signInWithEmailAndPassword(email, password);
		})
		.catch( (error) => {
			// Handle Errors here.
			console.log( error );
		});
};

export default onLogin