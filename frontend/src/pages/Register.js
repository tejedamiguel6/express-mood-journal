import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
    password: '',
    password2: '',
  })

  const { name, email, age, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
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
