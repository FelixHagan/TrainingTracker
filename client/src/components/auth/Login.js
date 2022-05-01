import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';

const Login = ({ loginUser }) => {
    const navigate = useNavigate();

    const [theUser, setTheUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = theUser;

    // runs when the user types in the form
    const onChange = e => setTheUser({ ...theUser, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert('Please fill in all fields');
        } else {
            await loginUser({
                email,
                password
            });
            await setTheUser({
                email: "",
                password: ""
            });
            await navigate('/');
        }
    }

  return (
    <div className="formcontainer">
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            
            <div className="labelinputcontainer">
            <label htmlFor='email'>Email:</label>
            <input 
                type='email'
                placeholder='Email'
                name='email'
                id='email'
                value={email}
                onChange={onChange}
                required
                />
            </div>

            <div className="labelinputcontainer">
            <label htmlFor='password'>Password:</label>
            <input 
                type='password'
                placeholder='Password'
                name='password'
                id='password'
                value={password}
                onChange={onChange}
                required
                minLength="6"
                />
            </div>

            <input type="submit" value="Login" className="buttoncolour button"/>
        </form>
    </div>
  )
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login)