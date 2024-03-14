import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import "../css/Sign.css";

const Room = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success("Created a new Room");
      };
    
      const joinRoom = () => {
        if(!roomId || !username){
          toast.error("Room ID & Username is required");
          return;
        }
    
        navigate(`/editor/${roomId}`,{
          state: {username}
        });
    
      };
    
      const handleSubmit = (e) => {
        if(e.code === 'Enter'){
          joinRoom();
        }
      }

  return (
    <div className="log-body">
      <div className="log-container create-room" id="log-container">
      <div className="log-form-container log-sign-in">
        <div className="log-form">
        <h1>Create or Join Room</h1>
        <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleSubmit}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleSubmit}
          />
          <button onClick={joinRoom}>Join</button>
          <p>
            If you don't have an invite link, create one &nbsp;
            <a onClick={createNewRoom} href="#" className="createNewBtn">
              new room
            </a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
