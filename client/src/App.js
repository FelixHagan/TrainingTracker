import { Provider } from 'react-redux';
import store from './store'; 
import Header from './components/layout/Header';
import Workouts from './components/workouts/Workouts';

const App = () => {
  return (
    <Provider store={store}>
      <>
        <Header/>
        <Workouts/>
      </>
    </Provider>
  );
}

export default App;
