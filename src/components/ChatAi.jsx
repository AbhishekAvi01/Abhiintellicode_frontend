import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Bot, User, Sparkles, AlertCircle, Terminal } from 'lucide-react';

function ChatAi({ problem }) {
    const [messages, setMessages] = useState([
        { role: 'model', parts: [{ text: "Hello! I am your IntelliCode AI. Stuck on the logic? Ask me for a hint or complexity analysis." }] }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const onSubmit = async (data) => {
        const userMessage = { role: 'user', parts: [{ text: data.message }] };
        setMessages(prev => [...prev, userMessage]);
        reset();
        setIsTyping(true);

        try {
            const response = await axiosClient.post("/ai/chat", {
                messages: [...messages, userMessage], // Include current message in context
                title: problem.title,
                description: problem.description,
                testCases: problem.visibleTestCases,
                startCode: problem.startCode
            });

            setMessages(prev => [...prev, { 
                role: 'model', 
                parts: [{ text: response.data.message }] 
            }]);
        } catch (error) {
            console.error("API Error:", error);
            setMessages(prev => [...prev, { 
                role: 'model', 
                parts: [{ text: "System connection breached. Please recalibrate your query." }]
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        /* Fix: flex-col with h-full and min-h ensures the container fills the left panel */
        <div className="flex flex-col h-full min-h-[500px] bg-white rounded-3xl overflow-hidden shadow-inner border border-slate-100 font-sans">
            
            {/* Chat Area - Fixed: Use flex-1 to push the input form to the bottom */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#F8FAFC]">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            {/* Avatar Icons */}
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-indigo-600 text-white"}`}>
                                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            {/* Message Content */}
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed font-bold italic shadow-sm border ${
                                msg.role === "user" 
                                ? "bg-white border-slate-200 text-slate-800 rounded-tr-none" 
                                : "bg-indigo-50 border-indigo-100 text-indigo-900 rounded-tl-none"
                            }`}>
                                {msg.parts[0].text}
                                {msg.role === 'model' && index === 0 && (
                                    <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center gap-1.5">
                                        <Sparkles size={12} className="text-indigo-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Context: {problem.title}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start animate-pulse">
                        <div className="flex gap-3 items-center bg-indigo-50 px-4 py-3 rounded-2xl border border-indigo-100">
                            <Terminal size={14} className="text-indigo-600" />
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Analyzing Logic...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Terminal - Sticky to Bottom */}
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="p-5 bg-white border-t-2 border-slate-100 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]"
            >
                <div className="relative group">
                    <input 
                        placeholder="Ask for a hint or discuss time complexity..." 
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white rounded-2xl py-4 pl-5 pr-14 text-sm font-bold text-slate-800 outline-none transition-all shadow-inner placeholder:text-slate-400" 
                        {...register("message", { required: true, minLength: 2 })}
                        autoComplete="off"
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-indigo-200 active:scale-90 disabled:opacity-50 disabled:bg-slate-300"
                        disabled={!!errors.message || isTyping}
                    >
                        <Send size={18} strokeWidth={2.5} />
                    </button>
                </div>
                <div className="mt-3 px-2 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                        <AlertCircle size={10} className="text-slate-400" />
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            AI Model: Matrix-V2 Active
                        </p>
                    </div>
                    {errors.message && <span className="text-[9px] font-black text-red-400 uppercase tracking-tighter italic">Signal too weak</span>}
                </div>
            </form>
        </div>
    );
}

export default ChatAi;