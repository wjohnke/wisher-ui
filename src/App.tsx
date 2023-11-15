import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from "./components/Welcome/Welcome";
import loadScript, {loadLink} from "./utils/loadScript";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link, useNavigate, redirect,
} from "react-router-dom";
import Groups from "./components/Groups/Groups";
import WishList from "./components/WishList/WishList";
import {Group} from "./types/Group";

function App() {
  const colorOptions = [
    '#FF5757',
    '#FFB557',
    '#D64989',

    '#6748AF',
    '#4860AD',
    '#35969B',
    '#3FBA6C',
    '#A1E84E',
    '#F2FC55',
    '#AF943E',
    '#AF603E',
    '#635C7B',
    'lightblue',
  ]

  const [color, setColor] = useState('lightblue');
  const [user, setUser] = useState('');
  const [group, setGroup] = useState<Group | undefined>(undefined);

  const router = createBrowserRouter([
    {
      path: "/Welcome",
      element: (
        <Welcome captureUser={(userData) => {
          setUser(userData);
        }}/>
      ),
    }, {
      path: "/Groups",
      element: (
        <Groups user={user} captureGroup={(groupData) => {
          setGroup(groupData);
        }}/>
      ),
    }, {
      path: "/WishList",
      element: (
        <WishList
          group={group}
          user={user}
        />
      ),
    },
  ])

  useEffect(() => {
    loadLink('https://fonts.googleapis.com/css2?family=Lexend+Deca', 'stylesheet')
    setColor(colorOptions[Math.floor(Math.random() * colorOptions.length)])
  }, [])

  console.log(user);
  return (
    <div className="App" style={{backgroundColor: color}}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
