import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import error from './error.svg';
// styling
const img_styling = {
  borderTopLeftRadius: '50% 50%',
  borderTopRightRadius: '50% 50%',
  borderBottomRightRadius: '50% 50%',
  borderBottomLeftRadius: '50% 50%',
  maxWidth : '100%'
}

const div_styling = {
  textAlign : 'center',
  display : 'flex',
  flex : 1,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor : 'aliceblue',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  marginTop : '20px',
  marginLeft : '20px',
  marginRight : '20px',
  marginButton : '20px',
}

const error_div_styling = {
  textAlign : 'center',
  display : 'flex',
  flex : 1,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor : 'red',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  marginTop : '20px',
  marginLeft : '20px',
  marginRight : '20px',
  marginBottom : '20px',
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

const img_place_holder = logo

class App extends Component {

  //whithout initializing ; the first render will be failed
  state = {followers :0 ,avatar_url : img_place_holder ,public_repos : 0 , name : '-',text : '', status:200};

  changeHandler = (evn) => {
    this.setState({
      text: evn.target.value
    });
  }

  div_styling_Handler = () => {
    if (this.state.status === 200) {
      return div_styling
    }else{
      return error_div_styling
    }
  }



  async doFetch() {
    const username_to_fetch = this.state.text
    let req;
    try {
      req = await fetch('https://api.github.com/users/'+ username_to_fetch);
      console.log(req)
      const status = await req.status
      if (status === 200){
        const {followers,avatar_url,public_repos,name} = await req.json();
        this.setState({followers,avatar_url,public_repos,name,status})
      }else{
        const {followers,public_repos,name} = await req.json();
        this.setState({followers,public_repos,name,status,avatar_url : error })
      }
    }catch (e){
      console.log(e.message);
      this.setState({status : 400,avatar_url : error })
    }
  }

  render() {



    return (

      <div className="App" style={this.div_styling_Handler()}>
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
        <div>
        <input
          placeholder="Enter a username to fetch.."
          type="text"
          onChange={this.changeHandler}
        />
        <input
          type="button"
          value="fetch"
          onClick= {this.doFetch.bind(this)}
        />
        </div>
      </div>
    );
  }
}

export default App;
