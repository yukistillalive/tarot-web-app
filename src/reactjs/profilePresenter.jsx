import { observer } from "mobx-react-lite";
import { ProfileView } from "/src/views/profileView.jsx";




const Profile = observer(// observer needed for the presenter to update (its view) when relevant parts of the model change
     
    function Profile(props){

        return(
        <>
        <ProfileView 
                displayName={props.model.currentUser?.displayName || "Anonymous"}
                email={props.model.currentUser?.email || ""}
                photoURL={props.model.photoURL || ""}
                onLogout={handleLogoutACB}
                onAvatarChange={handleAvatarChangeACB}
        />
        </>
        );

        function handleLogoutACB() {
            props.model.logout();
        }

        function handleAvatarChangeACB(file) {
            props.model.uploadAvatar(file);
        }





                             
    }  
         
       
);


export { Profile };