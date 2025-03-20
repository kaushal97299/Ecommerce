import React, { useEffect, useState } from "react";



const ProfileClient = () => {
  const [user, setUser] = useState({name:"",email:"",role:""});
  

  useEffect(() => {
    const userData = localStorage.getItem("user");
     if(userData){
      setUser(JSON.parse(userData))
     }
  },[]);

  return (
    <div>
      <h2>Profile Page</h2>
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      
    </div>
  );
};
export default ProfileClient;
