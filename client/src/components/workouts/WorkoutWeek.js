import React from 'react'

const WorkoutWeek = ({numOfWorkouts, weeksWorkouts}) => {
  const totalPerceivedEffort = () => {
    let sum = 0;
    weeksWorkouts.forEach((workout) => sum += workout.perceivedEffort);
    return sum;
  }

  return (
    <div className='workoutweek'>
      <div>New Week</div>
      <div>Number of Workouts: {numOfWorkouts}</div>
      <div>Total Perceived Effort: {totalPerceivedEffort()}</div>
    </div>
  )
}

export default WorkoutWeek