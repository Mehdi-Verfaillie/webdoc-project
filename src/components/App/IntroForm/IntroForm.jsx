import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './IntroForm.scss';


class IntroForm extends Component {
    render() {
        return(
            <div className='flex flex-column items-center justify-center h100'>
                <h2>what does chaos theory mean to you ?</h2>
                <div className='flex flex-column'>
                    <input className='input' type='text' placeholder="Word chosen" required/>
                    <Link to='/intro' className='button'>OK</Link>
                </div>
            </div>
        );
    }
}

export default IntroForm;