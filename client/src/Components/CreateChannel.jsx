import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "./";
import { Close, CoPresent, Timer3 } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";

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
      <p className="text-primaryDark font-medium  m-1 p-1">Add Members</p>
    </div>
  );
};


const CreateChannel = ({ CreateType, setIsCreating }) => {
  const [ChannelName, setChannelName] = useState("");
  const {client,setActiveChannel}=useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])  




  const createChannel= async(e)=>{
    e.preventDefault();
    try{
      const newChannel=await client.channel(CreateType,ChannelName,{
        name:ChannelName,members:selectedUsers
      })
      await newChannel.watch();
      setChannelName("")
      setIsCreating(false)
      setSelectedUsers([client.userID])
      setActiveChannel(newChannel);
    }
    catch(error){
      console.log(error)
    }

  }
  return (
    <div className="w-[95%] m-auto h-[99%]   shadow-md rounded  ">
      <div className="w-full bg-primary rounded text-secondary py-2 px-1  flex justify-between">
        <p>
          {CreateType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <div
          onClick={() => {
            if (setIsCreating) setIsCreating(false);
          }}
          className="hover:bg-white rounded"
        >
          <Close />
        </div>
      </div>
      {CreateType === "team" && (
        <ChannelNameInput
          ChannelName={ChannelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} />
      <div className="w-fit mx-auto">
        <button className="hover:bg-secondary hover:text-primary   border-1 border-secondary rounded px-2 py-4 bg-primary text-secondary" onClick={createChannel}>{CreateType==='team'?"Create Channel":"Create Message group"}</button>
      </div>
    </div>
  );
};
export default CreateChannel;
