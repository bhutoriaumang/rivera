import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css';
import jwt from 'jsonwebtoken'

const RegisteredEventsModule = ({regFlag, regEventData}) => {


    async function delRegEvent(id){
        const req = await fetch('http://localhost:1337/api/delRegEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({
            id: id,
          }),
      })
        const data = await req.json()
        if (data.status == 'ok') {
          window.location.reload();
        } else {
          alert(data.error)
        }
      }

    return (
        <div className="events">
              <h3>Registered Events</h3>
              <table>
                  <tbody>
                  <tr>
                      <th>Event Name</th>
                      <th>Capacity</th>
                      <th>Date of Event</th>
                      <th>Timing</th>
                      <th>Location</th>
                  </tr>
                  {regFlag && regEventData.events.map((item)=>{
          return <tr>
              <td>{item.name}</td>
              <td>{item.capacity}</td>
              <td>{item.date}</td>
              <td>{item.startTime}-{item.endTime}</td>
              <td>SJT</td>
            <td><button onClick={()=>{console.log(item._id); delRegEvent(item._id)}}>Unregister</button></td>
            </tr>
        })}
                  </tbody>
              </table>
          </div>
    );
}

export default RegisteredEventsModule