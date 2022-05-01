import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Header = ({ auth: { isAuthenticated }, logout }) => {
  const logoutUser = () => {
    logout();
  }

  return (
    <div className='header'>
        <div className='headercontainer'>
            <h1>Training Tracker</h1>
              {
                !isAuthenticated ? 
                <ul>
                <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li> </ul>: 
              <ul><li onClick={logoutUser}>Logout</li></ul>
              }
        </div>
    </div>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header)