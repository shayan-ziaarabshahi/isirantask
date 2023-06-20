import axiosDefaultInstance from 'axiosApi/defaultInstance';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUsersAction } from 'redux/slices/usersSlice';


function Get() {

    const dispatch = useDispatch();
    
    /* get users */
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axiosDefaultInstance({
                    method: "GET",
                    url: "/users",
                });
                dispatch(setUsersAction({ users: res.data }))
            } catch (err) {
                console.log(err);
            }
        };
        getUsers()
    }, [dispatch]);

    return (
        <></>
    )
}

export default Get