
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login function (to be replaced with real API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Login successful!",
        description: "Welcome back to StyleVerse.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string, role: 'customer' | 'designer') => {
    setLoading(true);
    try {
      // Mock register function (to be replaced with real API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Registration successful!",
        description: "Welcome to StyleVerse.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="space-y-4">
            <h1 className="text-4xl font-serif text-purple-600">StyleVerse</h1>
            <p className="text-xl text-gray-600">Where your custom fashion dreams come to life.</p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">1</div>
                <p>Create a custom fashion request</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">2</div>
                <p>Receive proposals from talented designers</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">3</div>
                <p>Chat directly with your chosen designer</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">4</div>
                <p>Track progress until your custom piece is delivered</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome to StyleVerse</h2>
          <p className="mb-8">Sign in or create an account to get started with custom fashion.</p>
          
          <div className="space-y-4">
            <button 
              className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => handleLogin("demo@example.com", "password123")}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign in with Demo Account"}
            </button>
            
            <button 
              className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => handleRegister("New User", "new@example.com", "password123", "customer")}
              disabled={loading}
            >
              {loading ? "Loading..." : "Create New Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
