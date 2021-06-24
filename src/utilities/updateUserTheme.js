import firebase from '../firebase'

/**
 * Update user theme value.
 *
 * @param {string} uid   User id.
 * @param {string} theme String representation of theme ex: "light" "dark"
 */
export default function updateUserTheme(uid, theme) {
  if (typeof uid !== 'string' || typeof theme !== 'string') {
    console.error()
    return;
  }

  firebase
    .database()
    .ref()
    .update({
      [`/users/${uid}/theme`]: theme,
    })
}
