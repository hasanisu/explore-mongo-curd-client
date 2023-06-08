import React from 'react';
import { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({name: 'ali', email:'ali@gmail.com'})
    const handleToAddUser =event=>{
        event.preventDefault();
        console.log(user);
        
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                alert('User added successfully')
                event.target.reset();
            }
        })
    };

    const handleToBlur=event=>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <h3>Please add a new user</h3>
            <form onSubmit={handleToAddUser}>
                <input onBlur={handleToBlur} type="text" name="name" placeholder='name' />
                <br />
                <input onBlur={handleToBlur} type="address" name="address" placeholder='address' />
                <br />
                <input onBlur={handleToBlur} type="email" name="email" placeholder='email' />
                <br />
                <button type="submit">Submit</button>
                
            </form>
        </div>
    );
};

export default AddUser;