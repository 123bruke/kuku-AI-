import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Upload, 
  Settings, 
  User, 
  CheckCircle2, 
  Loader2, 
  Download, 
  Share2, 
  RefreshCw, 
  MessageSquare, 
  X, 
  Send,
  ChevronRight,
  Languages,
  GraduationCap,
  LayoutDashboard,
  Image as ImageIcon,
  FileUp,
  Moon,
  Sun,
  LogIn,
  Plus,
  History,
  Info,
  Paperclip,
  Sparkles,
  Cpu,
  Globe,
  Zap,
  FileText,
  Accessibility
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

// --- Types ---
type Theme = 'light' | 'dark';
type View = 'landing' | 'chat';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  file?: string;
  timestamp: Date;
}

// --- Components ---

const ThemeToggle = ({ theme, toggle }: { theme: Theme, toggle: () => void }) => (
  <motion.button 
    whileHover={{ scale: 1.2, rotate: 180 }}
    whileTap={{ scale: 0.8 }}
    onClick={toggle}
    className="group relative p-4 rounded-2xl liquid-glass transition-all text-blue-600 dark:text-blue-400 overflow-hidden shadow-2xl border-blue-500/20 preserve-3d"
  >
    <div className="absolute inset-0 bg-blue-400/20 animate-liquid" />
    <motion.div 
      initial={false}
      animate={{ rotate: theme === 'light' ? 0 : 360 }}
      className="relative z-10"
    >
      {theme === 'light' ? <Moon size={28} className="drop-shadow-lg" /> : <Sun size={28} className="drop-shadow-lg" />}
    </motion.div>
  </motion.button>
);

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={20} />
          </button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <LogIn className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400">Please sign in to access the Amharic AI Assistant</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full py-3.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-3 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              />
              <button 
                onClick={onLogin}
                className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Sign In
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ImmersiveHero = ({ onTry }: { onTry: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(sy, [-300, 300], [15, -15]);
  const rotateY = useTransform(sx, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 water-surface">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),transparent_80%)]" />
        <motion.div 
          style={{ x: useTransform(sx, (v) => v * 0.08), y: useTransform(sy, (v) => v * 0.08) }}
          className="absolute inset-0 opacity-40"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px] animate-liquid" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[150px] animate-liquid delay-1000" />
        </motion.div>
        
        {/* Moving AI Images Grid with 3D Tilt */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-8 p-12 opacity-30 pointer-events-none perspective-1000">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              style={{ 
                rotateX: useTransform(sy, [-500, 500], [10, -10]),
                rotateY: useTransform(sx, [-500, 500], [-10, 10]),
                translateZ: useTransform(sx, [-500, 500], [20, -20]),
              }}
              className="relative rounded-3xl overflow-hidden liquid-glass animate-liquid liquid-distort"
            >
              <img 
                src={`https://picsum.photos/seed/kuku-${i}/400/400`} 
                alt="AI" 
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-10 text-center px-6 preserve-3d"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, translateZ: 0 }}
          animate={{ opacity: 1, y: 0, translateZ: 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="preserve-3d"
        >
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full liquid-glass text-blue-400 text-xs font-black mb-12 animate-liquid shadow-[0_10px_30px_rgba(37,99,235,0.2)] border-blue-500/30">
            <Sparkles size={20} className="animate-pulse" />
            <span className="tracking-[0.5em] uppercase">KUKU AI: THE LIQUID INTELLIGENCE</span>
          </div>
          <h1 className="text-8xl md:text-[12rem] font-black mb-12 tracking-tighter leading-none preserve-3d">
            <span className="block water-drop-text drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] dripping-text">KUKU AI</span>
            <span className="text-2xl md:text-3xl text-blue-300/40 font-black tracking-[0.8em] mt-8 block uppercase">3D IMMERSIVE FLOW</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/40 max-w-3xl mx-auto mb-16 leading-relaxed font-black tracking-wide">
            DIVE INTO THE FUTURE. A FULLY WATERPROOF, 3D ANIMATED ASSISTANT 
            DESIGNED TO FLOW WITH YOUR EVERY MOVEMENT.
          </p>
          <button 
            onClick={onTry}
            className="group relative px-16 py-8 bg-blue-600/90 text-white font-black rounded-[40px] overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_30px_60px_rgba(37,99,235,0.5)] liquid-glass border-none preserve-3d"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-6 text-2xl tracking-[0.3em]">
              ENTER THE FLOW
              <ChevronRight size={32} className="group-hover:translate-x-4 transition-transform duration-500" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-slate-500 rounded-full" />
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase">Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

const InfoSection = () => (
  <section className="py-24 bg-white dark:bg-slate-950 px-6 water-surface">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="liquid-glass p-12 rounded-[40px] animate-liquid">
          <h2 className="text-5xl font-black water-drop-text mb-8">WHY KUKU AI?</h2>
          <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <p>
              KUKU AI is not just another assistant; it's a liquid intelligence that flows with your needs. 
              Our 3D immersive environment is designed to be fully waterproof, providing a seamless 
              and fluid experience for every user.
            </p>
            <p>
              From complex data analysis to creative storytelling, KUKU AI adapts its shape and logic 
              to match your unique workflow. Experience the clarity of water and the power of AI combined.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { icon: Cpu, label: 'Liquid Core', desc: 'Fluid Logic' },
              { icon: Globe, label: 'Global Flow', desc: 'Universal Support' },
              { icon: Zap, label: 'Hydro Speed', desc: 'Instant Response' },
              { icon: LayoutDashboard, label: '3D Surface', desc: 'Immersive UI' }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl liquid-glass hover:scale-105 transition-transform cursor-pointer group">
                <item.icon className="text-blue-500 mb-3 group-hover:animate-bounce" size={32} />
                <h4 className="font-black text-slate-900 dark:text-white text-sm tracking-widest">{item.label}</h4>
                <p className="text-xs text-slate-500 font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative perspective-1000">
          <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full animate-liquid" />
          <motion.div 
            whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
            className="relative rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-4 border-white/20 preserve-3d"
          >
            <img 
              src="https://picsum.photos/seed/kuku-tech/800/1000" 
              alt="KUKU AI Tech" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
                <span className="text-white text-lg font-black uppercase tracking-[0.5em] water-drop-text">FLOW ACTIVE</span>
              </div>
              <p className="text-blue-100/80 text-sm font-bold">Submerged in 100% pure intelligence.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const ChatInterface = ({ theme, onBack }: { theme: Theme, onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Hello! I am KUKU AI. How can I assist you in this liquid dimension today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([
    'KUKU AI Introduction',
    'Liquid Physics Research',
    '3D Environment Design',
    'Waterproof AI Specs'
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const sy = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: 'I have processed your request through my liquid core. What else can I do for you?', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    const file = e instanceof File ? e : e.target.files?.[0];
    if (file) {
      const userMsg: Message = { 
        id: Date.now().toString(), 
        role: 'user', 
        text: `Uploaded file: ${file.name}`, 
        file: file.name,
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, userMsg]);
      setIsProcessing(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          text: `I have received "${file.name}". Analyzing its contents now...`,
          timestamp: new Date()
        }]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div 
      className="flex h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 overflow-hidden relative water-surface"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-blue-600/30 backdrop-blur-md flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/20 dark:bg-slate-900/40 p-12 rounded-[40px] shadow-2xl border-4 border-dashed border-blue-400 liquid-glass animate-liquid flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-blue-400/20 rounded-full flex items-center justify-center animate-liquid">
                <Upload className="text-blue-400" size={48} />
              </div>
              <p className="text-2xl font-black text-white water-drop-text">DROP INTO THE FLOW</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-white/10 liquid-glass m-4 rounded-[32px] overflow-hidden">
        <div className="p-6">
          <button 
            onClick={onBack}
            className="w-full mb-4 py-3 px-4 liquid-glass flex items-center gap-3 text-sm font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-all"
          >
            <X size={18} />
            Return Home
          </button>
          <button className="w-full py-4 px-6 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 text-sm font-black hover:scale-105 transition-all shadow-lg shadow-blue-500/20 animate-liquid">
            <Plus size={20} />
            NEW SESSION
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 space-y-3 py-4">
          <div className="text-[10px] font-black text-blue-400/50 uppercase tracking-[0.3em] mb-4 px-2">Liquid History</div>
          {history.map((item, i) => (
            <button key={i} className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:liquid-glass transition-all flex items-center gap-3 truncate group">
              <History size={18} className="shrink-0 group-hover:rotate-180 transition-transform duration-500" />
              {item}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-blue-400 transition-colors">
            <Settings size={20} />
            System Config
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative m-4 rounded-[40px] overflow-hidden liquid-glass shadow-[0_30px_100px_rgba(0,0,0,0.2)] border-white/10">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-12 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-12">
            {messages.map((m) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className={`flex gap-8 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <motion.div 
                  style={{ 
                    rotateX: useTransform(sy, [-500, 500], [15, -15]),
                    rotateY: useTransform(sx, [-500, 500], [-15, 15]),
                    translateZ: 50
                  }}
                  className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-2xl animate-liquid preserve-3d border-2 ${
                    m.role === 'ai' ? 'bg-blue-600 text-white border-blue-400/50' : 'liquid-glass text-blue-400 border-blue-500/30'
                  }`}
                >
                  {m.role === 'ai' ? <Sparkles size={32} className="animate-pulse" /> : <User size={32} />}
                </motion.div>
                <div className={`flex flex-col gap-4 max-w-[85%] ${m.role === 'user' ? 'items-end' : ''}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`p-8 rounded-[40px] text-lg leading-relaxed liquid-glass shadow-2xl ${
                      m.role === 'ai' 
                        ? 'text-slate-800 dark:text-slate-100 border-blue-500/20 liquid-distort' 
                        : 'bg-blue-600/80 text-white shadow-blue-500/30 border-none'
                    }`}
                  >
                    {m.file && (
                      <div className="flex items-center gap-4 mb-6 p-4 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                        <FileText size={24} className="text-blue-300" />
                        <span className="font-black truncate uppercase tracking-widest text-xs">{m.file}</span>
                      </div>
                    )}
                    <span className={m.role === 'ai' ? 'water-drop-text font-black tracking-wide' : 'font-bold tracking-wide'}>{m.text}</span>
                  </motion.div>
                  <span className="text-[10px] text-blue-400/60 font-black uppercase tracking-[0.5em] px-4">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • FLOW SECURE
                  </span>
                </div>
              </motion.div>
            ))}
            {isProcessing && (
              <div className="flex gap-8">
                <div className="w-16 h-16 rounded-[24px] bg-blue-600 text-white flex items-center justify-center shrink-0 animate-liquid shadow-2xl">
                  <Loader2 size={32} className="animate-spin" />
                </div>
                <div className="liquid-glass p-8 rounded-[40px] flex gap-3 items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-4 text-xs font-black text-blue-400 uppercase tracking-[0.3em]">Processing Flow...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-10 border-t border-white/10 bg-white/5 backdrop-blur-3xl">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-[48px] blur-2xl opacity-20 group-focus-within:opacity-60 transition-opacity animate-pulse" />
              <div className="relative liquid-glass rounded-[40px] p-4 flex items-end gap-4 shadow-2xl border-blue-500/20">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 text-blue-400 hover:bg-blue-400/10 transition-all rounded-3xl"
                  title="Upload to Flow"
                >
                  <Paperclip size={30} />
                </motion.button>
                <textarea 
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Communicate with KUKU AI..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white py-5 px-6 resize-none max-h-48 outline-none font-black text-xl placeholder:text-blue-400/20 tracking-tight"
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-5 bg-blue-600 text-white rounded-3xl hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.4)] animate-liquid"
                >
                  <Send size={30} />
                </motion.button>
              </div>
            </div>
            <p className="text-[10px] text-center text-blue-400/30 mt-6 font-black uppercase tracking-[0.6em]">
              KUKU AI LIQUID CORE • SECURE SUBMERGED CONNECTION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccessibilitySection = () => (
  <section className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
          <Accessibility size={14} />
          Inclusive Design
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          Accessibility for Everyone
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          We believe AI should be accessible to all students and educators. Our platform is built with inclusivity at its core, ensuring a seamless experience regardless of ability.
        </p>
        <ul className="space-y-4">
          {[
            { icon: <Languages size={20} />, title: 'Full Amharic Support', desc: 'Native keyboard support and localized UI for Ethiopian users.' },
            { icon: <Sun size={20} />, title: 'High Contrast Modes', desc: 'Optimized light and dark themes for visual comfort.' },
            { icon: <Cpu size={20} />, title: 'Screen Reader Optimized', desc: 'Semantic HTML and ARIA labels for assistive technologies.' },
            { icon: <Zap size={20} />, title: 'Keyboard Navigation', desc: 'Full control of the application without a mouse.' }
          ].map((item, i) => (
            <li key={i} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 relative">
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-10" />
        <img 
          src="https://picsum.photos/seed/accessibility/800/600" 
          alt="Accessibility Features" 
          className="relative rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    setView('chat');
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 selection:bg-blue-500/30">
      {/* SVG Liquid Filter */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2">
              <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="15" />
          </filter>
        </defs>
      </svg>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-20 liquid-glass backdrop-blur-3xl border-b border-white/10 z-[100] flex items-center justify-between px-6 md:px-12 m-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('landing')}>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-liquid group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 preserve-3d">
            <span className="text-white font-black text-3xl drop-shadow-lg">K</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black water-drop-text tracking-tighter dripping-text">KUKU AI</h1>
            <span className="text-[8px] font-black text-blue-400 tracking-[0.5em] uppercase opacity-60">Liquid Core</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Upload', 'History', 'Settings'].map((item) => (
            <button 
              key={item}
              onClick={() => item === 'Home' ? setView('landing') : null}
              className="text-xs font-black text-slate-500 hover:text-blue-400 dark:text-slate-400 dark:hover:text-blue-300 tracking-[0.3em] uppercase transition-all hover:scale-110 active:scale-95"
            >
              {item}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-6">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          {isLoggedIn ? (
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase">Liquid User</p>
                <p className="text-[10px] text-blue-400 font-bold animate-pulse">FLOW: ACTIVE</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-blue-500 font-black shadow-xl animate-liquid border-2 border-blue-500/20 cursor-pointer"
              >
                KU
              </motion.div>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="group relative px-8 py-3 bg-blue-600 text-white text-xs font-black rounded-2xl overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-2xl shadow-blue-500/40 animate-liquid"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative tracking-widest">SIGN IN</span>
            </button>
          )}
        </div>
      </header>

      <main className="pt-24">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImmersiveHero onTry={() => isLoggedIn ? setView('chat') : setIsLoginModalOpen(true)} />
              <InfoSection />
              <AccessibilitySection />
              
              {/* Footer */}
              <footer className="py-24 border-t border-white/10 liquid-glass m-4 rounded-[40px] overflow-hidden">
                <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
                  <div className="col-span-2">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center animate-liquid">
                        <span className="text-white font-black text-2xl">K</span>
                      </div>
                      <span className="font-black text-3xl water-drop-text tracking-tighter">KUKU AI</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
                      The most advanced 3D liquid intelligence on the planet. 
                      Waterproof, immersive, and ready for the future.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-blue-400 mb-8 uppercase text-xs tracking-[0.4em]">Flow</h4>
                    <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                      <li><a href="#" className="hover:text-blue-400 transition-colors">Liquid Tech</a></li>
                      <li><a href="#" className="hover:text-blue-400 transition-colors">3D Core</a></li>
                      <li><a href="#" className="hover:text-blue-400 transition-colors">Waterproof API</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-blue-400 mb-8 uppercase text-xs tracking-[0.4em]">Support</h4>
                    <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                      <li><a href="#" className="hover:text-blue-400 transition-colors">Hydro Docs</a></li>
                      <li><a href="#" className="hover:text-blue-400 transition-colors">Flow Center</a></li>
                      <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="max-w-6xl mx-auto px-8 mt-24 pt-8 border-t border-white/10 text-center text-[10px] font-black text-blue-400/40 uppercase tracking-[0.5em]">
                  © 2026 KUKU AI • SUBMERGED IN EXCELLENCE
                </div>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="px-4"
            >
              <ChatInterface theme={theme} onBack={() => setView('landing')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
}
