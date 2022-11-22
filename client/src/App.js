import "./App.css";
import 'stream-chat-react/dist/css/index.css'
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannelContainer, Auth } from "./Components";
import { useState } from "react";

const apiKey = "tz2f5ube8xjy";

const cookies=new Cookies();
const AuthToken = cookies.get("token");
const client=StreamChat.getInstance(apiKey)

if(AuthToken){
  client.connectUser({
    id:cookies.get('userID'),
    name:cookies.get('username'),
    fullName:cookies.get('fullName'),
    phoneNumber:cookies.get('phoneNumber'),
    image:cookies.get('avatarURL'),
    hashedPassword:cookies.get("hashedPassword")
    },AuthToken
  )
}

function App() {
  const [CreateType,setCreateType]=useState('');
  const [isCreating,setIsCreating]=useState(false);
  const [isEditing,setIsEditing]=useState(false);

  return !AuthToken ? (
    <Auth />
  ) 
  : (
    <div className="App flex  bg-white h-full">
      <Chat client={client}>
        <ChannelListContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
         />
        <ChannelContainer
               isCreating={isCreating}
               setIsCreating={setIsCreating}
               isEditing={isEditing}
               setIsEditing={setIsEditing}
               CreateType={CreateType}
        />
      </Chat>
    </div>
  );
}

export default App;
