import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css';
import jwt from 'jsonwebtoken'
import AddEventModule from './AddEventModule';
import UpcomingEventsModule from './UpcomingEventsPage';
import RegisteredEventsModule from './RegisteredEventsModule';

const EventPage = () => {

    const navigate = useNavigate()
    const [eventData,setEventData] = useState()
    const [regEventData,setRegEventData] = useState()
    const [flag,setFlag] = useState(false)
    const [regFlag,setRegFlag] = useState(false)
    const [adminFlag,setAdminFlag] = useState(false)

    useEffect(() => {
      showEvents()
      getRegEvents()
      const token = localStorage.getItem('token')
      if (token) {
        const user = jwt.decode(token)
        if(!user){
          localStorage.removeItem(token)
          navigate('/')
        }
        if(user.email=='admin@admin.com')
          setAdminFlag(true)
      }
    }, [])

    async function showEvents(event){
      const req = await fetch('http://localhost:1337/api/getEvents', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
		  const data = await req.json()
      if (data.status == 'ok') {
        setEventData(data)
        setFlag(true)
      } else {
        alert(data.error)
      }
    }
    
    async function getRegEvents(event){
      const req = await fetch('http://localhost:1337/api/getRegEvents', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
		  const data = await req.json()
      if (data.status == 'ok') {
        setRegEventData(data)
        setRegFlag(true)
      } else {
        alert(data.error)
      }
    }

    function logout(){
      localStorage.clear()
      navigate('/')
    }

    return (
        <div className="event-page">
            <div className="heading">
                <h1>Welcome to Rivera's Web Portal</h1>
                <button onClick={logout}>Logout</button>
            </div>
            {adminFlag && <AddEventModule />}
            {flag && <UpcomingEventsModule adminFlag={adminFlag} flag={flag} eventData={eventData}/>}
            {!adminFlag && <RegisteredEventsModule regFlag={regFlag} regEventData={regEventData} />}
        </div>
    );
}

export default EventPage;