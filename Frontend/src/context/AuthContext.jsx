import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kenakata_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = loginUser(email, password);
    if (!found) return null;
    const safe = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUser(safe);
    localStorage.setItem('kenakata_user', JSON.stringify(safe));
    return safe;
  };

  const register = ({ name, email, password }) => {
    const created = registerUser({ name, email, password });
    if (!created) return null;
    const safe = { id: created.id, name: created.name, email: created.email, role: created.role };
    setUser(safe);
    localStorage.setItem('kenakata_user', JSON.stringify(safe));
    return safe;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kenakata_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}