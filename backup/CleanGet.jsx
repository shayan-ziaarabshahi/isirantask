import axiosDefaultInstance from 'axiosApi/defaultInstance';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUsersAction } from 'redux/slices/usersSlice';
import useApi from 'axiosApi/useApi';
import getUsersApi from "./../api/getUsers"


function Get() {
    const dispatch = useDispatch();
    const getUsers = useApi(getUsersApi.getUsers);
    if ()
    console.log(getUsers.error)
    console.log(getUsers.data)
    
    /* get users */
    useEffect(() => {
        getUsers.request()
    }, []);

    return (
        <></>
    )
}

export default Get