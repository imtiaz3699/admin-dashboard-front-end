"use client"

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
type UserContextType = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    logout: () => void;
    showToaster: {
        show: boolean,
        message: string,
        error:boolean,
    };
    setShowToaster: React.Dispatch<React.SetStateAction<{
        show: boolean;
        message: string;
        error:boolean,
    }>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null)
    const [token, setToken] = useState<string>(Cookies.get("token") || "");
    const [showToaster, setShowToaster] = useState({
        show: false,
        message: "",
        error:false
    });
    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        setUser(null);
        setToken("");
    };
    useEffect(() => {
        setTimeout(() => {
            setShowToaster({
                show: false,
                message: "",
                error:false,
            })
        }, 2000)
    }, [showToaster.message, showToaster.show])
    return (
        <UserContext.Provider value={{
            user, setUser, token, setToken, logout, showToaster, setShowToaster
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}