import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(0);
  const [isloading, setisloading] = useState(false);
  const[error,seterror] = useState({show : false, msg : ""});

  const searchGithubUser = async(user)=>{
    toggleError()
    setisloading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch(err=>console.log(err));
    if(response)
    {
      setGithubUser(response.data);
      const{login,followers_url} = response.data;
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response=>setRepos(response.data))
      axios(`${followers_url}?per_page=100`).then(response=>setFollowers(response.data))

    }
    else{
      toggleError(true,'No User Found!');
    }
    checkRequests();
    setisloading(false);
  }


  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining},
        } = data;
        
        setRequests(remaining);
       
        if (remaining === 0) {
          toggleError(true,'Out Of Requests,Try Again Later!')
        }
      })
      .catch((err) => console.log(err));
  };
  function toggleError(show = false ,msg = ''){
    seterror({show,msg});
  }
  useEffect(checkRequests, []);
  

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests,error,searchGithubUser,isloading }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };