import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWorkouts } from '../../actions/workoutActions';
import { loadUser } from '../../actions/authActions';
import WorkoutItem from './WorkoutItem';

const Workouts = ({ workout: { workouts, loading }, getWorkouts, loadUser }) => {
    useEffect(() => {
        loadUser();
    }, []);

    /*
    useEffect(() => {
        getWorkouts();
    }, [])


    if (loading || workouts === null) {
        return <p>Loading...</p>
    }
    */
   const [theWorkouts, setTheWorkouts] = useState([{
       id: 12,
       user: 1,
       name: "Bob",
       description: "Run",
       percievedEffort: 4,
       date: "4/03/2022"
   }]);

  return (
      <div className='mainsection'>
        <div className='mainsectioncontainer'>
            {theWorkouts.length === 0 ? <p>No workouts to show</p> :
                (theWorkouts.map(workout => <WorkoutItem workout={workout} key={workout.id} />))
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