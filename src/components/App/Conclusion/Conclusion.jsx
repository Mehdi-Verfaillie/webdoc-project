import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Conclusion.scss';


class Conclusion extends Component {

    render() {
        return (
            <div>
                <span className="C letter">C</span>
                <span className="H letter">H</span>
                <span className="A letter">A</span>
                <span className="O letter">O</span>
                <span className="S letter">S</span>
                <div>
                    <div className="input-content">
                        <div className="typewriter">
                            <h1>What does the chaos theory means for you?</h1>
                        </div>
                        <input onBlur={() => { this.getAnswer(); }} className='input' type='text' placeholder="Word chosen" maxLength="15" />
                        <Link className="link-intro" to='/intro/1'> <button className="button" type="button">OK</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}


export default Conclusion;