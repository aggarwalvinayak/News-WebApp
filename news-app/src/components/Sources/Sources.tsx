import React, { Component } from 'react';
import DisplaySources from './DisplaySources';
import {connect} from 'react-redux';
import Head from '../Header/head'
import ClipLoader from 'react-spinners/ClipLoader';
import {StateTypes} from '../Redux/Reducers'
import { NewsPost } from '../Card/Post';
import './Sources.css'
import * as actiontypes from '../Redux/Actions';

interface Cookie{
	get: Function,
	set: Function
}

interface SourcesProps{
	country: string;
	cookies: Cookie;
	setCountry: Function;
}

interface State{
	isLoading: boolean
	sources: Array<NewsPost>
	newsEnd: boolean
}

interface OwnProps{
	cookies: Cookie
}

class Sources extends Component<SourcesProps>{
	public state: State

	constructor(props: SourcesProps){
		super(props);
		this.state={
			isLoading: true,
			sources: [],
			newsEnd: false
		}
		this.fetchSources=this.fetchSources.bind(this);
	}

	//Utility Function To Fetch Sources and Set the Database
	fetchSources(country=this.props.country){
		const url: string=`https://amazekart.tech/news/?source=${country}`
		fetch(url)
		.then((response:{json: Function})=>response.json())
		.then((result:{sources: Array<NewsPost>})=>result.sources)
		.then((sources: Object)=> {
			this.setState({sources: sources});
			this.setState({isLoading: false});
			this.setState({newsEnd: true});
		})
		.catch(error=>{
			console.log(error);
			this.setState({isLoading: false});
			this.setState({newsEnd: true});
		})
	}

	//Set Country If not set and Fetch Sources
	componentDidMount(){
		if(!this.props.country){this.props.setCountry('in')}
		this.fetchSources();
	}

	shouldComponentUpdate(nextProps: any) {
		if( this.props.country !== nextProps.country)
		{   
			this.setState({isLoading: true})
			this.setState({sources: []})
			this.fetchSources(nextProps.country)
		}
		return true ;
	}

	render(){
		return(
			<div >
				<div className='headerSource'>
					<Head cookies={this.props.cookies}/>
				</div>
				<div className='contentSource' data-align='center'>
					<DisplaySources loading={this.state.isLoading} array={this.state.sources} />
					<div className='loading'>
						<ClipLoader color={"#123abc"} size={50} loading={this.state.isLoading}/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps=(state: StateTypes, ownProps: OwnProps)=>{
	return{
		country: state.country,
		cookies: ownProps.cookies
	};
}

const mapDispatchToProps=(dispatch: any)=>{
	return{
		setCountry: (val: string)=>dispatch(actiontypes.setCountry(val)),
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Sources);