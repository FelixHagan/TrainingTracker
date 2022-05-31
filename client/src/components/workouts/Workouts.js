import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWorkouts } from '../../actions/workoutActions';
import { loadUser } from '../../actions/authActions';
import WorkoutItem from './WorkoutItem';
import WorkoutForm from './WorkoutForm';
import WorkoutFilter from './WorkoutFilter';
import WorkoutWeek from './WorkoutWeek';

const Workouts = ({ workout: { workouts, loading, filtered }, getWorkouts, loadUser }) => {
    useEffect(() => {
        loadUser();
        getWorkouts();
    }, []);

    const [sortedWorkouts, setSortedWorkouts] = useState(null);

    useEffect(() => {
        if (workouts) {
            setSortedWorkouts(sortToWeeks(workouts));
        }
    }, [workouts]);

    const [showForm, setShowForm] = useState(false);

    // loop through the workouts and sort into weeks
    const sortToWeeks = (workouts) => {
        let weeks = [];
        let days = [];
        for (let loop = 0; loop < workouts.length; loop++) {
            if (loop === 0) {
                days[days.length] = workouts[loop];
            } else {
                if (workouts[loop].newWeek) {
                    weeks[weeks.length] = days;
                    days = [];
                    days[days.length] = workouts[loop];
                } else {
                    days[days.length] = workouts[loop];
                }
            }
        }
        if (days.length > 0) {
            weeks[weeks.length] = days;
        }
        return weeks;
    }

    const showTheForm = () => {
        setShowForm(!showForm);
    }

    if (loading || workouts === null) {
        return <p>Loading...</p>
    }

  return (
      <div className='mainsection'>
          <div className='mainsectioncontainer'>
            <div className='filterform'>
                <WorkoutFilter />
            </div>
          </div>
          
          
        <div className='addbutton'>
            {showForm ? <button onClick={showTheForm} style={{backgroundColor: "red"}}>x</button> : <button onClick={showTheForm}>+</button> }
            
        </div>
        <div className='mainsectioncontainer'>
           
            {showForm && <WorkoutForm showTheForm={showTheForm}/>}
            {filtered ? (filtered.map(workout => <WorkoutItem eachWorkout={workout} key={workout._id}/>)) : 
                (workouts.length === 0 ? <h1>No workouts to show</h1> :
                /*
                    (workouts.map((workout) => 
                    <Fragment key={workout._id}>    
                    {workout.newWeek && <WorkoutWeek /> }
  <WorkoutItem eachWorkout={workout} /></Fragment>))*/
                   (sortedWorkouts && sortedWorkouts.map((week, index) => 
                   <Fragment key={index}>
                    <WorkoutWeek numOfWorkouts={week.length} weeksWorkouts={week}/>
                    {week.map(eachWorkout =>  <WorkoutItem eachWorkout={eachWorkout} key={eachWorkout._id}/>)}
                   </Fragment>))
                )

            }
          
        </div>
    </div>
  )
}

Workouts.propTypes = {
    workout: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    workout: state.workout
});

export default connect(mapStateToProps, { getWorkouts, loadUser })(Workouts)