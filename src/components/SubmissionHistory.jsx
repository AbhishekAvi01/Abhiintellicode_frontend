import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { 
  Code2, Clock, HardDrive, CheckCircle2, XCircle, 
  ChevronRight, Calendar, ExternalLink, AlertTriangle, Terminal 
} from 'lucide-react';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        setSubmissions(response.data);
      } catch (err) {
        setError('Failed to sync history');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [problemId]);

  const getStatusUI = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': 
        return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 size={14}/> };
      case 'wrong': 
        return { color: 'text-rose-600 bg-rose-50 border-rose-100', icon: <XCircle size={14}/> };
      default: 
        return { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <AlertTriangle size={14}/> };
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 animate-pulse">
      <span className="loading loading-spinner text-indigo-600"></span>
      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reading Logs...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Execution History</h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
           {submissions.length} Sequences Recorded
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
          <Terminal size={40} className="text-slate-200 mb-4" />
          <p className="text-slate-400 font-black italic text-sm">Empty Submission History,Please Submit your first problem</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {submissions.map((sub, index) => {
            const status = getStatusUI(sub.status);
            return (
              <div 
                key={sub._id}
                className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-default"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${status.color} shadow-sm`}>
                    {status.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <h3 className={`text-xs font-black uppercase italic ${status.color.split(' ')[0]}`}>
                        {sub.status}
                       </h3>
                       <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">&bull; {sub.language}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Clock size={10} /> {sub.runtime}s</span>
                       <span className="flex items-center gap-1"><HardDrive size={10} /> {sub.memory}kb</span>
                       <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(sub.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedSubmission(sub)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all group-hover:shadow-lg"
                >
                  Retrieve Code <ChevronRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* PRO CODE MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <div>
                  <div className="flex items-center gap-2">
                    <Code2 className="text-indigo-600" size={18} />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Signal Retrieval: {selectedSubmission.language}</h3>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Submission ID: {selectedSubmission._id.slice(-8)}</p>
               </div>
               <button onClick={() => setSelectedSubmission(null)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
                 <span className="text-lg font-black">&times;</span>
               </button>
            </div>

            <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-4 gap-4 mb-8">
                 {[
                   { label: 'Status', val: selectedSubmission.status, sub: `Passed ${selectedSubmission.testCasesPassed}/${selectedSubmission.testCasesTotal}`, color: getStatusUI(selectedSubmission.status).color },
                   { label: 'Runtime', val: `${selectedSubmission.runtime}s`, sub: 'Peak Efficiency', color: 'text-slate-800 bg-slate-50' },
                   { label: 'Memory', val: `${selectedSubmission.memory}kb`, sub: 'Buffer Mass', color: 'text-slate-800 bg-slate-50' },
                   { label: 'Language', val: selectedSubmission.language, sub: 'Source Stack', color: 'text-indigo-600 bg-indigo-50' }
                 ].map((stat, i) => (
                   <div key={i} className={`p-4 rounded-2xl border border-slate-100 shadow-inner ${stat.color}`}>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
                      <p className="text-sm font-black italic uppercase">{stat.val}</p>
                      <p className="text-[8px] font-bold opacity-50 mt-0.5">{stat.sub}</p>
                   </div>
                 ))}
              </div>

              {selectedSubmission.errorMessage && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 items-center text-rose-600 animate-pulse">
                   <AlertTriangle size={18} />
                   <p className="text-xs font-black italic uppercase tracking-tighter">{selectedSubmission.errorMessage}</p>
                </div>
              )}

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                 <div className="h-10 bg-[#1E1E1E] flex items-center px-4 border-b border-white/5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Source Code Buffer</span>
                 </div>
                 <pre className="p-8 bg-[#1e1e1e] text-emerald-400 text-xs overflow-x-auto leading-relaxed font-mono">
                    <code>{selectedSubmission.code}</code>
                 </pre>
              </div>
            </div>

            <div className="px-10 py-6 border-t border-slate-100 bg-slate-50 flex justify-end">
               <button onClick={() => setSelectedSubmission(null)} className="px-8 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                  Close Terminal
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;