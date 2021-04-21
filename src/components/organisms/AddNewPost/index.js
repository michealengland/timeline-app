import React, {useState, useReducer, useEffect} from 'react'
import PropTypes from 'prop-types'
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
  isNewTimeline: true,
  mediaPlaceholderUrl: '',
  mediaUpload: null,
  postTitle: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'setDate':
      return {
        ...state,
        date: action.newDate,
      }
    case 'setIsNewTimeline':
      return {
        ...state,
        isNewTimeline: !state.isNewTimeline,
      }
    case 'setMediaPlaceholderUrl':
      return {
        ...state,
        mediaPlaceholderUrl: action.mediaPlaceholderUrl,
      }
    case 'setMediaUpload':
      return {
        ...state,
        mediaUpload: action.mediaUpload,
      }
    case 'setPostTitle':
      return {
        ...state,
        postTitle: action.value,
      }
    default:
      throw new Error()
  }
}

const AddNewPost = ({title, uid}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    date,
    isNewTimeline,
    mediaUpload,
    mediaPlaceholderUrl,
    postTitle,
  } = state

  // Set Form States.
  const [selectTimelineID, setSelectTimelineID] = useState('')
  const [timelineNew, setNewTimeline] = useState('')
  const [timelines, setTimelines] = useState([])
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

  // resize image and set state.
  const getResizedImage = async (image, callback) =>
    await resizeImage(image, callback)

  // Image upload event handler.
  const setMediaUploadAndPlaceholder = e => {
    if (e.target.files[0]) {
      getResizedImage(e.target.files[0], resizedImage => {
        dispatch({type: 'setMediaUpload', mediaUpload: e.target.files[0]})
        dispatch({
          type: 'setMediaPlaceholderUrl',
          mediaPlaceholderUrl: URL.createObjectURL(resizedImage),
        })
      })
    }
  }

  // Reset Image Upload.
  const resetMedia = () => {
    dispatch(
      {type: 'setMediaUpload', mediaUpload: null},
      {type: 'setMediaPlaceholderUrl', mediaPlaceholderUrl: ''},
    )
  }

  // Toggle isNewTimeline on checkbox click.
  const toggleNewTimeline = () => {
    dispatch({type: 'setIsNewTimeline'})

    // Set default for new timeline.
    if (timelines.length > 0 && timelines[0].timelineID) {
      setSelectTimelineID(timelines[0].timelineID)
    }
  }

  // update date on change.
  const onDateUpdate = newDate => dispatch({type: 'setDate', newDate})

  /**
   * On Submit writeNewPost data.
   *
   * @param {*} e event.
   */
  async function saveNewPost(e) {
    e.preventDefault()
    // Write media to storage before setting timeline.
    const mediaItemUrl = await uploadMediaToStorage(mediaUpload, uid)

    // Write / Edit timeline to the DB.
    if (isNewTimeline) {
      writePostToNewTimeline(uid, date, mediaItemUrl, postTitle, timelineNew)
    } else {
      writePostToExistingTimeline(
        uid,
        date,
        mediaItemUrl,
        postTitle,
        selectTimelineID,
      )
    }

    // Redirect User on Submit.
    setSubmitStatus(true)
  }

  return (
    <div className="add-new-post">
      <form className="add-new-post-form">
        {title && <h1>{title}</h1>}
        <TextInput
          id="title"
          label="Title (3 to 60 characters):"
          maxLength="60"
          minLength="3"
          onChange={e => {
            dispatch({type: 'setPostTitle', value: e.target.value})
          }}
          value={postTitle}
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
          placeholderURL={mediaPlaceholderUrl}
          onChange={setMediaUploadAndPlaceholder}
          resetMedia={resetMedia}
        />
        <DatePickerInput
          date={date}
          label="Date"
          name="date"
          onUpdate={onDateUpdate}
        />
        <button
          disabled={uid === '' || uid === null || postTitle === ''}
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

AddNewPost.propTypes = {
  title: PropTypes.string,
  uid: PropTypes.string,
}

AddNewPost.defaultProps = {
  uid: null,
}

export default AddNewPost
