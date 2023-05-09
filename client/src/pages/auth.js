import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import { useGetUserID } from '../hooks/useGetUserID'
import Login from "./login";
import Register from "./register";


export default function Auth() {
    return (
        <div className="auth">
            <Login />
            {/*<Register />*/}
        </div>
    )
}