import React, { createContext, useState, useContext } from "react";

// Create the User Context with a default value (can be null or an empty object)
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;


// IT IS THE SOLUTION FOR THE PROP DRILLING PROBLEM IF ANY COMPONENT NEEDS TO ACCESS THE USER DETAILS IT CAN USE IT FROM USERCONTEXT
// THE USER CONTEXT IS SET WHEN USER LOGIN THE WEBSITE
// CHECK OUT THE LOGIN PAGE FOR MORE DETAILS

// ONCE THE SETUSER IS CALLED IN THE LOGIN PAGE THE USER DETAILS ARE STORED IN THE LOCAL STORAGE AND COMPONENTS CAN USE IT 