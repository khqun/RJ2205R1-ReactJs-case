import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginSuccess } from "../../redux/actions/login-act/logActions";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
export default function QuizList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state => state.quiz);
    const [quizList, setQuizList] = useState([]);
    const [isQuizList, setIsQuizList] = useState(false);
    const handleClick = (id) => {
        navigate(`/menu/${id}`)
    }
    const renderHistory = () => {
        return (
            selector.historyExam.map((exam) => {
                return (
                    <tr key={exam.historyId}>
                        <td>{exam.historyId}</td>
                        <td>{exam.examId}</td>
                        <td>{exam.examScore}</td>
                        <td><Link to={`/history/${exam.historyId}/${exam.examId}`}>Details</Link></td>
                    </tr>

                )
            })
        )
    }
    const renderQuiz = () => {
        return quizList.map((quiz) => {
            return (
                <div className="card col-lg-4 col-sm-8" key={quiz.id}>
                    <div className="card-header bg-primary card-caption">
                        Quiz number: {quiz.id}
                    </div>
                    <div className="card-body">
                        <h6 className="card-title">Subject: {quiz.subject}</h6>
                        <h6 className="card-text">Questions: {quiz.question.length}</h6>
                        <h6 className="card-text">Time: {quiz.time}</h6>
                        <button className="btn btn-outline-secondary" onClick={() => {
                            handleClick(quiz.id);
                        }}>Do quiz</button>
                    </div>
                </div>
            )
        })
    }
    useEffect(() => {
        dispatch(loginSuccess(false));
        axios.get('http://localhost:9001/api/quiz-list')
            .then((res) => {
                setQuizList(res.data);
                setIsQuizList(true)
            })
            .catch((err) => {
                throw err
            }).finally(() => {
            })
    }, [dispatch, quizList])
    return (
        <div>

            <nav className="navbar navbar-expand-lg nav-bg">
                <div className="container-fluid ">
                    <h4 className="navbar-brand" >Quizzix</h4>
                    
                </div>
            </nav>
            <div className="container">

                <div className="row">
                    <div className="banner text-center pt-2">
                        <h2>List of quiz</h2>
                    </div>
                    <div className="quiz-menu col-lg-8 col-md-10 col-sm-12" >
                        {quizList ? renderQuiz() : null}
                        {isQuizList ? null : <div className="divLoader">
                            <svg className="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
                                <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
                            </svg>
                        </div>}
                    </div>
                    <div className="history col-lg-4 col-md-6 col-sm-12 mt-5">
                        <h3 className="text-center">Your history</h3>
                        <table className="history-table table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Quiz number</th>
                                    <th>Score</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selector.historyExam ? renderHistory() : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}