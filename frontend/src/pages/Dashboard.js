import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getMoods, reset } from '../features/moods/moodSlice'
import MoodForm from '../components/MoodForm'
import MoodItem from '../components/MoodItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { moods, isLoading, isError, message } = useSelector(
    (state) => state.moods
  )
  console.log(moods, 'these are moods')

  useEffect(() => {
    if (isError) {
      console.log('there was an error', message)
    }
    if (!user) {
      navigate('/register')
    }

    dispatch(getMoods())
    // do something when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [navigate, user, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>MOODS Dashboard</p>
      </section>
      <MoodForm />

      <section className='content'>
        {moods.length > 0 ? (
          <div className='moods'>
            {moods.map((mood) => (
              <>
                <MoodItem key={mood._id} mood={mood} />
              </>
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
