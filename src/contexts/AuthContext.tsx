'use client';

import React, { createContext, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { loginWithEmailAndPassword, logoutFromServer, LoginSchema, User } from '@/lib/auth';
import { setAuthToken } from '@/lib/api-client';

type AuthContextType = {
  user: User | null;
  login: (data: LoginSchema) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  isInitializing: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setAuthToken(storedToken);
    setIsInitializing(false);
  }, []);

  const loginMutation = useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      setUser(data.user);
      setAuthToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });

  const login = async (data: LoginSchema) => {
    setLoading(true);
    await loginMutation.mutateAsync(data)
        .finally(() => {
            setLoading(false);
        });
  };

  const logout = async () => {
    await logoutFromServer();
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
};