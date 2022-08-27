import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/loginComponents/loginComponent';
import QuizList from './components/quizComponents/quizListComp';
import DoQuiz from './components/quizComponents/doQuizComp';
import Score from './components/quizComponents/scoreComp';
import HistoryScore from './components/quizComponents/scoreHistoryComp';
import "bootstrap/dist/css/bootstrap.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/menu' element={<QuizList />} />
          <Route path='/menu/:quizId' element={<DoQuiz />} />
          <Route path='/score/:quizId' element={<Score />} />
          <Route path='/history/:historyId/:quizId' element={<HistoryScore />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
