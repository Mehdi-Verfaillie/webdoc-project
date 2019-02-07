import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Intro.scss';
import { getContent } from '../api'
import classNames from 'classnames'
import Waves from '../three/Waves'

class Intro extends Component {
  
	constructor (props) {
		super(props)
		this.myRef = React.createRef()
		this.state = {
				content: [],
				curr_sentence: this.props.intro_sentence1,
		};
	}
	continue = () => {
			let count = this.props.count;
			let sentence;
			if (this.props.count <= 2) {
					count++
					switch (this.props.count) {
							case 0:
									this.props.set_count(count);
									sentence = this.props.intro_sentence2;
									break;
							case 1:
									this.props.set_count(count);
									sentence = this.props.intro_sentence3;
									break;
							case 2:
									this.props.set_count(count);
									sentence = this.props.intro_sentence4;
									break;
							default:
									break;
					}
					this.setState({
							curr_sentence: sentence,
					})
			}
	}
	async componentDidMount () {
		const content = await getContent('intro')
		this.setState({ content })
	}

	render () {
		const { match: { params: { page } }, history } = this.props
		const { content } = this.state

		const index = parseInt(page) - 1
		
		return (
			<div className="intro-main" onClick={() => history.replace(`/intro/${index+2}`)}>
					<Waves className='intro-three' />
					<div className={classNames('intro-main-container', { 'last': page === '4' })}>
						<p className="intro-main-container-text">{content[index]}</p>
					</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
    }
}

/**
 * Used to update the initstate values on redux
 */
const mapDispatchToProps = (dispatch) => {
    return {
        set_count: (count) => { dispatch({type: 'SET_COUNT', value: count}) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);