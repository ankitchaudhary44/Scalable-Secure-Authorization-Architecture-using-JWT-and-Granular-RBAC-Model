import React, { useState } from 'react';
import API from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    role: 'User'  
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.post('/api/auth/register', formData);
      toast.success('Access Granted! Account Created.');
      
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      const errorData = error.response?.data;
      const errorMsg = errorData?.message || (typeof errorData === 'string' ? errorData : 'Registration Failed');
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-right" />
      
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/20 rounded-full border border-blue-500/30">
              <UserPlus className="text-blue-400" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
            Create<span className="text-blue-400">Account</span>
          </h2>
          <p className="text-slate-400 text-xs mt-2 uppercase tracking-tighter">Initialize your secure credentials</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          
          <div>
            <label className="block text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300"
              placeholder="ankit_44"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          
          <div>
            <label className="block text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300"
              placeholder="ankit@vit.ac.in"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          
          <div>
            <label className="block text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          
          <div>
            <label className="block text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">Access Role</label>
            <select 
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-blue-500 appearance-none cursor-pointer"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 tracking-widest"
          >
            {isLoading ? 'ENCRYPTING...' : 'REGISTER SYSTEM'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Already have access? 
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold ml-2 transition-colors">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;