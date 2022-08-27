import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { getAnswerId } from "../../redux/actions/quiz-act/quizAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
export default function Score() {
    const arrow = <FontAwesomeIcon icon={faArrowRightToBracket} />
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const selector = useSelector(state => state.quiz);
    const handleClick = () => {
        dispatch(getAnswerId(Number(params.quizId)));
        navigate('/menu')
        console.log(selector);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg nav-bg">
                <div className="container-fluid ">
                    <h4 className="navbar-brand" >Quizzix</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <div className="card w-75 score-box">
                <div className="card-body text-center">
                    <h5 className="card-title">Your score is: </h5>
                    <p className="mark">{selector.score}</p>
                    <p className="card-text"> <button onClick={() => handleClick()} className="to-menu-button">Click here to submit your test  {arrow}</button></p>
                </div>
            </div>
        </div>

    )
}