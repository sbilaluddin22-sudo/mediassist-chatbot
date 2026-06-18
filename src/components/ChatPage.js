import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are MediAssist, a knowledgeable and empathetic medical information assistant. Your role is to provide accurate, evidence-based health and medical information to help users understand medical topics, symptoms, conditions, medications, nutrition, and general wellness.

Guidelines:
- Provide clear, accurate, and educational medical information.
- Use plain language but include proper medical terminology when helpful, explaining it.
- Always remind users that your responses are for informational purposes and not a substitute for professional medical advice.
- For symptoms that could indicate emergencies (chest pain, stroke signs, severe allergic reactions, etc.), immediately direct the user to call emergency services.
- Be empathetic, respectful, and non-judgmental.
- Structure longer answers with clear sections when appropriate.
- Do not diagnose conditions or prescribe treatments.
- If a question is outside general medical knowledge or too specific, recommend consulting a doctor or pharmacist.`;

const CHIPS = [
  { label: 'Diabetes types', text: 'What is the difference between Type 1 and Type 2 diabetes?' },
  { label: 'How vaccines work', text: 'Explain how vaccines work in simple terms.' },
  { label: 'Stroke warning signs', text: 'What are warning signs of a stroke?' },
  { label: 'About cholesterol', text: 'What does cholesterol do in the body?' },
  { label: 'Immune system', text: 'How does the immune system fight infections?' },
];

export default function ChatPage({ connectedKey }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState([]);
  const chatRef = useRef(null);
  const taRef = useRef(null);

  // Allow sidebar to set prompt via global
  useEffect(() => {
    window.__setPrompt = (text) => {
      setInput(text);
      setTimeout(() => taRef.current?.focus(), 50);
    };
    return () => { delete window.__setPrompt; };
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, busy, errors]);

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 130) + 'px';
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  async function send(overrideText) {
    const text = (overrideText || input).trim();
    if (!text || busy) return;
    if (!connectedKey) {
      setErrors(prev => [...prev, 'Connect your API key first using the sidebar.']);
      return;
    }
    setInput('');
    if (taRef.current) { taRef.current.style.height = 'auto'; }
    setBusy(true);

    const history = [...messages, { role: 'user', content: text }];
    setMessages(history);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': connectedKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: history
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrors(prev => [...prev, 'API error: ' + (err.error?.message || `HTTP ${res.status}`)]);
        setMessages(prev => prev.slice(0, -1));
      } else {
        const data = await res.json();
        const reply = data.content?.[0]?.text || '(no response)';
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      }
    } catch {
      setErrors(prev => [...prev, 'Network error — check your connection.']);
      setMessages(prev => prev.slice(0, -1));
    }
    setBusy(false);
  }

  const showWelcome = messages.length === 0 && !busy;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'#f3f8fd' }}>
      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.75rem', borderBottom:'1px solid #e6f0f9', background:'#fff', flexShrink:0 }}>
        <span style={{ fontSize:14, fontWeight:500, color:'#0c447c' }}>Medical Information Assistant</span>
        <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:'#4a6b8a' }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:'#378ADD', animation:'pulse 2.4s ease infinite' }} />
          Online
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatRef} style={{ flex:1, overflowY:'auto', padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.25rem', scrollBehavior:'smooth' }}>
        {showWelcome && (
          <div style={{ margin:'auto', textAlign:'center', maxWidth:420 }}>
            <div style={{ width:64, height:64, background:'linear-gradient(135deg,#E6F1FB 0%,#B5D4F4 100%)', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.25rem', border:'1px solid #B5D4F4' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h2 style={{ fontFamily:'DM Serif Display, serif', fontSize:22, color:'#042c53', marginBottom:8 }}>How can I help you today?</h2>
            <p style={{ fontSize:14, color:'#4a6b8a', lineHeight:1.65 }}>Ask me about symptoms, medications, anatomy, medical conditions, nutrition, or general health guidance.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginTop:'1.25rem' }}>
              {CHIPS.map((c, i) => (
                <button key={i} onClick={() => send(c.text)} style={{
                  background:'#E6F1FB', border:'1px solid #B5D4F4', borderRadius:20,
                  padding:'6px 14px', fontSize:12.5, color:'#1255a0', cursor:'pointer',
                  fontFamily:'DM Sans, sans-serif', transition:'background 0.15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#B5D4F4'}
                  onMouseLeave={e => e.currentTarget.style.background='#E6F1FB'}
                >{c.label}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', gap:11, alignItems:'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', animation:'msgIn 0.22s ease' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:500, flexShrink:0, background: m.role === 'assistant' ? '#0c447c' : '#e6f0f9', color: m.role === 'assistant' ? '#B5D4F4' : '#4a6b8a', border: m.role === 'assistant' ? '1px solid #185FA5' : '1px solid #d4e4f0' }}>
              {m.role === 'assistant' ? '+' : 'You'}
            </div>
            <div style={{ maxWidth:'72%', padding:'11px 15px', fontSize:14, lineHeight:1.7, whiteSpace:'pre-wrap', wordBreak:'break-word', background: m.role === 'assistant' ? '#fff' : '#0c447c', color: m.role === 'assistant' ? '#0f1520' : '#E6F1FB', border: m.role === 'assistant' ? '1px solid #e6f0f9' : 'none', borderRadius: m.role === 'assistant' ? '4px 14px 14px 14px' : '14px 4px 14px 14px', boxShadow: m.role === 'assistant' ? '0 1px 3px rgba(12,68,124,0.06)' : 'none' }}>
              {m.content}
            </div>
          </div>
        ))}

        {busy && (
          <div style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:500, flexShrink:0, background:'#0c447c', color:'#B5D4F4', border:'1px solid #185FA5' }}>+</div>
            <div style={{ background:'#fff', border:'1px solid #e6f0f9', borderRadius:'4px 14px 14px 14px', padding:'14px 16px', display:'flex', gap:5, alignItems:'center' }}>
              {[0, 0.22, 0.44].map((d, i) => (
                <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#378ADD', animation:`blink 1.3s ${d}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {errors.map((err, i) => (
          <div key={i} style={{ fontSize:13, color:'#a33020', background:'#fff0ee', border:'1px solid #ffc5bc', borderRadius:9, padding:'9px 13px', display:'flex', alignItems:'center', gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {err}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ borderTop:'1px solid #e6f0f9', background:'#fff', padding:'1rem 1.75rem 1.25rem', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:10, background:'#f3f8fd', border:'1.5px solid #B5D4F4', borderRadius:14, padding:'10px 10px 10px 16px' }}>
          <textarea
            ref={taRef}
            rows={1}
            value={input}
            onChange={e => { setInput(e.target.value); autoResize(e.target); }}
            onKeyDown={handleKey}
            placeholder="Ask a medical question…"
            style={{ flex:1, border:'none', outline:'none', resize:'none', fontFamily:'DM Sans, sans-serif', fontSize:14, color:'#0f1520', background:'transparent', lineHeight:1.55, maxHeight:130, overflow:'auto' }}
          />
          <button onClick={() => send()} disabled={busy} style={{ width:36, height:36, borderRadius:9, background: busy ? '#d4e4f0' : '#185FA5', border:'none', cursor: busy ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background 0.15s' }}
            onMouseEnter={e => { if (!busy) e.currentTarget.style.background='#378ADD'; }}
            onMouseLeave={e => { if (!busy) e.currentTarget.style.background='#185FA5'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <p style={{ fontSize:11, color:'#a8c4d8', marginTop:8, textAlign:'center' }}>For emergencies, call 911 or your local emergency number immediately.</p>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes blink { 0%,60%,100%{opacity:0.25;transform:scale(1)} 30%{opacity:1;transform:scale(1.25)} }
      `}</style>
    </div>
  );
}
