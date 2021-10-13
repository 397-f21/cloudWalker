import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapChart from './mapUtils/MapChart';
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { PhotoCardList } from './photoUtils/photoCardList';
import {SignInWithGoogle, useData, useUserState} from "./utilities/firebase";
import UploadPhoto from "./photoUtils/uploadPhoto";
import {UserButton, userButton} from "./userUtils/userLogin";
function App() {
  const folderName = 'userPhoto'
    const [user] = useUserState();
    let userName;
    if(user){
        userName =user.displayName;
    }
    else{
        userName = 'd61e8ec077124fb5606cba942d9d026207721624';
    }

  const userData = useData('/userPhoto');
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);

  return (
    <div className="App">
      <header class="jumbotron">
          <div class="container">
              <div class="row row-header">
                <div class="col-md-1 col-sm-1">
                  <img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cloud-walker-c72ce.appspot.com/o/logos%2Flogo2.jpeg?alt=media&token=17aa1e08-c11a-4db9-9719-150e7d083af6" alt="new"></img>
                </div>
                  {/* I can't style sry */}
                  <div className="col-md-12 col-sm-12">
                  <UserButton></UserButton>
                  </div>
              </div>
          </div>
      </header>
      {/* <h1 className="display-2">CloudWalker</h1> */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="card m-2 p-2">
              <MapChart setTooltipContent={setContent} location={location} setLocation={setLocation} newPhotos={userData[0] ? userData[0][folderName][userName] : []} setPhotos={setPhotos} />
              <ReactTooltip>{content}</ReactTooltip>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="card m-2 p-2 mdb-color lighten-2 text-center z-depth-2 scroll">
              <h1> Location: {location} </h1>
              {photos.length === 0 ? "No Photo Available" : <PhotoCardList photos={photos} /> }
            </div>
              <UploadPhoto location={location} setPhotos={setPhotos}></UploadPhoto>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
