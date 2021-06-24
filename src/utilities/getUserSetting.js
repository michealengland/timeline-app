import firebase from '../firebase'

/**
 * Get the user setting by property key.
 *
 * @param {string} uid         User id.
 * @param {string} propertyKey User settings property to read.
 * @return {value} Value from read property.
 */
export default async function getUserSetting(uid, propertyKey) {
	if (typeof uid !== 'string' || typeof propertyKey !== 'string') {
		console.error(`getUserSetting() failed.`)
	}

	return await firebase
		.database()
		.ref(`users/${uid}`)
		.once('value')
		.then(snapshot => {
			return snapshot.child(`/${propertyKey}`).val()
		})
		.catch(err => console.error(err))
}