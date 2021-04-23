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
  formSubmissionStatus: false,
  mediaPlaceholderUrl: '',
  mediaUpload: null,
  postTitle: '',
  selectedTimelineID: null,
  timelines: [],
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
    case 'setFormSubmissionStatus':
      return {
        ...state,
        formSubmissionStatus: !state.formSubmissionStatus,
      }
    case 'setSelectedTimelineId':
      return {
        ...state,
        selectedTimelineID: state.value,
      }
    case 'setTimelines':
      return {
        ...state,
        timelines: action.value,
      }
    default:
      throw new Error()
  }
}

const AddNewPost = ({title, uid}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    date,
    formSubmissionStatus,
    isNewTimeline,
    mediaUpload,
    mediaPlaceholderUrl,
    postTitle,
    selectedTimelineID,
    timelines,
  } = state

  // Set Form States.
  const [timelineNew, setNewTimeline] = useState('')

  // Set posts on page load.
  useEffect(() => {
    if (uid !== null) {
      dispatch({type: 'setTimelines', value: getUserTimelines(uid)})
    }
  }, [uid])

  // Update select onClick.
  const setFormSelect = e => {
    dispatch({type: 'setSelectedTimelineId', value: e.target.value})
  }

  // Image upload event handler.
  const setMediaUploadAndPlaceholder = async e => {
    if (e.target.files[0]) {
      await resizeImage(e.target.files[0], resizedImage => {
        dispatch({type: 'setMediaUpload', mediaUpload: e.target.files[0]})
        dispatch({
          type: 'setMediaPlaceholderUrl',
          mediaPlaceholderUrl: URL.createObjectURL(resizedImage),
        })
      })
    }
  }

  // Reset Image Upload.
  const resetMedia = e => {
    e.preventDefault()

    dispatch({type: 'setMediaUpload', mediaUpload: null})
    dispatch({type: 'setMediaPlaceholderUrl', mediaPlaceholderUrl: ''})
  }

  // Toggle isNewTimeline on checkbox click.
  const toggleNewTimeline = () => {
    dispatch({type: 'setIsNewTimeline'})
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
        selectedTimelineID,
      )
    }

    // Form submitted.
    dispatch({type: 'setFormSubmissionStatus'})
  }

  // Form has not been submitted yet.
  if (!formSubmissionStatus) {
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
                value={selectedTimelineID}
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
        </form>
      </div>
    )
  }

  // Form submission success! Route user.
  if (formSubmissionStatus === true) {
    return <Redirect to="/post-success" />
  }
}

AddNewPost.propTypes = {
  title: PropTypes.string,
  uid: PropTypes.string,
}

AddNewPost.defaultProps = {
  uid: null,
}

export default AddNewPost
