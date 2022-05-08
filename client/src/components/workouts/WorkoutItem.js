import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WorkoutForm from './WorkoutForm';
import { setCurrent, deleteWorkout } from '../../actions/workoutActions';

const WorkoutItem = ({ eachWorkout, setCurrent, deleteWorkout }) => {

  const [showForm, setShowForm] = useState(false);

    const { _id, name, description, perceivedEffort, date } = eachWorkout;

    const displayDate = (date) => {
      let theDate;
      if (date) {
        theDate = date.split("T");
      }
      return theDate[0];
    }

    const showTheForm = () => {
      setShowForm(!showForm)
    }

    const updateTheWorkout = () => {
      showTheForm();
      setCurrent(eachWorkout);
    }

    const deleteTheWorkout = () => {
      deleteWorkout(_id);
    }

  return (
    <>
    <div className='workoutcontainer'>
      <div className='workouttitle'>
        <p>Perceived Effort: {perceivedEffort}</p>
        <h2>{name}</h2>
        <p>{displayDate(date)}</p>
      </div>
      <div className='description'>
      <p>{description}</p>
      </div>
       
      <div className='buttoncontainer'>
        <button onClick={updateTheWorkout}>Update</button>
        <button onClick={deleteTheWorkout}>Delete</button>
      </div>
      
    </div>
    {showForm && <WorkoutForm showTheForm={showTheForm}/>}
    
    </>
  )
}

const mapStateToProps = (state) => ({
  workout: state.workout
})

export default connect(mapStateToProps, { setCurrent, deleteWorkout })(WorkoutItem)