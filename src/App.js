import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const img_styling = {
  borderTopLeftRadius: '50% 50%',
  borderTopRightRadius: '50% 50%',
  borderBottomRightRadius: '50% 50%',
  borderBottomLeftRadius: '50% 50%',
}

const div_styling = {
  textAlign : 'center',
  display : 'flex',
  flex : 1,
  flexDirection: 'column',
  justifyContent: 'center',
}

const inner_div_styling ={
  padding : '50px'
}

const labels_div_styling ={
  textAlign : 'center',
  display : 'flex',
  flex : 1,
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap : 'wrap'
}

const label_styling = {
    fontSize : '20px',
    color : 'grey'
}


class App extends Component {

  state = {followers :0 ,avatar_url : '',public_repos : 0 , name : '-'};

  async componentDidMount(){
    const req = await fetch('http://api.github.com/users/dshabin');
    const {followers,avatar_url,public_repos,name} = await req.json();
    this.setState({followers,avatar_url,public_repos,name})
    console.log(this.state)
  }

  render() {
    return (
      <div className="App" style={div_styling}>
        <div>
          <img alt = "" style = {img_styling} src={this.state.avatar_url} />
        </div>

        <div style={labels_div_styling}>
             <div style={inner_div_styling}>
               <label style = {label_styling}>#Name</label>
               <p>{this.state.name}</p>
             </div>

             <div style={inner_div_styling}>
               <label style = {label_styling}>#Public repos</label>
               <p>{this.state.public_repos}</p>
             </div>

             <div style={inner_div_styling}>
               <label style = {label_styling}>#Followers</label>
               <p>{this.state.followers}</p>
             </div>
        </div>

      </div>
    );


  }
}

export default App;
