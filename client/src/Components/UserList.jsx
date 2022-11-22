import { useEffect,useState } from "react";
import {Avatar,useChatContext} from "stream-chat-react"
import { Done } from "@mui/icons-material";

const ListContainer=({children})=>{
return(
    <div>
         <div className="flex justify-between">
            <p>User</p>
            <p>Invite</p>
         </div>
         {children}
    </div>
)
}

const UserItem =({user,setSelectedUsers,selectedUsers})=>{
    const [selected,setSelected]=useState(false)

    const handleChange=()=>{
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        setSelected(!selected)
    }
    return(
        <div className="flex justify-between my-3 p-2 hover:bg-secondary  hover:shadow-md   hover:cursor-pointer rounded" onClick={handleChange}>
            <div className="flex">
               <Avatar  image={user.image} name={user.fullName || user.id} size={32} /> 
               <p className="text-primary">{user.fullName || user.id}</p>
            </div>
            {selected? <div><Done style={{background:"rgba(3,17,54,1)" , color:"rgba(83,185,205)",borderRadius:'99px',}} fontSize='medium'/></div> : <Done/> }
        </div>
    )
}

const UserList=({setSelectedUsers,selectedUsers})=>{
    const {client}=useChatContext();
    const [users,setUsers]=useState([])
    const [loading,setLoading]=useState(true)
    const [listEmpty,setListEmpty]=useState(false)
    const [error,setError]=useState(false)




    const getUsers = async () => {
        try {
            const response = await client.queryUsers(
                { id: { $ne: client.userID } },
                { created_at: -1 },
                { limit: 5 } ,
            );

            if(response.users.length) {
                setUsers(response.users);

            } else {
                setListEmpty(true);

            }
        } catch (error) {
           setError(true);   
  

        }
    }

    useEffect(() => {
       if(loading){
        if(client) getUsers()
       }
       setLoading(false)
    }, [loading]);

    if(error){
        return(
            <ListContainer><div className="w-[60%] text-center my-2 mx-auto" > Error loading ,please refresh and try again ...</div>  </ListContainer>
        )
    }
    return(
        <div className="w-[50%] text-center my-2 mx-auto">
        <ListContainer>
            {loading ? <div>loading users</div>: (users.map((user,i)=>
             <UserItem key={user.id} index={i} user={user} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers}/>
            ))}
        </ListContainer>
        </div>
    
    )
}

export default UserList; 