import { useState } from 'react'
import './App.css';

const AddEventModule = () => {

    const [name, setName] = useState('')
	const [date, setDate] = useState()
    const [startTime,setStartTime] = useState()
    const [endTime,setEndTime] = useState()

    async function addEvent(event) {
        event.preventDefault()
        if(startTime>endTime){
          alert('Enter correct timings')
          return
        }
        const req = await fetch('http://localhost:1337/api/addEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({
            name: name,
            date: date,
            startTime: startTime,
            endTime: endTime
          }),
        })
        const data = await req.json()
        if (data.status == 'ok') {
          window.location.reload()
        } else {
          alert(data.error)
        }
      }

    return (

        <div className="add-event">
              <form onSubmit={addEvent}>
          <h3>Add Event</h3>
          <div className="mb-3">
            <label>Event name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Event name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Event Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Timings</label>
            <div className="timings" style={{display: "table"}}>
            <input
              type="time"
              className="form-control"
              style={{display: "table-cell", width: "50%"}}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="time"
              className="form-control"
              
              style={{width: "50%"}}
              style={{display: "table-cell", width: "50%"}}
              onChange={(e) => setEndTime(e.target.value)}
            />
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
          </div>
        </form>
              </div>

    );
}

export default AddEventModule;