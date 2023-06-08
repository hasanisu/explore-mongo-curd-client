import React, { useState } from 'react';
import {Link, useLoaderData} from 'react-router-dom';

const Home = () => {
    const users = useLoaderData()
    const [displayUser, setDisplayUser] = useState(users);
    
    const handleDelete = user =>{
        const agree = window.confirm(`are you sure you want to delete: ${user.name}`)
        if(agree){
            // console.log('deleting user id', user._id)
            fetch(`http://localhost:5000/users/${user._id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    alert('User deleted successfully');
                    const remainigUser = displayUser.filter(usr => usr._id !== user._id)
                    setDisplayUser(remainigUser);
                }
            });
        }

    }
    return (
        <div>
            <h2>users: {displayUser.length}</h2>
            <div>
                {
                    displayUser.map(user => <p key={user._id}>{user.name} {user.address} {user.email}
                    <Link to={`/update/${user._id}`}><button>Update</button></Link>
                    <button onClick={()=> handleDelete(user)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;