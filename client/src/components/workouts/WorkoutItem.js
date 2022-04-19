import React from 'react'

const WorkoutItem = ({ workout }) => {

    const { name, description, perceivedEffort, date } = workout;

  return (
    <div className='workoutcontainer'>
        <h2>{name}</h2>
        <p>{date}</p>
        <p>{perceivedEffort}</p>
        <p>{description}</p>
    </div>
  )
}

export default WorkoutItem