import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getTop25.bind(this);
  }

  componentDidMount() {
    this.getTop25();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify({"user": term}),
      contentType: "application/json",
      success: function() {
        console.log('success!')

      },
      error: function() {
        console.log('error')
      }
    })
  }

  getTop25 () {
    console.log('got top 25!')
    $.ajax({
      type: "GET",
      url: "/repos",
      success: (data) => {
        console.log('success!')
        this.setState({repos: data});
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));