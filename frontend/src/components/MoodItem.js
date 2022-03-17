const MoodItem = ({ mood }) => {
  const onDelete = () => {
    console.log('delete me')
  }

  return (
    <div className='mood'>
      <div>{new Date(mood.createdAt).toLocaleString('en-US')}</div>
      <h2>{mood.mood}</h2>
      <p>{mood.text}</p>

      <button onClick={onDelete} className='close'>
        X
      </button>
    </div>
  )
}

export default MoodItem
