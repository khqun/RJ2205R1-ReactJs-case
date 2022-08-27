import { combineReducers } from 'redux';
import quizReducers from './quizReducer';
import accountReducer from './registerComponent';
const rootReducers = combineReducers({
    register: accountReducer,
    quiz: quizReducers
})
export default rootReducers