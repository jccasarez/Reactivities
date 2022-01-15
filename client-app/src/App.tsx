import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';


//This looks like HTML, but it's JSX
//It gets converted to javascriopt
//HTML: Class name is class, in JSX: It's className="App"
//Anything in {} is javascriopt
//Styles are handled different. 
//In-Line: <p style='color: red'>
//JSX: Pass an object <p style={{color: 'red'}}>
function App() {
  const [activities, setActivities] = useState([]);

  //Fetch our activities from API server
  //Provide it with a function
  //pass in response
  //use setActivities and pass response data
  //if we useEffect like this, we are in danger of infinite loop
  //we update the state, which does a reRender, which calls the useEffect again
  //then sets the activites, and this causes a re-render
  //to preven that happening pass in an empty array of dependencies
  useEffect(() => {
    console.log('here')
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
        <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
