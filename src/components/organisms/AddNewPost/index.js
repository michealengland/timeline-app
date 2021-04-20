import React, {useState, useReducer, useEffect} from 'react'
import ImageUpload from '../../molecules/ImageUpload'
import {
  writePostToNewTimeline,
  writePostToExistingTimeline,
  uploadMediaToStorage,
} from '../../../utilities/write'
import {getUserTimelines} from '../../../utilities/query'
import {Redirect} from 'react-router-dom'
import DatePickerInput from '../../atoms/DatePickerInput'
import resizeImage from '../../../utilities/jimp/image-manipulation'

import CheckboxInput from '../../atoms/CheckboxInput'
import TextInput from '../../atoms/TextInput'

const initialState = {
  date: Date.now(),
}

function reducer(state, action) {
  switch (action.type) {
    case 'setDate':
      return {
        ...state,
        date: action.newDate,
      }
    default:
      throw new Error()
  }
}

// eslint-disable-next-line react/prop-types
const AddNewPost = ({uid}) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialState)
  const {date} = state

  // Set Form States.
  const [fileURL, setFileURL] = useState('')
  const [image, setImage] = useState('')
  const [isNewTimeline, setIsNewTimeline] = useState(true)
  const [placeholderURL, setPlaceholderURL] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [progress, setUploadProgress] = useState(0)
  const [selectTimelineID, setSelectTimelineID] = useState('')
  const [timelineNew, setNewTimeline] = useState('')
  const [timelines, setTimelines] = useState([])
  const [title, setTitle] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)

  // Set posts on page load.
  useEffect(() => {
    if (uid !== null) {
      setTimelines(getUserTimelines(uid))
    }
  }, [uid])

  // Update select onClick.
  const setFormSelect = e => {
    setSelectTimelineID(e.target.value)
  }

  // Set state.
  const callback = resizedImage => {
    setImage(resizedImage)
    setPlaceholderURL(URL.createObjectURL(resizedImage))
  }

  // resize image and set state.
  const getResizedImage = async (image, callback) =>
    await resizeImage(image, callback)

  // Image upload event handler.
  const uploadMedia = e => {
    if (e.target.files[0]) {
      getResizedImage(e.target.files[0], callback)
    }
  }

  // Reset Image Upload.
  const resetMedia = () => {
    setImage('')
    setPlaceholderURL('')
  }

  // Toggle isNewTimeline on checkbox click.
  const toggleNewTimeline = () => {
    setIsNewTimeline(!isNewTimeline)

    // Set default for new timeline.
    if (timelines.length > 0 && timelines[0].timelineID) {
      setSelectTimelineID(timelines[0].timelineID)
    }
  }

  // Write image to the storage DB.
  async function mediaUploadInit(image, uid) {
    const newFileURL = await uploadMediaToStorage(image, uid)

    setFileURL(newFileURL)
  }

  // Get Posts Data on userID update.
  useEffect(() => {
    if (image && fileURL === '') {
      mediaUploadInit(image, uid)
    }
  }, [fileURL, image, uid])

  // update date on change.
  const onDateUpdate = newDate => dispatch({type: 'setDate', newDate})

  /**
   * On Submit writeNewPost data.
   *
   * @param {*} e event.
   */
  const saveNewPost = e => {
    e.preventDefault()
    setNewTimeline(timelineNew)
    setTitle(title)

    // Write / Edit timeline to the DB.
    if (isNewTimeline) {
      writePostToNewTimeline(uid, date, fileURL, title, timelineNew)
    } else {
      writePostToExistingTimeline(uid, date, fileURL, title, selectTimelineID)
    }

    // Redirect User on Submit.
    setSubmitStatus(true)
  }

  return (
    <div className="add-new-post">
      <form className="add-new-post-form">
        <h1>Add New Post</h1>
        <TextInput
          id="title"
          label="Title (3 to 60 characters):"
          maxLength="60"
          minLength="3"
          onChange={e => {
            setTitle(e.target.value)
          }}
          value={title}
          required
        />
        <CheckboxInput
          checked={isNewTimeline}
          label="Create new timeline"
          id="create-new-timeline"
          onChange={toggleNewTimeline}
        />
        {isNewTimeline === true ? (
          <TextInput
            id="category"
            label="New Timeline Name"
            maxLength="20"
            minLength="3"
            onChange={e => {
              setNewTimeline(e.target.value)
            }}
            value={timelineNew}
            required
          />
        ) : (
          <>
            <label htmlFor="timeline-select">Select a Timeline</label>
            <select
              id="timeline-select"
              onChange={setFormSelect}
              value={selectTimelineID}
              required
            >
              {timelines.length > 0 &&
                timelines.map((timeline, key) => (
                  <option key={key} value={timeline.timelineID}>
                    {timeline.label}
                  </option>
                ))}
            </select>
          </>
        )}
        <ImageUpload
          placeholderURL={placeholderURL}
          progress={progress}
          onChange={uploadMedia}
          resetMedia={resetMedia}
        />
        <DatePickerInput
          date={date}
          label="Date"
          name="date"
          onUpdate={onDateUpdate}
        />
        <button
          disabled={uid === '' || uid === null || title === ''}
          className="bttn-main-control"
          type="submit"
          onClick={saveNewPost}
        >
          Submit
        </button>
        {submitStatus === true && <Redirect to="/post-success" />}
      </form>
    </div>
  )
}

export default AddNewPost
