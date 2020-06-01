import React from 'react';
// import ClipLoader from 'react-spinners/ClipLoader';
// eslint-disable-next-line
import Post from '../Card/Post';
// eslint-disable-next-line
import Card from 'react-bootstrap/Card';
// eslint-disable-next-line
import CardColumns from 'react-bootstrap/CardColumns';
import {connect} from 'react-redux';

class Display extends React.Component{
    render(){
        const array = this.props.articles;
        if(this.props.loading)
            return <div></div>;
        else{
        return(     
            <CardColumns align="center"> 
            {array.map((post,idx) => (
                <Post key={idx}  title={post.title} imageurl={post.urlToImage} description={post.description} url={post.url} />
            ))}
            </CardColumns>
            )
        }
    }
}
const mapStateToProps=state=>{
    return{
      loading: state.loading ,
    };
  }
export default connect(mapStateToProps,)(Display);
