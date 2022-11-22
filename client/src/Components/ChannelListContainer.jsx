import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { SearchBar, TeamChannelList, TeamChannelPreview } from "./";
import { useState } from "react";
import logo from "../assets/opus_logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
const cookies = new Cookies();

const SideBar = () => {
  return (
    <div className="w-[22%] min-h-screen bg-primary flex flex-col justify-between items-center  ">
      <div className="w-[60%] m-1">
        <img src={logo} alt="logo" className="w-full"></img>
      </div>
      <div className=" hover:cursor-pointer rounded w-fit hover:border-secondary hover:border-2 m-2 " onClick={() => {
            cookies.remove("token");
            cookies.remove("username");
            cookies.remove("fullName");
            cookies.remove("userID");
            cookies.remove("phoneNumber");
            cookies.remove("avatarURL");
            cookies.remove("hashedPassword");
            window.location.reload();
          }}>
        <LogoutIcon
        fontSize="medium"
         style={{color:"rgba(83,185,205)" }}/>
      </div>
    </div>
  );
};
const CompanyHeader = () => {
  return (
    <>
      <div >
        <p className="text-center text-btn text-lg font-medium">OpusLab Support</p>
      </div>
    </>
  );
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === "messaging");
  };
  const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === "team");
  };
  return (
    <div className="flex w-[35%] max-[600px]:hidden bg-secondary">
      <SideBar />
      <div className=" w-full">
        <CompanyHeader />
        <SearchBar setToggleContainer={setToggleContainer}/>
        <div className="flex flex-col w-[90%] mt-4 mx-auto  justify-around gap-[50px]">
          <ChannelList
            filters={filters}
            channelRenderFilterFn={customChannelTeamFilter}
            List={(listProps) => (
              <TeamChannelList
                {...listProps}
                type="team"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            )}
            Preview={(previewProps) => (
              <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="team"
              />
            )}
          />
          <ChannelList
            filters={filters}
            channelRenderFilterFn={customChannelMessagingFilter}
            List={(listProps) => (
              <TeamChannelList
                {...listProps}
                type="messaging"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            )}
            Preview={(previewProps) => (
              <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="messaging"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <ChannelListContent
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

export default ChannelListContainer;
