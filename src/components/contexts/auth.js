import React from "react";

export const UserContext = React.createContext({})

export const AuthProvider = (props) => {

    const [userStats, setUserStats] = React.useState({})
    console.log(userStats)

    return(
        <UserContext.Provider value={{userStats, setUserStats}}>
            {props.children}
        </UserContext.Provider>
    )
}

