import React, { useState } from 'react';
import './index.css';
import ChatPage from './components/ChatPage';
import HowItWorksPage from './components/HowItWorksPage';

export default function App() {
  const [page, setPage] = useState('chat');
  const [connectedKey, setConnectedKey] = useState('');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 15% 20%, rgba(55,138,221,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 85% 75%, rgba(4,44,83,0.6) 0%, transparent 70%),
          linear-gradient(160deg, #042c53 0%, #020d1a 55%, #010d1f 100%)`
      }} />
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(rgba(55,138,221,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(55,138,221,0.06) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      {/* Orbs */}
      <div style={{ position:'fixed', width:320, height:320, top:-80, left:-80, borderRadius:'50%', background:'radial-gradient(circle, rgba(55,138,221,0.12) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', width:500, height:500, bottom:-150, right:-100, borderRadius:'50%', background:'radial-gradient(circle, rgba(12,68,124,0.25) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      {/* Sidebar */}
      <Sidebar page={page} setPage={setPage} connectedKey={connectedKey} setConnectedKey={setConnectedKey} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, minWidth: 0 }}>
        {page === 'chat'
          ? <ChatPage connectedKey={connectedKey} />
          : <HowItWorksPage />
        }
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, connectedKey, setConnectedKey }) {
  const [keyVal, setKeyVal] = useState('');
  const [keyShown, setKeyShown] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | connected | error
  const [statusMsg, setStatusMsg] = useState('No key connected');

  function connectKey() {
    const v = keyVal.trim();
    if (!v) { setStatus('error'); setStatusMsg('Please enter a key first'); return; }
    if (!v.startsWith('sk-ant-')) { setStatus('error'); setStatusMsg('Key format looks wrong'); return; }
    setConnectedKey(v);
    setStatus('connected');
    setStatusMsg('Connected: ' + v.slice(0, 10) + '…' + v.slice(-4));
  }

  const dotColor = status === 'connected' ? '#4ade80' : status === 'error' ? '#f87171' : '#a8c4d8';
  const msgColor = status === 'connected' ? '#4ade80' : status === 'error' ? '#f87171' : '#a8c4d8';

  const quickPrompts = [
    { icon: '🩺', label: 'Type 2 diabetes symptoms', text: 'What are the common symptoms of Type 2 diabetes?' },
    { icon: '❤️', label: 'Blood pressure explained', text: 'Explain how blood pressure readings work and what numbers are considered healthy.' },
    { icon: '🦠', label: 'Bacterial vs viral infection', text: 'What are the differences between bacterial and viral infections?' },
    { icon: '📊', label: 'Understanding BMI', text: 'What does the BMI scale mean and what are its limitations?' },
    { icon: '💊', label: 'Immune-boosting nutrients', text: 'What vitamins and minerals are essential for a healthy immune system?' },
  ];

  function setPrompt(text) {
    window.__setPrompt && window.__setPrompt(text);
    setPage('chat');
  }

  return (
    <aside style={{
      width: 290, flexShrink: 0, display: 'flex', flexDirection: 'column',
      padding: '2rem 1.5rem', borderRight: '1px solid rgba(55,138,221,0.15)',
      background: 'rgba(4,44,83,0.45)', backdropFilter: 'blur(12px)',
      position: 'relative', zIndex: 2
    }}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'2.5rem' }}>
        <div style={{ width:38, height:38, background:'#378ADD', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily:'DM Serif Display, serif', fontSize:20, color:'#fff', lineHeight:1.1 }}>MediAssist</div>
          <div style={{ fontSize:10, color:'#85B7EB', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:1 }}>AI Medical Guide</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display:'flex', gap:6, marginBottom:'1.5rem' }}>
        {[['chat','Chat'], ['how','How It Works']].map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)} style={{
            flex: 1, padding:'7px 0', borderRadius:8, border:'1px solid',
            borderColor: page === id ? '#378ADD' : 'rgba(55,138,221,0.2)',
            background: page === id ? 'rgba(55,138,221,0.18)' : 'transparent',
            color: page === id ? '#B5D4F4' : '#6b8faa',
            fontSize:12, fontWeight:500, cursor:'pointer',
            fontFamily:'DM Sans, sans-serif', transition:'all 0.15s'
          }}>{label}</button>
        ))}
      </div>

      {/* API Key */}
      <div style={{ marginBottom:'1.5rem' }}>
        <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'#85B7EB', fontWeight:500, marginBottom:8 }}>Your API Key</div>
        <div style={{ position:'relative' }}>
          <input
            type={keyShown ? 'text' : 'password'}
            value={keyVal}
            onChange={e => setKeyVal(e.target.value)}
            placeholder="sk-ant-api03-…"
            style={{
              width:'100%', background:'rgba(55,138,221,0.1)', border:'1px solid rgba(55,138,221,0.25)',
              borderRadius:8, padding:'9px 36px 9px 11px', fontSize:12,
              fontFamily:'SF Mono, Fira Code, monospace', color:'#B5D4F4', outline:'none'
            }}
          />
          <button onClick={() => setKeyShown(s => !s)} style={{
            position:'absolute', right:9, top:'50%', transform:'translateY(-50%)',
            background:'none', border:'none', cursor:'pointer', color:'#85B7EB', padding:2, display:'flex'
          }}>
            {keyShown
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        </div>
        <button onClick={connectKey} style={{
          width:'100%', marginTop:8, padding:'9px 0',
          background:'#185FA5', border:'none', borderRadius:8,
          color:'#fff', fontFamily:'DM Sans, sans-serif', fontSize:13, fontWeight:500,
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:7,
          transition:'background 0.15s'
        }}
          onMouseEnter={e => e.currentTarget.style.background='#378ADD'}
          onMouseLeave={e => e.currentTarget.style.background='#185FA5'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          Connect API Key
        </button>
        <div style={{ marginTop:7, display:'flex', alignItems:'center', gap:6, minHeight:18 }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:dotColor, flexShrink:0 }} />
          <span style={{ color:msgColor, fontSize:11.5 }}>{statusMsg}</span>
        </div>
      </div>

      {/* Quick Questions */}
      <div style={{ marginBottom:'1.5rem' }}>
        <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'#85B7EB', fontWeight:500, marginBottom:8 }}>Quick Questions</div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {quickPrompts.map((q, i) => (
            <button key={i} onClick={() => setPrompt(q.text)} style={{
              background:'rgba(55,138,221,0.08)', border:'1px solid rgba(55,138,221,0.18)',
              borderRadius:8, padding:'9px 11px', textAlign:'left', cursor:'pointer',
              color:'#B5D4F4', fontSize:12.5, fontFamily:'DM Sans, sans-serif', lineHeight:1.4,
              transition:'background 0.15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(55,138,221,0.18)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(55,138,221,0.08)'; e.currentTarget.style.color='#B5D4F4'; }}
            >
              <span style={{ marginRight:7 }}>{q.icon}</span>{q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ marginTop:'auto', background:'rgba(163,48,32,0.12)', border:'1px solid rgba(163,48,32,0.25)', borderRadius:8, padding:'10px 11px', fontSize:11, color:'rgba(255,197,188,0.85)', lineHeight:1.5 }}>
        <strong style={{ display:'block', color:'#ffb8ac', fontWeight:500, marginBottom:3 }}>⚠️ Medical Disclaimer</strong>
        This assistant provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment.
      </div>
    </aside>
  );
}
