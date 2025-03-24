import { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./userContext";

type ApiContextType = {
    postRequest: (
        url: string,
        data: any,
        isToken?: boolean,
        customHeaders?: any
    ) => Promise<any>;
    putRequest: (
        url: string,
        data: any,
        isToken?: boolean,
        customHeaders?: any
    ) => Promise<any>;
    getRequest: (url: string, id?: string) => Promise<any>;
    deleteRequest: (url: string) => Promise<any>;
}
const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, user } = useUser();
    const postRequest = async (
        url: string,
        data: any,
        isToken = false,
        customHeaders = {}
    ) => {
        const baseUrl = import.meta.env.VITE_BASE_URL + url;
        try {
            const headers = {
                "Content-Type": "application/json",
                ...(isToken && { Authorization: `Bearer ${token}` }),
                ...customHeaders,
            };
            const response = await axios.post(baseUrl, data, { headers });
            return response?.data || response;
        } catch (error: any) {
            if (error) {
                throw error;
            }
        }
    };
    const putRequest = async (url: string, data: any, isToken = false, customHeaders = {}) => {
        const baseUrl = import.meta.env.VITE_BASE_URL + url;
        try {
            const headers = {
                "Content-Type": "application/json",
                ...(isToken && { Authorization: `Bearer ${token}` }),
                ...customHeaders,
            };
            const response = await axios.put(baseUrl, data, { headers });
            return response?.data || response;
        } catch (error: any) {
            console.error("Error:", error);
            if (error) {
                throw error;
            }
        }
    };
    const getRequest = async (url: string, id?: string) => {
        const baseUrl = import.meta.env.VITE_BASE_URL + url;
        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(baseUrl, { headers });
            return response?.data || response;
        } catch (error: any) {
            console.error("Error:", error);
            if (error) {
                throw error;
            }
        }
    };
    const deleteRequest = async (url: string) => {
        const baseUrl = `${import.meta.env.VITE_BASE_URL}${url}`;

        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.delete(baseUrl, { headers });
            return response?.data || response;
        } catch (error: any) {
            console.error(
                "DELETE Request Error:",
                error.response?.data || error.message
            );
            throw error;
        }
    };
    return (
        <ApiContext.Provider
            value={{ postRequest, getRequest, putRequest, deleteRequest }}
        >
            {children}
        </ApiContext.Provider>
    );
};
export const useApi = (): ApiContextType => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used within an ApiProvider");
    }
    return context;
};
