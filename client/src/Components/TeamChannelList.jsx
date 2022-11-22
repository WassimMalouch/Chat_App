import React from 'react';
import { Add } from '@mui/icons-material';

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if(error) {
        return type === 'team' ? (
            <div className="">
                <p className="">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    if(loading) {
        return (
            <div className="">
                <p className="">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }

    return (
        <div className="bg-secondary p-2 ">
            <div className=" flex justify-between p-1 gap-2 mb-1 rounded bg-primary">
                <p className="text-secondary text-bold ">
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <Add className='hover:cursor-pointer rounded hover:bg-white' style={{color:"rgba(83,185,205)"}} onClick={()=>{
                   setCreateType(type);
                    setIsCreating(!isCreating)
                    setIsEditing(false)
                    if(setToggleContainer) 
                    setToggleContainer((prevState)=> !prevState)
                }}>add</Add>
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList