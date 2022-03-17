import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

// useSelector used to select something from state
// useDispatch is used to dispatch function

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
    password: '',
    password2: '',
  })

  const { name, email, age, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Passwords dont match! :(')
    } else {
      const userData = {
        name,
        email,
        age,
        password,
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='enter Name'
              onChange={onChange}
            ></input>
          </div>

          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='enter email'
              onChange={onChange}
            ></input>
          </div>

          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              id='age'
              name='age'
              value={age}
              placeholder='enter age'
              onChange={onChange}
            ></input>
          </div>

          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Create a password'
              onChange={onChange}
            ></input>
          </div>

          <div className='form-group'>
            <input
              className='form-control'
              type='password2'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            ></input>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
