import { Provider } from 'react-redux';
import store from './store'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Workouts from './components/workouts/Workouts';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <>
        <Header/>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Workouts />} />
          </Route>    
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
        </Routes>
      </>
      </Router>
    </Provider>
  );
}

export default App;
