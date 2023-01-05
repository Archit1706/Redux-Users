import { useDispatch } from 'react-redux';
import { storeData } from '../actions/data';
import Card from './Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

function Loader() {
    const dispatch = useDispatch();
    const [dataFetched, setDataFetfched] = useState(false);

    

    useEffect(() => {
        const handleDataFetch = () => {
            axios.get('https://reqres.in/api/users')
                .then(response => {
                    // Dispatch the action to store the data in the redux store
                    dispatch(storeData(response.data.data));
                });
            setTimeout(() => {
                setDataFetfched(true);
            }, 2000);
        }
        handleDataFetch();
    }, [dispatch]);

    // ...
    return (
        <div className='relative'>
            {!dataFetched && (
                <div className='flex flex-col relative justify-ceneter items-center pt-[20%]'>
                    <h2
                        className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    >
                        Data is being fetched
                    </h2>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#c084fc', '#db2777', '#c084fc', '#db2777', '#c084fc']}
                    />
                </div>
            )}
            {dataFetched && (<div className="flex justify-center items-center absolute m-auto w-full h-screen"><Card /></div>)}

        </div>
    )
}

export default Loader;