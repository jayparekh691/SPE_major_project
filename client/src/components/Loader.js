import Spinner from 'react-bootstrap/Spinner';
import {Container} from "react-bootstrap";

export default function Loader(){
    return(
        <div className='loader-container'>
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    )
}

