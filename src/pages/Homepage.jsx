import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { 
  LogOut, Cpu, CheckCircle2, Circle, 
  Filter, Search, BrainCircuit, ChevronRight, 
  User as UserIcon, ShieldAlert, Hash, LayoutGrid, Terminal
} from 'lucide-react';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ difficulty: 'all', status: 'all', tag: 'all' });

  const availableTags = ['all', 'array', 'linkedList', 'graph', 'dp','math', 'string', 'recursion'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [probRes, solvedRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
        ]);
        setProblems(probRes.data);
        setSolvedProblems(solvedRes.data);
      } catch (error) {
        console.error('Data Fetching Error:', error);
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty.toLowerCase() === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags.toLowerCase() === filters.tag.toLowerCase();
    const isSolved = solvedProblems.some(sp => sp._id === problem._id);
    const statusMatch = filters.status === 'all' || (filters.status === 'solved' ? isSolved : !isSolved);
    const searchMatch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    return difficultyMatch && statusMatch && searchMatch && tagMatch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* Slim Executive Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 transition-transform group-hover:scale-105">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
              Abhi <span className="text-indigo-600">IntelliCode</span>
            </span>
          </NavLink>

          {/* Professional Profile Section */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center gap-2.5 p-1.5 pr-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100">
                <UserIcon size={18} strokeWidth={2.5} />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[11px] font-black text-slate-900 uppercase leading-none">{user?.firstName}</p>
                {user?.role === 'admin' ? (
                  <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest italic"> Admin</span>
                ) : (
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active User</span>
                )}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow-2xl menu dropdown-content bg-white border border-slate-200 rounded-2xl w-64 animate-in fade-in slide-in-from-top-2">
              <li className="px-4 py-3 border-b border-slate-50 mb-1">
                <p className="text-sm font-black text-slate-900 uppercase italic">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.emailId}</p>
              </li>
              {user?.role === 'admin' && (
                <li><NavLink to="/admin" className="text-indigo-600 font-bold py-2"><ShieldAlert size={16}/> Management Terminal</NavLink></li>
              )}
              <li><button onClick={handleLogout} className="text-slate-500 hover:text-rose-600 font-bold py-2"><LogOut size={16}/> Terminate Link</button></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Compact Filter Sidebar */}
        <aside className="w-full lg:w-60 space-y-4">
          <div className="bg-white border border-slate-200 rounded-[1.5rem] p-5 shadow-sm sticky top-20">
            <h4 className="flex items-center gap-2 mb-5 text-slate-900 font-black uppercase text-[10px] tracking-[0.2em]">
              <Filter size={14} className="text-indigo-600" /> Filter Engine
            </h4>
            
            <div className="space-y-6">
              {/* Complexity - Compact Dots/Pills */}
              <div className="space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tier</p>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'easy', 'medium', 'hard'].map(d => (
                    <button key={d} onClick={() => setFilters({...filters, difficulty: d})}
                      className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase transition-all border ${filters.difficulty === d ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-indigo-300'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Select - Slim */}
              <div className="pt-4 border-t border-slate-50 space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Trace</p>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[10px] font-bold text-slate-600 outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-pointer"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Problem</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-slate-900 rounded-[1.5rem] p-5 relative overflow-hidden shadow-lg border-b-4 border-indigo-600">
             <BrainCircuit className="absolute -right-2 -bottom-2 text-white/5 w-16 h-16" />
             <h4 className="text-white font-black text-xs mb-1 italic">AI INTEGRATED</h4>
             <p className="text-indigo-300 text-[9px] font-bold uppercase tracking-widest leading-tight opacity-70 italic">Pattern analysis active.</p>
          </div>
        </aside>

        {/* Dynamic Problems Feed */}
        <section className="flex-1 space-y-4">
          
          {/* Header Row: Search + Horizontal Tags */}
          <div className="bg-white border border-slate-200 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search problem signature..." 
                className="w-full bg-transparent py-2.5 pl-11 pr-4 text-xs font-bold outline-none italic placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-6 w-[1px] bg-slate-100 hidden md:block" />
            
            {/* Horizontal Tag Filtering - Pro Look */}
            <div className="flex gap-1 overflow-x-auto no-scrollbar py-1 px-2 w-full md:w-auto">
               {availableTags.map(tag => (
                 <button 
                    key={tag} 
                    onClick={() => setFilters({...filters, tag: tag})}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${filters.tag === tag ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' : 'text-slate-400 hover:text-slate-600 border border-transparent'}`}
                 >
                   #{tag}
                 </button>
               ))}
            </div>
          </div>

          {/* Compact Problem List */}
          <div className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
            {filteredProblems.length > 0 ? filteredProblems.map((problem, idx) => (
              <NavLink 
                key={problem._id} 
                to={`/problem/${problem._id}`}
                className={`flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-all group ${idx !== filteredProblems.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${solvedProblems.some(sp => sp._id === problem._id) ? 'bg-emerald-50 border-emerald-100 text-emerald-500' : 'bg-slate-50 border-slate-100 text-slate-200 group-hover:bg-white group-hover:text-indigo-400'}`}>
                    {solvedProblems.some(sp => sp._id === problem._id) ? <CheckCircle2 size={16} strokeWidth={3} /> : <Terminal size={14} strokeWidth={3} />}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase italic tracking-tight">
                      {problem.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${getDiffColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                         {problem.tags}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                   <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Execute Node</span>
                   <ChevronRight size={14} className="text-indigo-600" />
                </div>
              </NavLink>
            )) : (
              <div className="p-20 text-center flex flex-col items-center">
                <LayoutGrid size={32} className="text-slate-100 mb-3" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No Data Signal Found</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

const getDiffColor = (d) => {
  switch (d.toLowerCase()) {
    case 'easy': return 'text-emerald-500';
    case 'medium': return 'text-amber-500';
    case 'hard': return 'text-rose-500';
    default: return 'text-slate-400';
  }
};

export default Homepage;