import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';

const Register = ({ registerUser }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            alert('The passwords do not match');
        } else {
            await registerUser({
                name,
                email,
                password,
                password2
            });
            await setUser({
                name: "",
                email: "",
                password: "",
                password2: ""
            });
            await navigate('/');
        }
    }

  return (
    <div className="formcontainer">
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            
            <div className="labelinputcontainer">
            <label htmlFor='name'>Name:</label>
            <input 
                type='text'
                placeholder='Name'
                name='name'
                id='name'
                value={name}
                onChange={onChange}
                required
                />
            </div>
    
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
    
            <div className="labelinputcontainer">
            <label htmlFor='password2'>Confirm Password:</label>
            <input 
                type='password'
                placeholder='Confirm Password'
                name='password2'
                id='password2'
                value={password2}
                onChange={onChange}
                required
                minLength="6"
                />
            </div>

            <input type="submit" value="Register" className="buttoncolour button"/>
        </form>
    </div>
  )
}

Register.protoTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register)