import { createStore } from 'redux';
import reducer from './reducer.jsx';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
