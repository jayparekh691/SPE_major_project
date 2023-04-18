import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Navbar from "../components/navbar";

export default function YourEvents() {
    const [events, setEvents] = useState([])
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const userID = useGetUserID()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/events/createdEvents/'+userID)
                console.log(response)
                setEvents(response.data)
            } catch (err) {
                console.log(err)
            }
        }


        fetchEvents()
    }, [])



    const deleteEvent=(id)=>{
        try{
            const response = axios.delete("http://localhost:3001/events/"+id);
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <h1>Your events</h1>
            <ul>
                {events.map((e) => (
                    <li key={e._id}>
                        <div>
                            <h2>{e.eventname}</h2>
                            <button onClick={()=>deleteEvent(e._id)}>Delete</button>
                            <br />
                            <br />
                        </div>
                        <div className="hobbyname">
                            <h4>Hobby Name : {e.hobbyname}</h4>
                        </div>
                        <div className="registrationDate">
                            <h4>Registration Date : {e.registrationDate}</h4>
                        </div>
                        <div className="location">
                            <h4>Location : {e.location}</h4>
                        </div>
                        <div className="district">
                            <h4>District : {e.district}</h4>
                        </div>
                        <div className="state">
                            <h4>State : {e.state}</h4>
                        </div>
                        <div className="eventDate">
                            <h4>Event Date : {e.eventDate}</h4>
                        </div>
                        <div className="minParticipation">
                            <h4>Min Participation required : {e.minParticipation}</h4>
                        </div>
                        <div className="currParticipation">
                            <h4>Current Participant Count : {e.participants.length}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}