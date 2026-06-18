import React, { useState } from 'react';

const STEPS = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Get Your API Key',
    desc: 'Sign up at console.anthropic.com and generate your personal Anthropic API key. Your key starts with sk-ant- and is unique to your account.',
    tip: 'Keep your API key private — never share it publicly.',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: 'Connect Your Key',
    desc: 'Paste your API key into the input field in the sidebar and click "Connect API Key". A green indicator confirms a successful connection.',
    tip: 'Your key stays in your browser session only — it is never stored or sent anywhere other than Anthropic\'s API.',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Ask Medical Questions',
    desc: 'Type your health question in the chat box or choose a quick question from the sidebar. MediAssist will provide clear, evidence-based information.',
    tip: 'Be specific in your questions for more detailed and accurate answers.',
  },
  {
    num: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'Review & Follow Up',
    desc: 'Read the response carefully. You can ask follow-up questions to go deeper on any topic. The AI remembers your conversation context within the session.',
    tip: 'Always consult a licensed healthcare professional before making medical decisions.',
  },
];

const FAQS = [
  {
    q: 'Is MediAssist a replacement for a real doctor?',
    a: 'No. MediAssist provides general health education and information only. It cannot diagnose conditions, prescribe treatments, or replace professional medical advice. Always consult a qualified healthcare provider for personal health decisions.',
  },
  {
    q: 'Is my conversation private?',
    a: 'Your messages are sent directly to Anthropic\'s API using your own key. MediAssist does not store, log, or share your conversations. The conversation history only exists in your browser tab for the current session.',
  },
  {
    q: 'What topics can I ask about?',
    a: 'You can ask about symptoms, medical conditions, medications, anatomy, nutrition, preventive health, mental wellness, lab results interpretation, and general medical terminology. For very specific clinical questions, MediAssist will recommend consulting a specialist.',
  },
  {
    q: 'Why do I need my own API key?',
    a: 'Using your own Anthropic API key means you have direct control over your data and usage. It also allows you to use the service at your own usage tier without any intermediary storing your conversations.',
  },
  {
    q: 'What should I do in a medical emergency?',
    a: 'Call 911 (or your local emergency number) immediately. Do not rely on an AI assistant during emergencies. MediAssist will always direct you to emergency services for urgent situations like chest pain, difficulty breathing, stroke symptoms, or severe allergic reactions.',
  },
];

const CAPABILITIES = [
  { icon: '🩺', title: 'Symptoms & Conditions', desc: 'Understand common symptoms and what medical conditions they may relate to.' },
  { icon: '💊', title: 'Medications & Dosage', desc: 'Learn about drug classes, how medications work, and general dosage information.' },
  { icon: '🧬', title: 'Anatomy & Biology', desc: 'Explore how the human body works, organ systems, and biological processes.' },
  { icon: '🥗', title: 'Nutrition & Wellness', desc: 'Get guidance on healthy eating, vitamins, minerals, and lifestyle habits.' },
  { icon: '🧠', title: 'Mental Health', desc: 'Understand mental health conditions, therapy approaches, and coping strategies.' },
  { icon: '📋', title: 'Lab Results', desc: 'Decode common lab values and understand what they may indicate.' },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background:'#f3f8fd', minHeight:'100vh', overflowY:'auto' }}>
      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.75rem', borderBottom:'1px solid #e6f0f9', background:'#fff', position:'sticky', top:0, zIndex:10 }}>
        <span style={{ fontSize:14, fontWeight:500, color:'#0c447c' }}>How It Works</span>
        <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:'#4a6b8a' }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:'#378ADD' }} />
          MediAssist AI Guide
        </div>
      </div>

      <div style={{ maxWidth:780, margin:'0 auto', padding:'2.5rem 2rem 4rem' }}>

        {/* Hero */}
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#E6F1FB', border:'1px solid #B5D4F4', borderRadius:20, padding:'5px 14px', fontSize:12, color:'#185FA5', marginBottom:'1rem' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Powered by Claude AI
          </div>
          <h1 style={{ fontFamily:'DM Serif Display, serif', fontSize:32, color:'#042c53', lineHeight:1.2, marginBottom:'0.75rem' }}>
            Your AI-powered<br />medical information guide
          </h1>
          <p style={{ fontSize:15, color:'#4a6b8a', lineHeight:1.7, maxWidth:520, margin:'0 auto' }}>
            MediAssist uses advanced AI to help you understand health topics clearly and confidently — always reminding you when to seek professional care.
          </p>
        </div>

        {/* Steps */}
        <section style={{ marginBottom:'3rem' }}>
          <h2 style={{ fontFamily:'DM Serif Display, serif', fontSize:22, color:'#042c53', marginBottom:'1.5rem' }}>Getting started</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ background:'#fff', border:'1px solid #e6f0f9', borderRadius:14, padding:'1.25rem 1.5rem', boxShadow:'0 1px 4px rgba(12,68,124,0.05)' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:'#E6F1FB', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:'#378ADD', fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>Step {s.num}</div>
                    <div style={{ fontSize:15, fontWeight:500, color:'#042c53' }}>{s.title}</div>
                  </div>
                </div>
                <p style={{ fontSize:13.5, color:'#4a6b8a', lineHeight:1.65, marginBottom:10 }}>{s.desc}</p>
                <div style={{ display:'flex', gap:6, alignItems:'flex-start', background:'#f3f8fd', borderRadius:8, padding:'7px 10px' }}>
                  <span style={{ fontSize:12, flexShrink:0 }}>💡</span>
                  <span style={{ fontSize:12, color:'#6b8faa', lineHeight:1.55 }}>{s.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section style={{ marginBottom:'3rem' }}>
          <h2 style={{ fontFamily:'DM Serif Display, serif', fontSize:22, color:'#042c53', marginBottom:'1.5rem' }}>What you can ask</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
            {CAPABILITIES.map((c, i) => (
              <div key={i} style={{ background:'#fff', border:'1px solid #e6f0f9', borderRadius:12, padding:'1rem 1.1rem', boxShadow:'0 1px 3px rgba(12,68,124,0.04)' }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
                <div style={{ fontSize:13.5, fontWeight:500, color:'#042c53', marginBottom:4 }}>{c.title}</div>
                <p style={{ fontSize:12.5, color:'#6b8faa', lineHeight:1.55 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How the AI works */}
        <section style={{ marginBottom:'3rem' }}>
          <h2 style={{ fontFamily:'DM Serif Display, serif', fontSize:22, color:'#042c53', marginBottom:'1.5rem' }}>How the AI works</h2>
          <div style={{ background:'#fff', border:'1px solid #e6f0f9', borderRadius:14, padding:'1.5rem', boxShadow:'0 1px 4px rgba(12,68,124,0.05)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0 }}>
              {[
                { icon:'✍️', title:'You ask a question', desc:'Type your health question or pick a quick topic from the sidebar.' },
                { icon:'⚡', title:'Claude AI processes it', desc:'Your message is securely sent to Anthropic\'s Claude model with a medical-focused system prompt.' },
                { icon:'📖', title:'You receive an answer', desc:'Claude responds with clear, structured medical information and appropriate caveats.' },
              ].map((item, i) => (
                <div key={i} style={{ padding:'0 1.25rem', borderRight: i < 2 ? '1px solid #e6f0f9' : 'none', textAlign:'center' }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{item.icon}</div>
                  <div style={{ fontSize:13.5, fontWeight:500, color:'#042c53', marginBottom:6 }}>{item.title}</div>
                  <p style={{ fontSize:12.5, color:'#6b8faa', lineHeight:1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontFamily:'DM Serif Display, serif', fontSize:22, color:'#042c53', marginBottom:'1.5rem' }}>Frequently asked questions</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ background:'#fff', border:'1px solid #e6f0f9', borderRadius:12, overflow:'hidden', boxShadow:'0 1px 3px rgba(12,68,124,0.04)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width:'100%', padding:'1rem 1.25rem', display:'flex', alignItems:'center', justifyContent:'space-between',
                  background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:12,
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  <span style={{ fontSize:14, fontWeight:500, color:'#042c53' }}>{f.q}</span>
                  <span style={{ color:'#378ADD', fontSize:18, flexShrink:0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition:'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding:'0 1.25rem 1rem', fontSize:13.5, color:'#4a6b8a', lineHeight:1.7 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer banner */}
        <div style={{ background:'#fff0ee', border:'1px solid #ffc5bc', borderRadius:12, padding:'1.25rem 1.5rem', display:'flex', gap:12, alignItems:'flex-start' }}>
          <span style={{ fontSize:20, flexShrink:0 }}>⚠️</span>
          <div>
            <div style={{ fontSize:14, fontWeight:500, color:'#a33020', marginBottom:4 }}>Important Medical Disclaimer</div>
            <p style={{ fontSize:13, color:'#c04a35', lineHeight:1.65 }}>
              MediAssist is an educational tool and is not a licensed medical provider. The information provided is for general knowledge only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified physician or healthcare professional for personal health concerns. In case of a medical emergency, call 911 or your local emergency services immediately.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
