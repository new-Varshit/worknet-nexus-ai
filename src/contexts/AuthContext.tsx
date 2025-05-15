
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type UserRole = 'admin' | 'hr' | 'employee';
export type UserStatus = 'approved' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  department?: string;
  position?: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  profileImage?: File;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@worknet360.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    status: 'approved' as UserStatus,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0F62FE&color=fff',
    department: 'Executive',
    position: 'Chief Administrator',
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@worknet360.com',
    password: 'hr123',
    role: 'hr' as UserRole,
    status: 'approved' as UserStatus,
    avatar: 'https://ui-avatars.com/api/?name=HR+Manager&background=0F62FE&color=fff',
    department: 'Human Resources',
    position: 'HR Director',
  },
  {
    id: '3',
    name: 'John Employee',
    email: 'employee@worknet360.com',
    password: 'employee123',
    role: 'employee' as UserRole,
    status: 'approved' as UserStatus,
    avatar: 'https://ui-avatars.com/api/?name=John+Employee&background=0F62FE&color=fff',
    department: 'Engineering',
    position: 'Software Developer',
  },
  // EMS dummy credentials
  {
    id: '4',
    name: 'EMS Admin',
    email: 'admin@ems.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    status: 'approved' as UserStatus,
    avatar: 'https://ui-avatars.com/api/?name=EMS+Admin&background=0F62FE&color=fff',
    department: 'Executive',
    position: 'Chief Administrator',
  },
  {
    id: '5',
    name: 'EMS HR',
    email: 'hr@ems.com',
    password: 'hr123',
    role: 'hr' as UserRole,
    status: 'approved' as UserStatus,
    avatar: 'https://ui-avatars.com/api/?name=EMS+HR&background=0F62FE&color=fff',
    department: 'Human Resources',
    position: 'HR Director',
  },
  {
    id: '6',
    name: 'EMS Employee',
    email: 'employee@ems.com',
    password: 'employee123',
    role: 'employee' as UserRole,
    status: 'approved' as UserStatus,
    avatar: 'https://ui-avatars.com/api/?name=EMS+Employee&background=0F62FE&color=fff',
    department: 'Engineering',
    position: 'Software Developer',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('worknet360_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('worknet360_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Check if user is approved
      if (foundUser.status === 'pending') {
        setIsLoading(false);
        toast.error("Your account is pending approval");
        throw new Error('Account pending approval');
      }
      
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('worknet360_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      toast.error("A user with this email already exists");
      throw new Error('User already exists');
    }

    // In a real app, you would send this data to the backend API
    // and handle the response accordingly
    console.log('User registered successfully', userData);
    
    setIsLoading(false);
    return;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('worknet360_user');
    toast.info("You've been logged out");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout,
      register, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
