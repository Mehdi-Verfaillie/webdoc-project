import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './IntroForm.scss';


class IntroForm extends Component {
    render() {
        return(
<div>
    <span className="C letter">C</span>
    <span className="H letter">H</span>
    <span className="A letter">A</span>
    <span className="O letter">O</span>
    <span className="S letter">S</span>

    <div>
     <div className="typewriter">
       <h1>What does the chaos theory means for you?</h1>
     </div>

     <div className="input-content">
        <input className="input" type="text" placeholder="Word chosen" required />
            <Link className="link-intro" to='/intro'> <button className="button-response" type="button">OK</button></Link>
     </div>

    </div>
</div> 
        );
    }
}

export default IntroForm;