import React, { Component } from 'react';
import './Home.scss';
import Butterfly from '../scripts/Butterfly';
import { connect } from 'react-redux';

class Home extends Component {

	state = {
		showWarning: false
	}

	render() {
		const { impactCompleted, chaosCompleted, chanceCompleted, conclusionCompleted } = this.props
		const { showWarning } = this.state

		return (
			<div className="home-main-container">
				<h1 className="home-main-title">ENIGMA OF <span className="home-main-title-red">{this.props.answer}</span></h1>
				<Butterfly
					className='home-main-butterfly'
					impactCompleted={impactCompleted}
					chaosCompleted={chaosCompleted}
					chanceCompleted={chanceCompleted}
					showWarning={() => this.setState({ showWarning: true })}
				/>
				{(showWarning && !(impactCompleted && chaosCompleted && chanceCompleted)) && (
					<div className="home-main-text">You must learn other paths to understand this one.</div>
				)}
				{conclusionCompleted && (
					<div className="home-main-text">Thank you for participating to this experience!</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		answer: state.answer,
		impactCompleted: state.impactCompleted,
		chaosCompleted: state.chaosCompleted,
		chanceCompleted: state.chanceCompleted,
		conclusionCompleted: state.conclusionCompleted,
	}
}

export default connect(mapStateToProps)(Home)