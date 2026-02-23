import { useState, useEffect, useRef } from 'react';
import { useParams, NavLink } from 'react-router';
import Editor from '@monaco-editor/react';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import { 
  Play, Send, Code, MessageSquare, BookOpen, 
  History, Lightbulb, ChevronRight, Cpu, Sparkles, Terminal, Eye, X, Info
} from 'lucide-react';

const langMap = { cpp: 'C++', java: 'Java', javascript: 'JavaScript' };

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let { problemId } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const langEntry = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]);
        setProblem(response.data);
        setCode(langEntry?.initialCode || '');
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const langEntry = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]);
      if (langEntry) setCode(langEntry.initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => setCode(value || '');
  const handleEditorDidMount = (editor) => (editorRef.current = editor);
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, { code, language: selectedLanguage });
      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, { code, language: selectedLanguage });
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading && !problem) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <span className="loading loading-spinner text-indigo-600"></span>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden selection:bg-indigo-100 font-sans">
      
      {/* Slim Executive Header */}
      <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow hover:scale-105 transition-transform">
            <Cpu size={16} />
          </NavLink>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate max-w-[400px] italic">
            {problem?.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 shadow-inner">
              <Sparkles size={10} className="text-indigo-600 animate-pulse" />
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest italic">AI Assistant</span>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Compact Content */}
        <div className="w-[40%] flex flex-col border-r border-slate-200 bg-white z-10 shadow-sm">
          <div className="flex gap-1 p-1.5 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar">
            {[
              { id: 'description', icon: <BookOpen size={12}/>, label: 'Problem' },
              { id: 'solutions', icon: <Eye size={12}/>, label: 'Solutions' },
              { id: 'chatAI', icon: <MessageSquare size={12} className="text-indigo-600"/>, label: 'AI' },
              { id: 'editorial', icon: <Lightbulb size={12}/>, label: 'Guide tutorial' },
              { id: 'submissions', icon: <History size={12}/>, label: 'Submissions' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveLeftTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeLeftTab === tab.id ? 'bg-white text-indigo-700 shadow border border-slate-200' : 'text-slate-400 hover:text-slate-700'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
            {problem && (
              <div className="animate-in fade-in duration-500">
                {activeLeftTab === 'description' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">{problem.difficulty}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg tracking-widest">{problem.tags}</span>
                    </div>

                    <div className="pb-4 border-b border-slate-50">
                       <p className="text-slate-900 text-base leading-relaxed font-bold italic tracking-tight whitespace-pre-wrap">
                        {problem.description}
                       </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                         <div className="w-4 h-[2px] bg-indigo-600" /> Validation Units
                      </h3>
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-slate-50/50 rounded-2xl p-5 border border-slate-200 group hover:border-indigo-400 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5">
                          <p className="text-[9px] font-black text-indigo-600 uppercase mb-4 italic tracking-widest underline underline-offset-4 decoration-indigo-100">Case ID: 0{index + 1}</p>
                          
                          <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                            <div className="flex items-center gap-3">
                              <span className="text-slate-400 font-bold uppercase w-12 text-[8px]">Input</span> 
                              <span className="text-slate-900 bg-slate-100 px-2 py-1 rounded-md font-bold truncate">{example.input}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-slate-400 font-bold uppercase w-12 text-[8px]">Output</span> 
                              <span className="text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md font-black border border-indigo-100 truncate">{example.output}</span>
                            </div>
                            {example.explanation && (
                              <div className="pt-3 border-t border-slate-200/50 text-slate-500 font-medium italic">
                                <span className="font-black text-slate-400 uppercase text-[8px] mr-1">Trace:</span> {example.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeLeftTab === 'solutions' && (
                  <div className="space-y-4">
                    {problem.referenceSolution?.map((sol, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                          <span className="text-[9px] font-black uppercase text-indigo-700 tracking-widest">{sol.language} Stack</span>
                        </div>
                        <pre className="p-4 bg-[#1e1e1e] text-emerald-400 text-xs overflow-x-auto leading-relaxed font-mono">
                          <code>{sol.completeCode}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {activeLeftTab === 'chatAI' && <ChatAi problem={problem} />}
                {activeLeftTab === 'editorial' && <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} />}
                {activeLeftTab === 'submissions' && <SubmissionHistory problemId={problemId} />}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: High-Density Editor */}
        <div className="flex-1 flex flex-col bg-[#1E1E1E]">
          <div className="h-10 bg-[#1E1E1E] border-b border-white/5 flex items-center justify-between px-5 shrink-0">
             <div className="flex gap-1.5 bg-black/40 p-1 rounded-lg">
                {['javascript', 'java', 'cpp'].map((lang) => (
                  <button key={lang} onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${selectedLanguage === lang ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {langMap[lang]}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-50">Sync Active</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             </div>
          </div>

          <div className="flex-1 relative">
            <Editor height="100%" language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage} value={code} theme="vs-dark" onChange={handleEditorChange} onMount={handleEditorDidMount}
              options={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", minimap: { enabled: false }, padding: { top: 20 }, automaticLayout: true, renderLineHighlight: 'all', cursorSmoothCaretAnimation: "on", smoothScrolling: true }}
            />
          </div>

          <div className="h-12 bg-[#171717] border-t border-white/5 flex items-center justify-between px-6 shrink-0">
            <button onClick={() => setActiveRightTab('testcase')} className="flex items-center gap-2 text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-widest italic group transition-all">
              <Terminal size={14} className="group-hover:text-indigo-400" /> Terminal Console
            </button>
            <div className="flex gap-3">
              <button disabled={loading} onClick={handleRun} className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-white text-[9px] font-black uppercase tracking-widest active:scale-95 disabled:opacity-50">
                <Play size={12} fill="currentColor" /> Run
              </button>
              <button disabled={loading} onClick={handleSubmitCode} className="flex items-center gap-2 px-5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50">
                <Send size={12} /> Submit 
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT FLOATING RESULT OVERLAY */}
      {(activeRightTab === 'testcase' || activeRightTab === 'result') && (
        <div className="absolute bottom-16 right-6 w-[360px] bg-white shadow-2xl border border-slate-200 z-50 animate-in slide-in-from-bottom duration-300 rounded-[2rem] overflow-hidden flex flex-col">
           <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Execution Log</span>
              </div>
              <button onClick={() => setActiveRightTab('code')} className="text-slate-400 hover:text-red-500 transition-all"><X size={16}/></button>
           </div>
           <div className="p-6 overflow-y-auto max-h-[300px] custom-scrollbar bg-[#F8FAFC]">
              {activeRightTab === 'testcase' && (
                <div className="animate-in fade-in duration-300">
                   {runResult ? (
                      <div className={`p-4 rounded-xl border ${runResult.success ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                         <h4 className={`text-[10px] font-black uppercase italic mb-3 ${runResult.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {runResult.success ? '✓ Matrix Logic Verified' : '✗ Protocol Error'}
                         </h4>
                         <div className="grid grid-cols-2 gap-3">
                            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-inner"><p className="text-[8px] text-slate-400 font-black uppercase mb-1">Time</p><p className="text-xs font-black text-slate-900">{runResult.runtime}s</p></div>
                            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-inner"><p className="text-[8px] text-slate-400 font-black uppercase mb-1">Memory</p><p className="text-xs font-black text-slate-900">{runResult.memory}kb</p></div>
                         </div>
                      </div>
                   ) : <div className="text-center py-8 text-slate-400 font-black uppercase text-[9px] italic">Awaiting Module Input...</div>}
                </div>
              )}
              {activeRightTab === 'result' && (
                <div className="animate-in zoom-in-95 duration-300 text-center py-4">
                   {submitResult && (
                      <div className={`p-6 rounded-[2rem] border-2 shadow-xl ${submitResult.accepted ? 'bg-indigo-50 border-indigo-100' : 'bg-rose-50 border-rose-100'}`}>
                         <h2 className={`text-4xl font-black italic uppercase tracking-tighter ${submitResult.accepted ? 'text-indigo-600' : 'text-rose-600'}`}>
                            {submitResult.accepted ? 'Accepted' : 'Failed'}
                         </h2>
                         <p className="mt-3 text-slate-900 font-bold italic text-xs tracking-tight">
                            Score: {submitResult.passedTestCases} / {submitResult.totalTestCases} Logic Modules
                         </p>
                      </div>
                   )}
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ProblemPage;