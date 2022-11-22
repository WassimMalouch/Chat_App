
import { Edit } from "@mui/icons-material";
import {Channel,useChatContext,MessageSimple } from "stream-chat-react"

import {ChannelInner,CreateChannel,EditChannel,TeamMessage} from './';


const ChannelContainer=({isCreating,setIsCreating,isEditing,setIsEditing,CreateType})=> {
    const {channel}=useChatContext();

    if(isCreating){
        return(
            <div className="w-full h-full">
                <CreateChannel CreateType={CreateType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing){
        return(
            <div className="w-full">
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        )
    }

    const EmptyState =()=>{
        <div>
            <p>this is the beginning of your chat history</p>
            <p>Send messages,attachments,links,emojis, and more !</p>
        </div>
    }


   
    return (
        <div className="w-full h-[100%] p-0">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => 
                <MessageSimple key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );

}
export default ChannelContainer;