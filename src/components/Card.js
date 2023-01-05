import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';


function Card() {
    const data = useSelector(state => state.data);
    const [selectedUser, setSelectedUser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setUser(true);
        }, 1500);
    }, [user]);

    const handleButtonClick = (userId) => {
        console.log(userId);
        axios.get(`https://reqres.in/api/users/${userId}`)
            .then(response => {
                setSelectedUser(response.data.data);
                console.log(response.data.data)
            });
        setUser(null);
    }

    return (
        <div className='flex flex-col text-center'>
            <div>
                {selectedUser && (
                    <div className='flex flex-col bg-gradient-to-r h-24 text-center justify-center from-purple-400 to-pink-600 text-black rounded-xl'>
                        {!user &&
                            <div className='flex flex-col relative justify-ceneter items-center'>
                                <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={[]}
                                />
                            </div>
                        }
                        {user && <div>
                            <h1 className='font-semibold text-2xl'>{selectedUser.first_name} {selectedUser.last_name}</h1>
                            <h2>{selectedUser.email}</h2>
                        </div>}
                    </div>
                )}
            </div>
            <div className='flex flex-row flex-wrap gap-8 justify-center pt-6'>
                {data.map(user => (
                    <button key={user.id} className='p-4 rounded-md font-bold bg-blue-300 text-indigo-600 hover:text-black hover:scale-105 hover:ring-2 hover:ring-indigo-700' onClick={() => handleButtonClick(user.id)}>{user.id}</button>
                ))}
            </div>

            {!selectedUser && (
                <h3 className="font-bold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                >Select a button to view a user</h3>
            )}
        </div>
    );
}

export default Card;