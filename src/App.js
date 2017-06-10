import React, { Component } from 'react';
import './App.css';

// styling
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
  backgroundColor : 'aliceblue'
}

const error_div_styling = {
  textAlign : 'center',
  display : 'flex',
  flex : 1,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor : 'red'
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

  //whithout initializing ; the first render will be failed
  state = {followers :0 ,avatar_url : '',public_repos : 0 , name : '-',text : '', status:200};

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
      req = await fetch('http://api.github.com/users/'+ username_to_fetch);
      console.log(req)
    }catch (e){
      console.log(e.message);
    }
    const status = await req.status
    const {followers,avatar_url,public_repos,name} = await req.json();
    this.setState({followers,avatar_url,public_repos,name,status})
  }

  render() {
    return (
      <div className="App" style={this.div_styling_Handler()}>
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
