import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css';
import jwt from 'jsonwebtoken'

const UpcomingEventsModule = ({adminFlag, flag, eventData}) => {

    async function regEvent(id){
        console.log(id,'IIDDD')
        const req = await fetch('http://localhost:1337/api/regEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({
            id: id,
            name: 'XXX'
          }),
      })
        const data = await req.json()
        console.log(data)
        if (data.status == 'ok') {
          window.location.reload()
        } else {
          alert(data.error)
        }
        return
      }

      async function delEvent(id){
        const req = await fetch('http://localhost:1337/api/delEvent', {
          method: 'POST',
          headers: {
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
                <h3>Upcoming Events</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Event Name</th>
                        <th>Capacity</th>
                        <th>Date of Event</th>
                        <th>Timing</th>
                        <th>Location</th>
                    </tr>
                    {flag && eventData.events.map((item)=>{
            return <tr>
                <td>{item.name}</td>
                <td>{item.capacity}</td>
                <td>{item.date}</td>
                <td>{item.startTime}-{item.endTime}</td>
                <td>SJT</td>
                {
                  adminFlag && <td><button onClick={()=>delEvent(item._id)}>X</button></td>
                  ||
                  !adminFlag && <td><button onClick={()=>{console.log(item._id); regEvent(item._id)}}>Register</button></td>
                }
              </tr>
          })}
                    </tbody>
                </table>
            </div>

    );
}

export default UpcomingEventsModule