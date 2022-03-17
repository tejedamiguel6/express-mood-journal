import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createMood } from '../features/moods/moodSlice'

function MoodForm() {
  const [text, setText] = useState('')
  const [mood, setMood] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createMood({ mood, text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>
            <input
              placeholder='what mood you in?'
              type='mood'
              name='mood'
              id='mood'
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </label>
        </div>
        <div className='form-group'>
          <label htmlFor='text'>
            <input
              placeholder='explain a bit'
              type='text'
              name='text'
              id='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <button className='btn btn-block'>Add Mood</button>
        </div>
      </form>
    </section>
  )
}

export default MoodForm
