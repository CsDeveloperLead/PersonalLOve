
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Sparkles, Stars, Music, Coffee, Plane, Utensils, Gift, MessageCircle, Moon } from 'lucide-react';

const ProposalApp = () => {
  // Stages: 0 to 7 (8 total stages including final celebration)
  const [stage, setStage] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoButtonPos({ x: 0, y: 0 });
    setIsNoButtonMoved(false);
  }, [stage]);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    // Move within a safe range so it doesn't disappear completely but stays away from cursor
    const range = 150 + (stage * 10); 
    const newX = (Math.random() - 0.5) * range;
    const newY = (Math.random() - 0.5) * range;
    
    setNoButtonPos({ x: newX, y: newY });
    setIsNoButtonMoved(true);
  }, [stage]);

  const handleNext = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 1000);
    setStage((prev) => prev + 1);
  };

  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float text-rose-300 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 30 + 10}px`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div className="flex justify-center gap-2 mb-8">
      {[...Array(8)].map((_, i) => (
        <Heart 
          key={i} 
          size={16} 
          fill={i <= stage ? "#e11d48" : "transparent"} 
          className={`${i <= stage ? "text-rose-600 scale-125" : "text-rose-200"} transition-all duration-500`} 
        />
      ))}
    </div>
  );

  // Common button classes to ensure visibility
  const btnPrimary = "px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-all active:scale-95 z-20 flex items-center justify-center gap-2";
  const btnSecondary = "px-8 py-4 bg-white text-rose-500 border-2 border-rose-200 rounded-2xl text-xl font-bold shadow-md transition-all duration-150 flex items-center justify-center gap-2";

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4 overflow-hidden font-serif selection:bg-rose-200"
    >
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float { animation: float 10s linear infinite; }
        .pop-in { animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes pop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes burst {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        .heart-burst {
          position: fixed;
          pointer-events: none;
          animation: burst 0.8s ease-out forwards;
          color: #e11d48;
          z-index: 50;
        }
      `}</style>
      
      <FloatingHearts />
      {showHeartBurst && <Heart size={100} className="heart-burst top-1/2 left-1/2 -mt-[50px] -ml-[50px]" fill="currentColor" />}

      <div className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-md border border-white shadow-[0_15px_40px_rgba(225,29,72,0.1)] rounded-[2.5rem] p-8 md:p-10 text-center">
        <ProgressBar />

        {/* Stage 0: Initial Hook */}
        {stage === 0 && (
          <div className="space-y-6 pop-in">
            <Gift className="mx-auto text-rose-500" size={48} />
            <h2 className="text-2xl text-rose-400 font-handwritten italic">Hey Sumna...</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 leading-tight">
              Before we start, would you agree that I am your favorite person?
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 min-h-[140px] relative">
              <button onClick={handleNext} className={btnPrimary}>Haanji! ❤️</button>
              <button 
                onMouseEnter={moveNoButton} 
                style={isNoButtonMoved ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, position: 'absolute' } : {}} 
                className={btnSecondary}
              >
                No way
              </button>
            </div>
          </div>
        )}

        {/* Stage 1: Snack Protection */}
        {stage === 1 && (
          <div className="space-y-6 pop-in">
            <Utensils className="mx-auto text-rose-500" size={48} />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 leading-tight">
              Are you okay with me making unnecessary demands every single time like something (ChatPata)?
            </h1>
            <p className="text-rose-500 italic">"Sharing is caring" applies to your everything too!</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 min-h-[140px] relative">
              <button onClick={handleNext} className={btnPrimary}>Yes daddyyy!!!</button>
              <button onMouseEnter={moveNoButton} style={isNoButtonMoved ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, position: 'absolute' } : {}} className={btnSecondary}>Back off!</button>
            </div>
          </div>
        )}

        {/* Stage 2: Bad Cooking Clause */}
        {stage === 3 && (
          <div className="space-y-6 pop-in">
            <Coffee className="mx-auto text-rose-500" size={48} />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 leading-tight">
              Can you promise to pretend My cooking is good even if it's burnt?
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 min-h-[140px] relative">
              <button onClick={handleNext} className={btnPrimary}>yuppp!! ⭐</button>
              <button onMouseEnter={moveNoButton} style={isNoButtonMoved ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, position: 'absolute' } : {}} className={btnSecondary}>Seekh lo yrr</button>
            </div>
          </div>
        )}

        {/* Stage 3: The 3 AM Thought Check (Swapped order slightly for flow) */}
        {stage === 2 && (
          <div className="space-y-6 pop-in">
            <Moon className="mx-auto text-rose-500" size={48} />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 leading-tight">
              Are you ready for All of my random weird questions at 1 AM?
            </h1>
            <p className="text-rose-500 italic">Like "Would you still love me if I was a worm?"</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 min-h-[140px] relative">
              <button onClick={handleNext} className={btnPrimary}>Every night! 🌙</button>
              <button onMouseEnter={moveNoButton} style={isNoButtonMoved ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, position: 'absolute' } : {}} className={btnSecondary}>Go to sleep</button>
            </div>
          </div>
        )}

        {/* Stage 4: Travel/Adventure */}
        {stage === 4 && (
          <div className="space-y-6 pop-in">
            <Plane className="mx-auto text-rose-500 animate-bounce" size={48} />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 leading-tight">
              Would you like to explore the world of movies and shows with me?
            </h1>
            <p className="text-rose-500">From Action to some Real Action (you know what i mean!!)...</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 min-h-[140px] relative">
              <button onClick={handleNext} className={btnPrimary}>Try karungi! ✈️</button>
              <button onMouseEnter={moveNoButton} style={isNoButtonMoved ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, position: 'absolute' } : {}} className={btnSecondary}>I'm buzzy</button>
            </div>
          </div>
        )}

        {/* Stage 5: THE PROPOSAL */}
        {stage === 5 && (
          <div className="space-y-6 pop-in">
            <div className="flex justify-center gap-2 text-rose-500 mb-2">
              <Sparkles className="animate-pulse" />
              <Heart fill="currentColor" size={40} />
              <Sparkles className="animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-rose-900 leading-tight">
              Sumna... <br/> Will you marry me?
            </h1>
            <p className="text-rose-600 font-handwritten text-3xl">I want to be yours forever 💍</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-8 min-h-[140px] relative">
              <button onClick={handleNext} className={`${btnPrimary} scale-110 px-12 py-6`}>YES! ✨</button>
              <button onMouseEnter={moveNoButton} style={isNoButtonMoved ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`, position: 'absolute' } : {}} className={btnSecondary}>Let me think...</button>
            </div>
          </div>
        )}

        {/* Stage 6: The "No Refunds" Check */}
        {stage === 6 && (
          <div className="space-y-6 pop-in">
            <Stars className="mx-auto text-rose-500 animate-spin" size={48} />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800">
              Are you 1000% sure? Dekhle sochle ek moka or diya 💖
            </h1>
            <p className="text-rose-500 italic">No returns, no refunds, and no exchanges allowed!</p>
            <div className="pt-8">
              <button onClick={handleNext} className={`${btnPrimary} w-full`}>I'm Ready! 🥰</button>
            </div>
          </div>
        )}

        {/* Stage 7: Final Celebration */}
        {stage === 7 && (
          <div className="space-y-8 pop-in py-4">
            <div className="flex justify-center -space-x-4 mb-2">
              <Heart fill="#e11d48" className="text-rose-600 w-12 h-12 animate-bounce" />
              <Heart fill="#e11d48" className="text-rose-600 w-20 h-20 animate-pulse z-10" />
              <Heart fill="#e11d48" className="text-rose-600 w-12 h-12 animate-bounce" />
            </div>
            <h1 className="text-5xl font-bold text-rose-600 font-handwritten">You are Mine Now!!! 🎉</h1>
            <div className="bg-rose-50/80 p-6 rounded-3xl border-2 border-dashed border-rose-200 shadow-inner text-left">
              <p className="text-lg text-rose-900 leading-relaxed italic">
                "Sumna, you are my favorite person and now my forever. I promise to always be on your side, tell you bad jokes, teach you stupid random facts, and love you more with every breath."
              </p>
              <div className="mt-6 text-center">
                <p className="text-4xl font-bold text-rose-600 font-handwritten">I love you, Sumna!</p>
                <p className="mt-1 text-rose-400 font-bold uppercase tracking-widest text-[10px]">— Aftab —</p>
              </div>
            </div>
            <button 
              onClick={() => setStage(0)}
              className="text-rose-300 hover:text-rose-500 text-xs uppercase transition-colors"
            >
              Start the love story again?
            </button>
          </div>
        )}
      </div>

      <footer className="fixed bottom-6 text-rose-400 text-sm font-sans opacity-40 select-none">
        Always & Forever • Aftab & Sumna
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<ProposalApp />);
}
