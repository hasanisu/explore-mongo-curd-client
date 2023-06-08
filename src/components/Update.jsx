import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser)
    const handleToUpdateUser =event=>{
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        if(data.modifiedCount > 0){
            alert('user updated')
            
        }
        })
        
    };

    const handleToChange=event=>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <h2>Please update the user: {storedUser.name}</h2>
            <form onSubmit={handleToUpdateUser}>
                <input onBlur={handleToChange} type="text" defaultValue={storedUser.name} name="name" placeholder='name' />
                <br />
                <input onBlur={handleToChange} type="address" defaultValue={storedUser.address} name="address" placeholder='address' />
                <br />
                <input onBlur={handleToChange} type="email" defaultValue={storedUser.email} name="email" placeholder='email' />
                <br />
                <button type="submit">Update User</button>
                
            </form>
        </div>
    );
};

export default Update;