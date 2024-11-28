import { useEffect,useState } from "react";
function Main(){
    // const [user,setUser] = useState(null)
    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //       try {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch("api/users/info", {
    //           headers: { "x-auth": token },
    //         });
    //         if (response.ok) {
    //           const user = await response.json(); // Await the JSON response
    //           console.log("User info:", user);
    //           setUser(user[0]);
    //         } else {
    //           console.error("Failed to fetch user info");
    //         }
    //       } catch (error) {
    //         console.error("Error fetching user info:", error);
    //       }
    //     };
    
    //     fetchUserInfo(); // Call the async function
    //   }, []);
    
    return (
        <div>

            {/* <h1>Main page</h1>
            {user ? (
        <div>
          <h2>Welcome, {user.firstName} {user.lastName}!</h2>
          <p>Email: {user.email}</p>
          <p>Type: {user.type}</p>
          <p>Phone Number: {user.phoneNum}</p>
        </div>
      ) : (
        <p>Loading user info...</p> // Display a loading message while fetching user info
      )} */}
        </div>
    )
}

export default Main;