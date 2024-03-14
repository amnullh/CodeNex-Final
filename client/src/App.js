// import './CSS/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import EditorApp from './EditorApp';
// import Room from './pages/Room1';
import  Room from './pages/Room';


function App() {
  return (
    <>
    <div>
        <Toaster
          position='bottom-right'
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88"
              }
            }
          }}
        ></Toaster>
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/room" element={<Room/>}></Route>
          <Route path="/editor" element={<EditorApp/>}></Route>
          <Route path="/editor/:roomId" element={<EditorApp/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
