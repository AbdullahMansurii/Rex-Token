import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check localStorage for existing session
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userDataOrRole = "user") => {
        let userData;
        if (typeof userDataOrRole === "string") {
            userData = {
                name: "Crypto King",
                email: "demo@crypto.com",
                role: userDataOrRole,
                isLoggedIn: true,
            };
        } else {
            userData = {
                ...userDataOrRole,
                isLoggedIn: true,
            };
        }
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
