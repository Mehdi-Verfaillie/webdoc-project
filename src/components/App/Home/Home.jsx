import React, { Component } from 'react';
import './Home.scss';
import Butterfly from '../three/Butterfly';
import { connect } from 'react-redux';

class Home extends Component {

	render() {
		return (
			<div className="home-main-container">
				<h1 className="home-main-title">ENIGMA OF <span className="home-main-title-red">{this.props.answer}</span></h1>
				<Butterfly className='home-main-butterfly' />
				<div className="home-main-text">You must learn other paths to understand this one.</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		answer: state.answer,
	}
}

export default connect(mapStateToProps)(Home)