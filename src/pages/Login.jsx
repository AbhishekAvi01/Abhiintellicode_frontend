
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router'; 
import { loginUser } from "../authSlice";
import { Eye, EyeOff, Mail, Lock, Cpu, Zap, Flame, Trophy, ChevronRight, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  emailId: z.string().email("Access denied: Enter a valid developer email"),
  password: z.string().min(8, "Security is key: Pass-key must be 8+ characters") 
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] selection:bg-indigo-100 font-sans antialiased text-slate-800">
      
      {/* LEFT SIDE: Visual Motivation (Lightened) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-white border-r border-slate-200 shadow-sm">
        {/* Subtle Decorative Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50 blur-[100px] rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-50 blur-[100px] rounded-full opacity-60" />
        
        <div className="relative z-10 p-20 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform hover:scale-105">
                <Cpu className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
                Abhi <span className="text-indigo-600">IntelliCode</span>
              </span>
            </div>

            <h2 className="text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Master <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4 font-black">DSA</span> on the <br />
              <span className="text-indigo-500 italic">AI-Integrated</span> Platform.
            </h2>
            
            <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-medium italic">
              "Don't just solve problems. Master them on an environment that builds your intuition with every line of code."
            </p>

            {/* Light Motivation Cards */}
            <div className="space-y-4 max-w-xs">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                <div className="p-2.5 bg-orange-50 rounded-xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Flame size={22}/>
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm italic tracking-tight">Daily Coding Streak</p>
                  <p className="text-slate-500 text-xs font-medium">Consistency is your superpower.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Trophy size={22}/>
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm italic tracking-tight">Global Rankings</p>
                  <p className="text-slate-500 text-xs font-medium">Measure logic, not just syntax.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase italic">
             Secure SSL Auth &bull; AI Logic Analysis Ready
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Light Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative">
        <div className="w-full max-w-[380px]">
          {/* Mobile Only Header */}
          <div className="lg:hidden flex flex-col items-center mb-10 text-center">
             <Cpu className="text-indigo-600 w-12 h-12 mb-4" />
             <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Abhi <span className="text-indigo-600">IntelliCode</span></h1>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 uppercase italic">Welcome Back</h3>
            <p className="text-slate-500 font-medium italic">Authenticate to resume your **DSA** session.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-xs font-bold italic shadow-sm flex gap-3 animate-shake items-center">
                <ShieldCheck size={18} className="shrink-0" /> {error}
              </div>
            )}

            <div className="space-y-1.5 group">
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1 italic">Developer Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full bg-white border border-slate-200 focus:border-indigo-400 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-300 outline-none transition-all shadow-sm focus:shadow-md"
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && <p className="text-[11px] text-red-500 mt-1 ml-1 font-bold italic">{errors.emailId.message}</p>}
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1 italic">Security Pass-key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your security key"
                  className="w-full bg-white border border-slate-200 focus:border-indigo-400 rounded-2xl py-4 pl-12 pr-12 text-slate-900 placeholder:text-slate-300 outline-none transition-all shadow-sm focus:shadow-md"
                  {...register('password')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-900 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-red-500 mt-1 ml-1 font-bold italic">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-4 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-indigo-100 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-md"></span>
                  <span>Verifying Session...</span>
                </div>
              ) : (
                <>RESUME PRACTICE <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center border-t border-slate-100 pt-8">
            <p className="text-slate-500 font-bold text-sm italic tracking-wide">
              New to **Abhi IntelliCode**?{' '}
              <NavLink to="/signup" className="text-indigo-600 hover:text-indigo-500 font-black transition-all uppercase tracking-tighter decoration-2 underline underline-offset-4">
                Initialize Account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



