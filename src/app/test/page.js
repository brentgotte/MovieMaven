'use client'
import React, { useEffect } from 'react'
import getUsers from '../../lib/getUsers'

export const page = () => {

    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUsers();
                setUsers(userData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!users) {
        return <p>No users</p>;
    }

  return (
    <div>
        <h1>Users</h1>
        <ul>
            {users.map((user) => (
            <li key={user.id}>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default page