// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Minimum character should be 3"),
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-base-200"> {/* Added a light bg for contrast */}
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-3xl mb-6">Leetcode</h2> {/* Added mb-6 for spacing */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* First Name Field */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">First Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="John"
//                 className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`} 
//                 {...register('firstName')}
//               />
//               {errors.firstName && (
//                 <span className="text-error text-sm mt-1">{errors.firstName.message}</span>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} // Ensure w-full for consistency
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
//               )}
//             </div>

//             {/* Password Field with Toggle */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   // Added pr-10 (padding-right) to make space for the button
//                   className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-error text-sm mt-1">{errors.password.message}</span>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="form-control mt-8 flex justify-center"> 
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Signing Up...' : 'Sign Up'}
//               </button>
//             </div>
//           </form>

//           {/* Login Redirect */}
//           <div className="text-center mt-6"> {/* Increased mt for spacing */}
//             <span className="text-sm">
//               Already have an account?{' '}
//               <NavLink to="/login" className="link link-primary">
//                 Login
//               </NavLink>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


//--------------------------------------------------------------------------

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';
// import { Eye, EyeOff, Code2, Mail, User, Lock, ArrowRight, Zap, Terminal, PlayCircle, Sparkles } from 'lucide-react';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Name must be at least 3 characters"),
//   emailId: z.string().email("Please enter a valid developer email"),
//   password: z.string().min(8, "Security is key: Password must be 8+ characters")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const { register, handleSubmit, formState: { errors } } = useForm({ 
//     resolver: zodResolver(signupSchema),
//     mode: 'onTouched' 
//   });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex bg-[#0B0F1A] selection:bg-indigo-500/30 font-sans antialiased">
      
//       {/* LEFT SIDE: Project Branding & Info (Hidden on Mobile) */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-slate-800/50 bg-[#0D121F]">
//         {/* Abstract Background patterns */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
//           <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
//         </div>

//         <div className="relative z-10 p-16 flex flex-col justify-between w-full">
//           <div>
//             <div className="flex items-center gap-3 mb-12">
//               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//                 <Code2 className="text-white w-6 h-6" />
//               </div>
//               <span className="text-2xl font-bold text-white tracking-tight">Abhi IntelliCode</span>
//             </div>

//             <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
//               Master DSA with <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
//                 AI Intelligence.
//               </span>
//             </h2>
            
//             <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
//               Experience the world's first coding platform that doesn't just test you, but teaches you like a real mentor.
//             </p>

//             {/* Feature Highlights */}
//             <div className="space-y-6">
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Sparkles size={20}/></div>
//                 <div>
//                   <h4 className="text-white font-semibold">Intelligent AI Hints</h4>
//                   <p className="text-slate-500 text-sm mt-1">Stuck? Our AI provides step-by-step logic without spoiling the code.</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400"><PlayCircle size={20}/></div>
//                 <div>
//                   <h4 className="text-white font-semibold">Video Explanations</h4>
//                   <p className="text-slate-500 text-sm mt-1">Deep dive into every problem with curated high-quality video walkthroughs.</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Terminal size={20}/></div>
//                 <div>
//                   <h4 className="text-white font-semibold">Pro Code Editor</h4>
//                   <p className="text-slate-500 text-sm mt-1">Write and test your solutions in a production-grade interactive environment.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-6 text-slate-500 text-sm">
//             <div className="flex -space-x-2">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0D121F] bg-slate-800 flex items-center justify-center overflow-hidden">
//                   <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
//                 </div>
//               ))}
//             </div>
//             <p>Joined by 10,000+ developers</p>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: Signup Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
//         {/* Glow effect for mobile mobile */}
//         <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

//         <div className="w-full max-w-[420px]">
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex flex-col items-center mb-8">
//             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
//               <Code2 className="text-white w-7 h-7" />
//             </div>
//             <h1 className="text-2xl font-bold text-white tracking-tight text-center">Abhi IntelliCode</h1>
//           </div>

//           <div className="bg-[#161B2B]/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 shadow-2xl">
//             <div className="mb-8">
//               <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
//               <p className="text-slate-500 text-sm">Start your journey to becoming a pro developer.</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               {error && (
//                 <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs flex gap-2">
//                   <Zap size={14} className="shrink-0" /> {error}
//                 </div>
//               )}

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-400 ml-1">Full Name</label>
//                 <div className="relative group">
//                   <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
//                   <input
//                     type="text"
//                     placeholder="Enter your full name"
//                     className="w-full bg-[#0B0F1A] border border-slate-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-700 outline-none transition-all"
//                     {...register('firstName')}
//                   />
//                 </div>
//                 {errors.firstName && <p className="text-[10px] text-red-400 mt-1 ml-1">{errors.firstName.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-400 ml-1">Email</label>
//                 <div className="relative group">
//                   <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
//                   <input
//                     type="email"
//                     placeholder="enter your email address"
//                     className="w-full bg-[#0B0F1A] border border-slate-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-700 outline-none transition-all"
//                     {...register('emailId')}
//                   />
//                 </div>
//                 {errors.emailId && <p className="text-[10px] text-red-400 mt-1 ml-1">{errors.emailId.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-400 ml-1">Password</label>
//                 <div className="relative group">
//                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     className="w-full bg-[#0B0F1A] border border-slate-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-slate-700 outline-none transition-all"
//                     {...register('password')}
//                   />
//                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors">
//                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-[10px] text-red-400 mt-1 ml-1">{errors.password.message}</p>}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl mt-4 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20"
//               >
//                 {loading ? <span className="loading loading-spinner loading-sm"></span> : (
//                   <>Create Developer Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
//                 )}
//               </button>
//             </form>

//             <div className="mt-8 text-center">
//               <p className="text-slate-500 text-sm">
//                 Already part of the matrix?{' '}
//                 <NavLink to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-all underline underline-offset-4">
//                   Log In
//                 </NavLink>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

//-------------------------------------------------------------

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';
// import { Eye, EyeOff, Terminal, Mail, User, Lock, ArrowRight, Sparkles, Youtube, Cpu } from 'lucide-react';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Name must be at least 3 characters"),
//   emailId: z.string().email("Please enter a valid developer email"),
//   password: z.string().min(8, "Security is key: Password must be 8+ characters")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const { register, handleSubmit, formState: { errors } } = useForm({ 
//     resolver: zodResolver(signupSchema),
//     mode: 'onTouched' 
//   });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex bg-[#0B0F1A] selection:bg-indigo-500/30 font-sans antialiased text-slate-200">
      
//       {/* LEFT SIDE: Project Branding (Visible on Desktop) */}
//       <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0D121F] border-r border-white/5">
//         {/* Animated Glow Elements */}
//         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />

//         <div className="relative z-10 p-20 flex flex-col justify-between h-full w-full">
//           <div>
//             <div className="flex items-center gap-3 mb-16">
//               <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
//                 <Cpu className="text-white w-7 h-7" />
//               </div>
//               <span className="text-2xl font-black tracking-tighter text-white uppercase">Abhi <span className="text-indigo-500">IntelliCode</span></span>
//             </div>

//             <h2 className="text-6xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
//               Don't just code. <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
//                 Code Intelligently.
//               </span>
//             </h2>
            
//             <p className="text-xl text-slate-400 max-w-lg mb-12 leading-relaxed font-medium">
//               The world's first AI-integrated DSA platform designed to bridge the gap between solving and understanding.
//             </p>

//             {/* Feature Cards */}
//             <div className="grid grid-cols-1 gap-6 max-w-md">
//               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors group">
//                 <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform"><Sparkles size={22}/></div>
//                 <div>
//                   <h4 className="text-white font-bold">AI Hints System</h4>
//                   <p className="text-slate-500 text-sm mt-1 leading-snug">Intelligent, non-spoiling hints that guide you towards the optimal solution logic.</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors group">
//                 <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform"><Youtube size={22}/></div>
//                 <div>
//                   <h4 className="text-white font-bold">Video Explanations</h4>
//                   <p className="text-slate-500 text-sm mt-1 leading-snug">Visual walkthroughs for every problem to master patterns, not just syntax.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 py-4 border-t border-white/5">
//              <div className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">v2.0 Beta</div>
//              <p className="text-slate-600 text-xs font-semibold tracking-wide uppercase italic">Scalable Production-Ready Architecture</p>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: Auth Form */}
//       <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative">
//         <div className="w-full max-w-[400px]">
//           {/* Mobile Header Only */}
//           <div className="lg:hidden flex flex-col items-center mb-10 text-center">
//              <Cpu className="text-indigo-500 w-12 h-12 mb-4" />
//              <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">Abhi <span className="text-indigo-500">IntelliCode</span></h1>
//           </div>

//           <div className="mb-10 text-center lg:text-left">
//             <h3 className="text-3xl font-bold text-white tracking-tight mb-2">Initialize Account</h3>
//             <p className="text-slate-500 font-medium">Create your credentials to enter the matrix.</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             {error && (
//               <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-semibold flex gap-3 animate-shake">
//                 <Zap size={18} className="shrink-0" /> {error}
//               </div>
//             )}

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Full Name</label>
//               <div className="relative group">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
//                 <input
//                   type="text"
//                   placeholder="e.g. Abhishek Kumar"
//                   className="w-full bg-[#161B2B]/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
//                   {...register('firstName')}
//                 />
//               </div>
//               {errors.firstName && <p className="text-[11px] text-red-400 mt-1 ml-1 font-bold italic tracking-wide">{errors.firstName.message}</p>}
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Email Terminal</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
//                 <input
//                   type="email"
//                   placeholder="dev@intellicode.com"
//                   className="w-full bg-[#161B2B]/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
//                   {...register('emailId')}
//                 />
//               </div>
//               {errors.emailId && <p className="text-[11px] text-red-400 mt-1 ml-1 font-bold italic tracking-wide">{errors.emailId.message}</p>}
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Pass-key</label>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Minimum 8 characters"
//                   className="w-full bg-[#161B2B]/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
//                   {...register('password')}
//                 />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-white transition-colors">
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-[11px] text-red-400 mt-1 ml-1 font-bold italic tracking-wide">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-6 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-indigo-600/20 border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1"
//             >
//               {loading ? <span className="loading loading-spinner loading-md"></span> : (
//                 <>SIGN UP NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
//               )}
//             </button>
//           </form>

//           <div className="mt-12 text-center border-t border-slate-800 pt-8">
//             <p className="text-slate-500 font-medium">
//               Already mastering on IntelliCode?{' '}
//               <NavLink to="/login" className="text-indigo-400 hover:text-indigo-300 font-black transition-all hover:underline underline-offset-4 decoration-2">
//                 LOG IN
//               </NavLink>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


//--------------------------------------


// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';
// import { Eye, EyeOff, Terminal, Mail, User, Lock, ArrowRight, Sparkles, Youtube, Cpu, BarChart3 } from 'lucide-react';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Name must be at least 3 characters"),
//   emailId: z.string().email("Please enter a valid developer email"),
//   password: z.string().min(8, "Security is key: Password must be 8+ characters")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const { register, handleSubmit, formState: { errors } } = useForm({ 
//     resolver: zodResolver(signupSchema),
//     mode: 'onTouched' 
//   });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex bg-[#0B0F1A] selection:bg-indigo-500/30 font-sans antialiased text-slate-200">
      
//       {/* LEFT SIDE: DSA Focus & Project Branding */}
//       <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0D121F] border-r border-white/5">
//         {/* Glow Effects */}
//         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/15 blur-[120px] rounded-full" />
        
//         <div className="relative z-10 p-20 flex flex-col justify-between h-full w-full">
//           <div>
//             <div className="flex items-center gap-3 mb-16">
//               <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
//                 <Cpu className="text-white w-7 h-7" />
//               </div>
//               <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Abhi <span className="text-indigo-500">IntelliCode</span></span>
//             </div>

//             <h2 className="text-6xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
//               Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 underline decoration-indigo-500/30">DSA</span> <br />
//               With Your <span className="text-indigo-400 italic">Personal</span> AI.
//             </h2>
            
//             <p className="text-xl text-slate-400 max-w-lg mb-12 leading-relaxed font-medium">
//               Join thousands of students mastering **Data Structures & Algorithms** with real-time AI mentoring and interactive logic building.
//             </p>

//             {/* DSA-Centric Feature Cards */}
//             <div className="grid grid-cols-1 gap-5 max-w-md">
//               <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 transition-all group">
//                 <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Sparkles size={22}/></div>
//                 <div>
//                   <h4 className="text-white font-bold text-lg">AI-Powered DSA Hints</h4>
//                   <p className="text-slate-500 text-sm mt-1">Get logic-based hints for **Arrays, Graphs, and DP** without seeing the solution.</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 transition-all group">
//                 <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><BarChart3 size={22}/></div>
//                 <div>
//                   <h4 className="text-white font-bold text-lg">Placement-Ready Logic</h4>
//                   <p className="text-slate-500 text-sm mt-1">Practice **DSA patterns** asked in top product companies like Google & Amazon.</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 transition-all group">
//                 <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all"><Youtube size={22}/></div>
//                 <div>
//                   <h4 className="text-white font-bold text-lg">Visual DSA Explainers</h4>
//                   <p className="text-slate-500 text-sm mt-1">Video walkthroughs for **complex algorithm** visualizations.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 py-4 border-t border-white/5">
//              <div className="px-3 py-1 bg-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-300 uppercase tracking-widest border border-indigo-500/30">AI-Integrated</div>
//              <p className="text-slate-600 text-xs font-semibold tracking-wide uppercase italic">Level up your DSA game &bull; 2026 Edition</p>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: Signup Form */}
//       <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative">
//         <div className="w-full max-w-[400px]">
//           <div className="mb-10 text-center lg:text-left">
//             <h3 className="text-3xl font-bold text-white tracking-tight mb-2">Create Developer Account</h3>
//             <p className="text-slate-500 font-medium">Start solving **DSA** problems with AI support.</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             {/* Input Fields (Same as previous high-quality design) */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Full Name</label>
//               <div className="relative group">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
//                 <input
//                   type="text"
//                   placeholder="e.g. Abhishek Kumar"
//                   className="w-full bg-[#161B2B]/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
//                   {...register('firstName')}
//                 />
//               </div>
//               {errors.firstName && <p className="text-[11px] text-red-400 mt-1 ml-1 font-bold italic">{errors.firstName.message}</p>}
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
//                 <input
//                   type="email"
//                   placeholder="dev@intellicode.com"
//                   className="w-full bg-[#161B2B]/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
//                   {...register('emailId')}
//                 />
//               </div>
//               {errors.emailId && <p className="text-[11px] text-red-400 mt-1 ml-1 font-bold italic">{errors.emailId.message}</p>}
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Security Pass-key</label>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Minimum 8 characters"
//                   className="w-full bg-[#161B2B]/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
//                   {...register('password')}
//                 />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-white transition-colors">
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-[11px] text-red-400 mt-1 ml-1 font-bold italic">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-6 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-indigo-600/20 border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1"
//             >
//               {loading ? <span className="loading loading-spinner loading-md"></span> : (
//                 <>START DSA JOURNEY <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
//               )}
//             </button>
//           </form>

//           <div className="mt-12 text-center border-t border-slate-800 pt-8">
//             <p className="text-slate-500 font-medium">
//               Already solving on IntelliCode?{' '}
//               <NavLink to="/login" className="text-indigo-400 hover:text-indigo-300 font-black transition-all hover:underline underline-offset-4 decoration-2">
//                 LOG IN
//               </NavLink>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;



//------------------------------------------------
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';
import { Eye, EyeOff, Code2, Mail, User, Lock, ArrowRight, Sparkles, Youtube, Cpu, BarChart3 } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters"),
  emailId: z.string().email("Please enter a valid developer email"),
  password: z.string().min(8, "Security is key: Password must be 8+ characters")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: zodResolver(signupSchema),
    mode: 'onTouched' 
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] selection:bg-indigo-100 font-sans antialiased text-slate-800">
      
      {/* LEFT SIDE: DSA Focus & Branding (Lightened) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-white border-r border-slate-200">
        {/* Subtle Decorative Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-50 blur-[100px] rounded-full" />
        
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
            
            <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-medium">
              Join thousands of students mastering **Data Structures & Algorithms** with real-time AI mentoring and interactive logic building.
            </p>

            {/* Light Feature Cards */}
            <div className="grid grid-cols-1 gap-5 max-w-md">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-default">
                <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Sparkles size={22}/>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg italic">AI-Powered DSA Hints</h4>
                  <p className="text-slate-500 text-sm mt-1">Get logic-based hints for **Arrays, Graphs, and DP** without seeing the solution.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all group cursor-default">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <BarChart3 size={22}/>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg italic">Placement-Ready Logic</h4>
                  <p className="text-slate-500 text-sm mt-1">Practice **DSA patterns** asked in top product companies like Google & Amazon.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-t border-slate-100">
             <div className="px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-widest border border-indigo-100">
                AI Integrated Coding Platform
             </div>
             <p className="text-slate-400 text-xs font-semibold tracking-wide uppercase italic">Level up your DSA game &bull; 2026 Edition</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Light Signup Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 uppercase italic">Initialize Account</h3>
            <p className="text-slate-500 font-medium italic">Start solving **DSA** problems with AI support.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
               <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-xs font-bold italic shadow-sm flex gap-2">
                 <ShieldAlert size={16} /> {error}
               </div>
            )}
            
            <div className="space-y-1.5 group">
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1 italic">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-slate-200 focus:border-indigo-400 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-300 outline-none transition-all shadow-sm focus:shadow-md"
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && <p className="text-[11px] text-red-500 mt-1 ml-1 font-bold italic">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1 italic">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  placeholder="Enter you email address"
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
                  placeholder="Minimum 8 characters"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-6 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-indigo-100 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1"
            >
              {loading ? <span className="loading loading-spinner loading-md"></span> : (
                <>START DSA JOURNEY <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center border-t border-slate-100 pt-8">
            <p className="text-slate-500 font-medium italic">
              Already solving on IntelliCode?{' '}
              <NavLink to="/login" className="text-indigo-600 hover:text-indigo-500 font-black transition-all hover:underline underline-offset-4 decoration-2">
                LOG IN
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;