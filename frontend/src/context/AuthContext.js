import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  // 새로고침했을 때 localStorage에 저장된 로그인 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 로그인 처리
  const login = (userData) => {
    const loginUser = userData || {
      id: 'testUser',
      name: '홍길동',
      email: 'test@test.com'
    };

    setUser(loginUser);

    // 새로고침해도 유지되도록 localStorage 저장
    localStorage.setItem('user', JSON.stringify(loginUser));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
