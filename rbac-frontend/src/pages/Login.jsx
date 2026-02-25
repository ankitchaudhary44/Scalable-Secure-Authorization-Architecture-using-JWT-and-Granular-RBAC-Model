import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, Shield } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });

      toast.success('System Initialized! Login Successful.');
      
      
      localStorage.setItem('token', response.data.token);
      
      console.log("Login Success:", response.data);

      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Unauthorized Access. System locked.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      <Toaster position="top-right" reverseOrder={false} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl z-10">
        
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              
              <Shield className="text-cyan-400" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-widest">
            SECURE<span className="text-cyan-400">LOGIN</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm tracking-wide uppercase">Authenticate to access the system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
              placeholder="admin@vit.ac.in"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                placeholder="••••••••"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-[1.02] active:scale-95 tracking-widest uppercase"
          >
            {isLoading ? 'VERIFYING...' : 'INITIALIZE'}
          </button>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-slate-400 text-sm">
              Don't have an account? 
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 ml-1 font-semibold transition-colors">Register System</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;