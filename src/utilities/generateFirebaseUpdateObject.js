/**
 * Process data Object into path based Object for Firebase.
 *
 * @param {string} path    Path of value to update in Firebase.
 * @param {Object} dataObj Data Object to create Firebase update Object from.
 * @return {Object} Firebase update Object.
 */
export default function generateFirebaseUpdateObject(path, dataObj) {
  const valuesToUpdate = {}
  const dataKeys = Object.keys(dataObj)

  for (let i = 0; i < dataKeys.length; i++) {
    valuesToUpdate[`${path}/${dataKeys[i]}`] = dataObj[dataKeys[i]]
  }

  return valuesToUpdate
}
