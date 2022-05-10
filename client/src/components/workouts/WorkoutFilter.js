import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterWorkouts, clearFilter } from '../../actions/workoutActions';

const WorkoutFilter = ({ filterWorkouts, clearFilter }) => {
    const text = useRef('');

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterWorkouts(e.target.value);
        } else {
            clearFilter();
        }
    }


  return (
    <form>
        <input ref={text} type="text" placeholder='Filter Workouts...' onChange={onChange} />
    </form>
  )
}

WorkoutFilter.propTypes = {
    workout: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    workout: state.workout
});

export default connect(mapStateToProps, { filterWorkouts, clearFilter })(WorkoutFilter)