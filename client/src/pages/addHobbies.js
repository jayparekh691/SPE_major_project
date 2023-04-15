import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Navbar from "../components/navbar";

export default function AddHobbies() {
    const [hobbies, setHobbies] = useState([])
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const userID = useGetUserID()

    useEffect(() => {
        const fetchHobbies = async () => {
            try {
                const response = await axios.get('http://localhost:3001/hobbies')
                setHobbies(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        const fetchSelectedHobbies = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3001/hobbies/interestedHobbies/' + userID
                )
                console.log(response.data.hobbies)
                setSelectedHobbies(response.data.hobbies)
            } catch (error) {
                console.log(error)
            }
        }
        fetchHobbies()
        fetchSelectedHobbies()
    }, [])

    const selectHobby = async (hobbyID) => {
        try {
            const response = await axios.put('http://localhost:3001/hobbies', {
                hobbyID,
                userID,
            })
            alert('Hobby added')
            // setSelectedHobbies(response.data.hobbies)
            console.log(response.data.hobbies)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    var key = "_id";
    const isAdded = (id)=> {
        let present = false;
        selectedHobbies.forEach(element=>{
            if(element[key]===id)
                present = true;
        })
        return present;
    }


    return (
        <div>
            <h1>Hobbies</h1>
            <ul>
                {hobbies.map((h) => (
                    <li key={h._id}>
                        <div>
                            <h2>{h.hobbyName}</h2>
                            <button
                                onClick={() => selectHobby(h._id)}
                                disabled={isAdded(h._id)}
                            >
                                Add
                            </button>
                            <br />
                            <br />
                        </div>
                        <div className="hobbyDescription">
                            <h4>Hobby Description : {h.hobbyDescription}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
