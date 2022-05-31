import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWorkout, updateWorkout, clearCurrent } from '../../actions/workoutActions';

const WorkoutForum = ({ addWorkout, updateWorkout, clearCurrent, auth: { user }, showTheForm, workout: { current, workouts } }) => {
    
    const isDateInThisWeek = (date) => {
        const todayObj = new Date();
        const monthNum = todayObj.getDate();
        const dayNum = todayObj.getDay();
      
        // get first date of week
        const firstDayOfWeek = new Date(todayObj.setDate(monthNum - dayNum));
      
        // get last date of week
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        // if date is equal or within the first and last dates of the week
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
    
    const [newWorkout, setNewWorkout] = useState({
        user: user._id,
        name: "Cycle",
        description: "",
        perceivedEffort: 1,
        newWeek: !isDateInThisWeek(new Date(workouts[workouts.length-1].date))
    });

    useEffect(() => {
        if (current !== null) {
            setNewWorkout(current);
        }
    }, [current]);

    const { name, description, perceivedEffort, newWeek } = newWorkout;

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
        <h2>{current ? "Update Workout" : "Add A New Workout"}</h2>

        <div className="labelinputcontainer">
            <label htmlFor='name'>Name:</label>
            {/*}
            <input 
                type='name'
                placeholder='Name'
                name='name'
                id='name'
                value={name}
                onChange={onChange}
                required
                />
  {*/}
                <select name='name' value={name} onChange={onChange}>
                    <option>Cycle</option>
                    <option>Run</option>
                    <option>Swim</option>
                </select>
            </div>

        <div className="labelinputcontainer">
            <label htmlFor='perceivedEffort'>Perceived Effort:</label>
            {/*}
            <input 
                type='perceivedEffort'
                placeholder='perceivedEffort'
                name='perceivedEffort'
                id='perceivedEffort'
                value={perceivedEffort}
                onChange={onChange}
                required
                />
{*/}
            <select name='perceivedEffort' value={perceivedEffort} onChange={onChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
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
        
        <input type="submit" value={current ? "Update Workout" : "Add New Workout"} className="buttoncolour"/>
    </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
    workout: state.workout,
    auth: state.auth
});

export default connect(mapStateToProps, { addWorkout, updateWorkout, clearCurrent })(WorkoutForum)