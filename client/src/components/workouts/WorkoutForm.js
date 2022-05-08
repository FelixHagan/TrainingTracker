import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWorkout, updateWorkout, clearCurrent } from '../../actions/workoutActions';

const WorkoutForum = ({ addWorkout, updateWorkout, clearCurrent, auth: { user }, showTheForm, workout: { current } }) => {
    const [newWorkout, setNewWorkout] = useState({
        user: user._id,
        name: "",
        description: "",
        perceivedEffort: ""
    });

    useEffect(() => {
        if (current !== null) {
            setNewWorkout(current);
        }
    }, [current]);

    const { name, description, perceivedEffort } = newWorkout;

     // runs when the user types in the form
     const onChange = e => setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value});

     const onSubmit = e => {
         e.preventDefault();
         if (current) {
             updateWorkout(newWorkout);
             clearCurrent();
         } else {
            addWorkout(newWorkout);
         }
         showTheForm(); 
     }

  return (
    <div className="formcontainer">
    <form onSubmit={onSubmit}>
        <h2>Add A New Workout</h2>

        <div className="labelinputcontainer">
            <label htmlFor='name'>Name:</label>
            <input 
                type='name'
                placeholder='Name'
                name='name'
                id='name'
                value={name}
                onChange={onChange}
                required
                />
            </div>

        <div className="labelinputcontainer">
            <label htmlFor='perceivedEffort'>Perceived Effort:</label>
            <input 
                type='perceivedEffort'
                placeholder='perceivedEffort'
                name='perceivedEffort'
                id='perceivedEffort'
                value={perceivedEffort}
                onChange={onChange}
                required
                />
        </div>

        <div className="labelinputcontainer">
            <label htmlFor='description'>Description:</label>
            <textarea 
            rows='4'
            placeholder='Add a workout description'
            name='description'
            id='description'
            value={description}
            onChange={onChange}
            required
            />
        </div>
        
        <input type="submit" value="Add New Workout" className="buttoncolour"/>
    </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
    workout: state.workout,
    auth: state.auth
});

export default connect(mapStateToProps, { addWorkout, updateWorkout, clearCurrent })(WorkoutForum)