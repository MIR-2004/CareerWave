import { createContext, useState } from "react";

export const Appcontext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched, setIsSearched] = useState(false)
    
    const value = {
        setSearchFilter,searchFilter,
        isSearched, setIsSearched
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}


