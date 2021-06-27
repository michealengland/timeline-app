import React, {useReducer, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

import {getUserTimelines} from '@Utilities/firebase/query'
import {uploadMediaToStorage} from '@Utilities/firebase/write'
import resizeImage from '@Utilities/jimp/image-manipulation'
import saveNewPost from '@Utilities/firebase/saveNewPost'
import CheckboxInput from '@Atoms/CheckboxInput'
import DatePickerInput from '@Atoms/DatePickerInput'
import MediaUpload from '@Molecules/MediaUpload'
import SelectInput from '@Atoms/SelectInput'
import TextInput from '@Atoms/TextInput'

const initialState = {
  date: new Date(),
  formSubmissionStatus: false,
  isNewTimeline: true,
  mediaPlaceholderUrl: '',
  mediaUpload: null,
  newTimelineName: '',
  postTitle: '',
  selectedTimelineID: '',
  timelines: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'setDate':
      return {
        ...state,
        date: action.newDate,
      }
    case 'setFormSubmissionStatus':
      return {
        ...state,
        formSubmissionStatus: !state.formSubmissionStatus,
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
    case 'setNewTimelineName':
      return {
        ...state,
        newTimelineName: action.value,
      }
    case 'setPostTitle':
      return {
        ...state,
        postTitle: action.value,
      }
    case 'setSelectedTimelineId':
      return {
        ...state,
        selectedTimelineID: action.value,
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
    mediaPlaceholderUrl,
    mediaUpload,
    newTimelineName,
    postTitle,
    selectedTimelineID,
    timelines,
  } = state

  // If no timelines are available, force a new timeline.
  const shouldForceNewTimeline = Array.isArray(timelines) && !timelines.length

  // Set posts on page load.
  useEffect(() => {
    async function getUserTimelineOptions(uid) {
      // Resolve user timelines.
      const userTimelines = await getUserTimelines(uid)

      // Convert user timelines into select options.
      const selectTimelineOptions = Array.isArray(userTimelines)
        ? userTimelines.map(timeline => {
            return {
              option: timeline.label,
              value: timeline.timelineID,
            }
          })
        : []

      // If no select options, return early.
      if (!selectTimelineOptions.length) {
        return
      }

      // Populate select options.
      dispatch({type: 'setTimelines', value: selectTimelineOptions})

      // Set default select option.
      dispatch({
        type: 'setSelectedTimelineId',
        value: selectTimelineOptions[0].value,
      })
    }

    if (uid !== null) {
      getUserTimelineOptions(uid)
    }
  }, [uid])

  const onTimelineSelectChange = e => {
    dispatch({type: 'setSelectedTimelineId', value: e.target.value})
  }

  const setMediaAndPlaceholder = async e => {
    if (!e.target.files[0]) {
      return
    }

    const resizedImage = await resizeImage(e.target.files[0])

    dispatch({
      type: 'setMediaUpload',
      mediaUpload: resizedImage,
    })
    dispatch({
      type: 'setMediaPlaceholderUrl',
      mediaPlaceholderUrl: URL.createObjectURL(resizedImage.file),
    })
  }

  const resetMedia = e => {
    e.preventDefault()

    dispatch({type: 'setMediaUpload', mediaUpload: null})
    dispatch({type: 'setMediaPlaceholderUrl', mediaPlaceholderUrl: ''})
  }

  const toggleNewTimeline = () => {
    dispatch({type: 'setIsNewTimeline'})
  }

  const onDateSelect = newDate => dispatch({type: 'setDate', newDate})

  /**
   * On Submit writeNewPost data.
   *
   * @param {*} e event.
   */
  async function submitPost(e) {
    e.preventDefault()
    // Write media to storage before setting timeline.
    let newMediaItem = {}

    if (mediaUpload) {
      const {height, width} = mediaUpload
      newMediaItem.height = height
      newMediaItem.url =
        (await uploadMediaToStorage(mediaUpload.file, uid)) || ''
      newMediaItem.width = width
    }

    saveNewPost({
      date,
      existingTimelineKey: selectedTimelineID,
      isNewTimeline: shouldForceNewTimeline || isNewTimeline,
      media: newMediaItem,
      newTimelineName,
      title: postTitle,
      uid,
    })

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
          />
          {!shouldForceNewTimeline && (
            <CheckboxInput
              checked={isNewTimeline}
              disabled={shouldForceNewTimeline}
              label="Create new timeline"
              id="create-new-timeline"
              onChange={toggleNewTimeline}
            />
          )}
          {(isNewTimeline || shouldForceNewTimeline) && (
            <TextInput
              id="category"
              label="New Timeline Name"
              maxLength="20"
              minLength="3"
              onChange={e =>
                dispatch({
                  type: 'setNewTimelineName',
                  value: e.target.value,
                })
              }
              value={newTimelineName}
            />
          )}

          {!isNewTimeline && !shouldForceNewTimeline && (
            <SelectInput
              id="timeline-select"
              label="Select a Timeline"
              onChange={onTimelineSelectChange}
              options={timelines}
              value={selectedTimelineID}
            />
          )}
          <MediaUpload
            placeholderURL={mediaPlaceholderUrl}
            onChange={setMediaAndPlaceholder}
            resetMedia={resetMedia}
          />
          <DatePickerInput
            date={date}
            label="Date"
            name="date"
            onUpdate={onDateSelect}
          />
          <button
            disabled={uid === '' || uid === null || postTitle === ''}
            className="bttn-main-control"
            type="submit"
            onClick={submitPost}
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
