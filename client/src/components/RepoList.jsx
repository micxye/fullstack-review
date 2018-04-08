import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Top Repos </h4>
    There are {props.repos.length} repos.
    <h5>Repo Name - Github URL - Size </h5>
    {props.repos.map((repo,index)=><Repo key ={index} repo={repo}/>)}
  </div>

)

const Repo = (props) => (
  <div>
    {props.repo.user} - <a href={props.repo.url}>{props.repo.url}</a> - {props.repo.size}
  </div>
)




export default RepoList;