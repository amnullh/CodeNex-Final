import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import toast from 'react-hot-toast';
import { ToastContainer } from "react-toastify";

// import '../css/dashboard.css'
// import '../js/home.js'
import "../css/Sign.css";

const Home = () => {
    const [roomId, setRoomId] = useState("");

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




  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? console.log("verified")
        : (removeCookie("token"), navigate("/"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  return (
    <div className="log-page">
      {/* Hi {username}, <br/>*/}
      {/* <button onClick={Logout}>LOGOUT</button>  */}

      <nav>
        Logo
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#">Discussion</a>
          <button className="nav-button" onClick={Logout}>LOGOUT</button>
          {/* <a href="#" onClick={Logout}>Logout</a> */}
          Hey!<span>{username}</span>
          <img src={require('../images/user.png')} alt="Avatar" style={{ height: '30px', borderRadius: '50%' }} />
        </div>
      </nav>
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

      
    </div>
  );
};

export default Home;

