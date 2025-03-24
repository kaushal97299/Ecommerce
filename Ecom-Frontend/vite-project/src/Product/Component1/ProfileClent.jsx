import React, { useEffect, useState } from "react";



const ProfileClient = () => {
  const [user, setUser] = useState({name:"",email:"",role:"",phone:"",});
   
  useEffect(() => {
    const userData = localStorage.getItem("user");
     if(userData){
      setUser(JSON.parse(userData))
     }
  },[]);
      
  const handleedit = () => {
    alert("Edit");
  }
  return (
    <div>
      <h2>Profile Page</h2>
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile no:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
        <button onClick={handleedit}>Edit</button>
      
    </div>
  );
};
export default ProfileClient;
