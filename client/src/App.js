import { Provider } from 'react-redux';
import store from './store'; 

const App = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <h1>Hello From React</h1>
    </div>
    </Provider>
  );
}

export default App;
