import "./searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { getChannel,useChatContext } from "stream-chat-react";
import {ResultsDropdown} from './'
const SearchBar = ({setToggleContainer}) => {
  const styles = {
    inputSearch: {
      width: "90%",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.2)",
      fontWeight: "bold",
      borderRadius: "8px",
      border: "1px solid transparent",
      color: "white",
    },
  };
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([])
  const [directChannels, setDirectChannels] = useState([])

  useEffect(() => {
      if(!query) {
          setTeamChannels([]);
          setDirectChannels([]);
      }
  }, [query])

  const getChannels = async (text) => {
      try {
          const channelResponse = client.queryChannels({
              type: 'team', 
              name: { $autocomplete: text }, 
              members: { $in: [client.userID]}
          });
          const userResponse = client.queryUsers({
              id: { $ne: client.userID },
              name: { $autocomplete: text }
          })

          const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

          if(channels.length) setTeamChannels(channels);
          if(users.length) setDirectChannels(users);
      } catch (error) {
          setQuery('')
      }
  }

  const onSearch = (event) => {
      event.preventDefault();

      setLoading(true);
      setQuery(event.target.value);
      getChannels(event.target.value)
  }

  const setChannel = (channel) => {
      setQuery('');
      setActiveChannel(channel);
  }

  return (
    <div
      style={{ position: "relative", width: "80%", margin: "10px auto" }}
      className="flex justify-center items-center gap-2"
    >
      <input
        style={styles.inputSearch}
        className="inputSearch"
        placeholder="Search"
        onChange={onSearch}
        value={query}
        type="text"
      ></input>
      <SearchIcon
        style={{ color: "white", position: "absolute", right: "10px" }}
      />
       { query && (
                <ResultsDropdown 
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )}
    </div>
  );
};

export default SearchBar;
