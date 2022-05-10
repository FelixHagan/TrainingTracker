import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWorkouts } from '../../actions/workoutActions';
import { loadUser } from '../../actions/authActions';
import WorkoutItem from './WorkoutItem';
import WorkoutForm from './WorkoutForm';
import WorkoutFilter from './WorkoutFilter';

const Workouts = ({ workout: { workouts, loading, filtered }, getWorkouts, loadUser }) => {
    useEffect(() => {
        loadUser();
        getWorkouts();
    }, []);

    const [showForm, setShowForm] = useState(false);

    const showTheForm = () => {
        setShowForm(!showForm);
    }

    if (loading || workouts === null) {
        return <p>Loading...</p>
    }
    /*
   const [theWorkouts, setTheWorkouts] = useState([{
       id: 12,
       user: 1,
       name: "Bob",
       description: "Run",
       percievedEffort: 4,
       date: "4/03/2022"
   }]);
*/
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
                    (workouts.map(workout => <WorkoutItem eachWorkout={workout} key={workout._id}/>)))
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