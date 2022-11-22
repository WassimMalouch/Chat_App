import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import {UserList} from './'
import { Avatar } from "stream-chat-react";
import { Close } from "@mui/icons-material";


const Create = {
    inputCreate: {
      width: "50%",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.2)",
      fontWeight: "bold",
      borderRadius: "8px",
      border: "1px solid rgba(1,12,39,1)",
      color: "rgba(1,12,39,1)",
    },
  };
  
const ChannelNameInput = ({ channelName, setChannelName }) => {

 
    const handleChange = (e) => {
      e.preventDefault();
      setChannelName(e.target.value);
    };
  
    return (
      <div className="w-full  bg-white flex flex-col justify-start items-center">
        <p className="text-primaryDark font-medium m-1 p-1">Name</p>
        <input
          style={Create.inputCreate}
          placeholder="channel_name (no spaces)"
          onChange={handleChange}
          value={channelName}
        ></input>
        <p className="text-primaryDark font-medium mt-2 m-1 p-1">Add Members</p>
      </div>
    );
  };

const EditChannel=({setIsEditing})=>{
    const {channel}=useChatContext();
    const [channelName,setChannelName]=useState(channel?.data?.name)
    const [selectedUsers,setSelectedUsers]=useState([])

    const updateChannel=async(e)=>{
      e.preventDefault()
      const nameChanged=channelName !== (channel.data.name ||channel.data.id)

      if(nameChanged)
        await channel.update({name:channelName},{text:`Channel name changed to ${channelName}`})

      if(selectedUsers.length){
        await channel.addMembers(selectedUsers);
        }
      setChannelName(null)
      setIsEditing(false)
      setSelectedUsers([]) 
    }
    return(
        <div className="w-[99%] mx-auto h-[99%] shadow-md rounded ">
            <div className=" w-full bg-primary rounded text-secondary py-2 px-1  flex justify-between">
                <p>Edit Channel</p>
                <div className="hover:bg-white rounded" onClick={()=>{setIsEditing(false)}}>
                <Close />
                </div>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="w-fit mx-auto">
        <button className="hover:bg-secondary hover:text-primary   border-1 border-secondary rounded px-2 py-4 bg-primary text-secondary" >Save Changes</button>
      </div>
        </div>
    )
}
export default EditChannel;