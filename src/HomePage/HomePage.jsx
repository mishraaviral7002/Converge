// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Homepage.css';
// import heroImage from '../assets/hero.png';
//
// const HomePage = () => {
//     const navigate = useNavigate();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [scrollY, setScrollY] = useState(0);
//     const [email, setEmail] = useState('');
//     const [isSubscribed, setIsSubscribed] = useState(false);
//     const [copiedEmail, setCopiedEmail] = useState(false);
//
//     const canvasRef = useRef(null);
//     const scrollState = useRef({
//         current: 0,
//         target: 0,
//         isRunning: false
//     });
//
//     // ── Red Glowing Cursor Trail (Smooth Drawing Tail) ───────
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let animationFrameId;
//         let points = [];
//         const maxPoints = 22;
//
//         const resize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };
//         resize();
//         window.addEventListener('resize', resize);
//
//         const handleMouseMove = (e) => {
//             points.push({
//                 x: e.clientX,
//                 y: e.clientY,
//                 age: 0
//             });
//             if (points.length > maxPoints) {
//                 points.shift();
//             }
//         };
//
//         window.addEventListener('mousemove', handleMouseMove);
//
//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//             // Increment age and filter out expired points
//             for (let i = 0; i < points.length; i++) {
//                 points[i].age += 1;
//             }
//             points = points.filter(p => p.age < maxPoints);
//
//             if (points.length > 2) {
//                 for (let i = 1; i < points.length; i++) {
//                     const p1 = points[i - 1];
//                     const p2 = points[i];
//                     const progress = i / points.length;
//                     const alpha = progress * 0.85;
//                     const width = progress * 6 + 1.2;
//
//                     ctx.beginPath();
//                     ctx.moveTo(p1.x, p1.y);
//                     ctx.lineTo(p2.x, p2.y);
//                     ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
//                     ctx.lineWidth = width;
//                     ctx.lineCap = 'round';
//                     ctx.lineJoin = 'round';
//                     ctx.shadowColor = 'rgba(239, 68, 68, 0.75)';
//                     ctx.shadowBlur = 10;
//                     ctx.stroke();
//                 }
//
//                 // Glowing red cursor head
//                 const head = points[points.length - 1];
//                 if (head) {
//                     ctx.beginPath();
//                     ctx.arc(head.x, head.y, 4.5, 0, Math.PI * 2);
//                     ctx.fillStyle = '#ef4444';
//                     ctx.shadowColor = '#dc2626';
//                     ctx.shadowBlur = 14;
//                     ctx.fill();
//                 }
//             }
//
//             animationFrameId = requestAnimationFrame(animate);
//         };
//
//         animate();
//
//         return () => {
//             window.removeEventListener('resize', resize);
//             window.removeEventListener('mousemove', handleMouseMove);
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []);
//
//     // ── Buttery Smooth Momentum Scrolling ────────────────────
//     useEffect(() => {
//         const state = scrollState.current;
//         state.current = window.scrollY;
//         state.target = window.scrollY;
//         const ease = 0.075;
//
//         const render = () => {
//             state.current += (state.target - state.current) * ease;
//             window.scrollTo(0, state.current);
//             setScrollY(state.current);
//
//             if (Math.abs(state.target - state.current) > 0.4) {
//                 requestAnimationFrame(render);
//             } else {
//                 state.current = state.target;
//                 window.scrollTo(0, state.current);
//                 setScrollY(state.current);
//                 state.isRunning = false;
//             }
//         };
//
//         const handleWheel = (e) => {
//             e.preventDefault();
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             state.target += e.deltaY * 0.95;
//             state.target = Math.max(0, Math.min(state.target, maxScroll));
//
//             if (!state.isRunning) {
//                 state.isRunning = true;
//                 requestAnimationFrame(render);
//             }
//         };
//
//         const handleNativeScroll = () => {
//             if (!state.isRunning) {
//                 state.current = window.scrollY;
//                 state.target = window.scrollY;
//                 setScrollY(window.scrollY);
//             }
//         };
//
//         window.addEventListener('wheel', handleWheel, { passive: false });
//         window.addEventListener('scroll', handleNativeScroll, { passive: true });
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', handleNativeScroll);
//         };
//     }, []);
//
//     const toggleMenu = () => {
//         setIsMenuOpen(prev => !prev);
//     };
//
//     const scrollTo = (e, id) => {
//         e.preventDefault();
//         setIsMenuOpen(false);
//         const element = document.getElementById(id);
//         if (element) {
//             const targetY = element.getBoundingClientRect().top + window.scrollY - 70;
//             const state = scrollState.current;
//             state.target = targetY;
//             if (!state.isRunning) {
//                 state.isRunning = true;
//                 const ease = 0.08;
//                 const render = () => {
//                     state.current += (state.target - state.current) * ease;
//                     window.scrollTo(0, state.current);
//                     setScrollY(state.current);
//                     if (Math.abs(state.target - state.current) > 0.4) {
//                         requestAnimationFrame(render);
//                     } else {
//                         state.current = state.target;
//                         window.scrollTo(0, state.current);
//                         setScrollY(state.current);
//                         state.isRunning = false;
//                     }
//                 };
//                 requestAnimationFrame(render);
//             }
//         }
//     };
//
//     const handleSubscribe = (e) => {
//         e.preventDefault();
//         if (email.trim()) {
//             setIsSubscribed(true);
//         }
//     };
//
//     const handleCopyEmail = () => {
//         navigator.clipboard.writeText('aviralmishra7002@gmail.com');
//         setCopiedEmail(true);
//         setTimeout(() => setCopiedEmail(false), 2200);
//     };
//
//     return (
//         <div className="landingPage">
//             {/* Red Glowing Mouse Trail Canvas */}
//             <canvas
//                 ref={canvasRef}
//                 className="cursor-trail-canvas"
//             />
//
//             {/* Top Navigation */}
//             <nav className="navbar">
//                 <div className="logo-container">
//                     <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="logoText">
//                         converge<span className="logoDot">.</span>
//                     </a>
//                 </div>
//
//                 <div className={`nav-links-wrapper ${isMenuOpen ? 'open' : ''}`}>
//                     <ul className="menu">
//                         <li className="item"><a href="#idea" onClick={(e) => scrollTo(e, 'idea')}>The Idea</a></li>
//                         <li className="item"><a href="#inside" onClick={(e) => scrollTo(e, 'inside')}>What&apos;s Inside</a></li>
//                         <li className="item"><a href="#shift" onClick={(e) => scrollTo(e, 'shift')}>The Shift</a></li>
//                         <li className="item"><a href="#behind" onClick={(e) => scrollTo(e, 'behind')}>About Me</a></li>
//                     </ul>
//
//                     <div className="nav-buttons">
//                         <Link to="/Login" className="btn-login-nav">Log in</Link>
//                         <Link to="/Register" className="btn-register-nav">Register</Link>
//                     </div>
//                 </div>
//
//                 <button
//                     type="button"
//                     className={`hamburger ${isMenuOpen ? 'active' : ''}`}
//                     onClick={toggleMenu}
//                     aria-label="Toggle navigation menu"
//                 >
//                     <span className="bar"></span>
//                     <span className="bar"></span>
//                     <span className="bar"></span>
//                 </button>
//             </nav>
//
//             {/* Blue Marquee Ticker Banner */}
//             <div className="marqueeBanner">
//                 <div className="marqueeTrack">
//                     <span>SIGNAL</span> <span className="tickerDot">•</span>
//                     <span>SHINE</span> <span className="tickerDot">•</span>
//                     <span>TOGETHER</span> <span className="tickerDot">•</span>
//                     <span>BUILD</span> <span className="tickerDot">•</span>
//                     <span>SMARTER</span> <span className="tickerDot">•</span>
//                     <span>REAL-TIME WHITEBOARD</span> <span className="tickerDot">•</span>
//                     <span>SIGNAL</span> <span className="tickerDot">•</span>
//                     <span>SHINE</span> <span className="tickerDot">•</span>
//                     <span>TOGETHER</span> <span className="tickerDot">•</span>
//                     <span>BUILD</span> <span className="tickerDot">•</span>
//                     <span>SMARTER</span> <span className="tickerDot">•</span>
//                     <span>REAL-TIME WHITEBOARD</span> <span className="tickerDot">•</span>
//                 </div>
//             </div>
//
//             {/* SECTION 01: HERO WITH PARALLAX */}
//             <section className="FirstSection" id="home">
//                 {/* Horizontal Parallax Watermark Text */}
//                 <div
//                     className="heroWatermark"
//                     style={{ transform: `translateX(${-scrollY * 0.18}px)` }}
//                 >
//                     CONVERGE WHITEBOARD
//                 </div>
//
//                 <div className="ThingstoLeft">
//                     <div className="sectionTag">#1 — AI-POWERED COLLABORATIVE WHITEBOARD</div>
//                     <h1 className="mainHeading">
//                         Make room for <br />
//                         <span className="serifItalic">better thinking.</span>
//                     </h1>
//                     <p className="text">
//                         Converge turns scattered thoughts into shared momentum — a visual space to think together, build
//                         smarter, and move ideas forward without friction.
//                     </p>
//                     <div className="heroCtas">
//                         <a href="#idea" onClick={(e) => scrollTo(e, 'idea')} className="btnReadStory">Read the story →</a>
//                         <Link to="/Register" className="btnSeeLive">Open live app →</Link>
//                     </div>
//                     <div className="scrollIndicator">
//                         <span className="scrollText">SCROLL TO EXPLORE</span>
//                         <span className="scrollCount">01 / 05</span>
//                     </div>
//                 </div>
//
//                 {/* Hero Mockup with Vertical Parallax Offset */}
//                 <div
//                     className="ImageInRight"
//                     style={{ transform: `translateY(${-scrollY * 0.16}px)` }}
//                 >
//                     <div className="heroMockupWrapper">
//                         <img src={heroImage} alt="Converge interactive canvas" className="heroImg" />
//                         <div
//                             className="heroBadgeFloating"
//                             style={{ transform: `translateY(${scrollY * 0.08}px)` }}
//                         >
//                             <span className="pulseDot"></span>
//                             <span>Live collaborative whiteboard</span>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* SECTION 02: THE IDEA WITH PARALLAX */}
//             <section className="IdeaSection" id="idea">
//                 <div className="sectionTag">02 — THE IDEA</div>
//
//                 <div className="ideaContent">
//                     <div
//                         className="ideaLeft"
//                         style={{ transform: `translateY(${Math.max(-40, Math.min(40, (scrollY - 600) * 0.08))}px)` }}
//                     >
//                         <h2 className="ideaHeading">
//                             Good ideas <br />
//                             <span className="serifItalic">get better together.</span>
//                         </h2>
//                     </div>
//
//                     <div className="ideaRight">
//                         <p className="ideaParagraph">
//                             The best thinking rarely happens in a straight line. It&apos;s a question, a tangent, a sketch on the edge of a page — made clearer when someone else can see it too.
//                         </p>
//                         <p className="ideaParagraph">
//                             Converge is built for that in-between space: where an early thought becomes a shared direction, and a conversation becomes something you can see and interact with.
//                         </p>
//
//                         {/* Interactive Parallax Rotation Circle Button */}
//                         <Link
//                             to="/Register"
//                             className="circleExploreBtn"
//                             style={{
//                                 transform: `rotate(${scrollY * 0.08}deg) translateY(${Math.sin(scrollY * 0.005) * 12}px)`
//                             }}
//                         >
//                             <span>Open live app</span>
//                             <span className="btnArrow">↗</span>
//                         </Link>
//                     </div>
//                 </div>
//             </section>
//
//             {/* SECTION 03: WHAT'S INSIDE WITH STAGGERED PARALLAX CARDS */}
//             <section className="InsideSection" id="inside">
//                 <div className="sectionTag">03 — WHAT&apos;S INSIDE</div>
//                 <div className="insideHeader">
//                     <h2 className="insideHeading">From blank canvas to next move</h2>
//                     <p className="insideSub">One workspace for the messy beginning, the structured middle, and the moment everything clicks.</p>
//                 </div>
//
//                 <div className="featuresGrid">
//                     {/* Card 1 */}
//                     <div
//                         className="featureCard"
//                         style={{ transform: `translateY(${Math.sin((scrollY - 1100) * 0.004) * 14}px)` }}
//                     >
//                         <div className="cardTop">
//                             <span className="cardNumber">01</span>
//                             <div className="cardIcon">
//                                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M12 20h9"></path>
//                                     <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
//                                 </svg>
//                             </div>
//                         </div>
//                         <h3 className="cardTitle">Interactive whiteboard</h3>
//                         <p className="cardDesc">A flexible visual canvas for drawing, arranging thoughts, and finding the shape of an idea.</p>
//                         <Link to="/Register" className="cardArrow">↗</Link>
//                     </div>
//
//                     {/* Card 2 */}
//                     <div
//                         className="featureCard"
//                         style={{ transform: `translateY(${-Math.sin((scrollY - 1100) * 0.004) * 18}px)` }}
//                     >
//                         <div className="cardTop">
//                             <span className="cardNumber">02</span>
//                             <div className="cardIcon">
//                                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                                     <circle cx="9" cy="7" r="4"></circle>
//                                     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                                     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                                 </svg>
//                             </div>
//                         </div>
//                         <h3 className="cardTitle">Real-time collaboration</h3>
//                         <p className="cardDesc">Bring the room into one shared space: see the thinking happen, together and in the moment.</p>
//                         <Link to="/Register" className="cardArrow">↗</Link>
//                     </div>
//
//                     {/* Card 3 */}
//                     <div
//                         className="featureCard"
//                         style={{ transform: `translateY(${Math.sin((scrollY - 1100) * 0.004) * 16}px)` }}
//                     >
//                         <div className="cardTop">
//                             <span className="cardNumber">03</span>
//                             <div className="cardIcon">
//                                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"></path>
//                                 </svg>
//                             </div>
//                         </div>
//                         <h3 className="cardTitle">AI-powered brainstorming</h3>
//                         <p className="cardDesc">Use AI to kickstart thoughts, summarize the conversation, and reveal paths you missed.</p>
//                         <Link to="/Register" className="cardArrow">↗</Link>
//                     </div>
//
//                     {/* Card 4 */}
//                     <div
//                         className="featureCard"
//                         style={{ transform: `translateY(${-Math.sin((scrollY - 1100) * 0.004) * 20}px)` }}
//                     >
//                         <div className="cardTop">
//                             <span className="cardNumber">04</span>
//                             <div className="cardIcon">
//                                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                                     <line x1="16" y1="2" x2="16" y2="6"></line>
//                                     <line x1="8" y1="2" x2="8" y2="6"></line>
//                                     <line x1="3" y1="10" x2="21" y2="10"></line>
//                                 </svg>
//                             </div>
//                         </div>
//                         <h3 className="cardTitle">Intelligent planning</h3>
//                         <p className="cardDesc">Move from loose ideas to actionable workflows: organize steps without losing the why.</p>
//                         <Link to="/Register" className="cardArrow">↗</Link>
//                     </div>
//                 </div>
//             </section>
//
//             {/* SECTION 04: THE SHIFT (ROYAL BLUE WITH ORBITAL PARALLAX) */}
//             <section className="ShiftSection" id="shift">
//                 <div className="shiftContainer">
//                     <div className="shiftLeft">
//                         <div className="sectionTagLight">04 — THE SHIFT</div>
//                         <h2 className="shiftHeading">
//                             Less tab <br />
//                             <span className="shiftGoldItalic">More flow.</span>
//                         </h2>
//                         <p className="shiftText">
//                             When the map, the conversation, and the plan live together, the distance between &ldquo;what if?&rdquo; and &ldquo;let&apos;s do it&rdquo; gets a whole lot shorter.
//                         </p>
//                     </div>
//
//                     <div className="shiftRight">
//                         <div className="orbitalSystem">
//                             {/* Outer Orbit Rotating with Parallax */}
//                             <div
//                                 className="orbitRing orbitOuter"
//                                 style={{ transform: `rotate(${scrollY * 0.04}deg)` }}
//                             ></div>
//
//                             {/* Inner Orbit Rotating in Reverse */}
//                             <div
//                                 className="orbitRing orbitInner"
//                                 style={{ transform: `rotate(${-scrollY * 0.06}deg)` }}
//                             ></div>
//
//                             <div
//                                 className="orbitNode nodeThought"
//                                 style={{ transform: `translate(${Math.sin(scrollY * 0.004) * 10}px, ${Math.cos(scrollY * 0.004) * 8}px)` }}
//                             >
//                                 thought
//                             </div>
//                             <div
//                                 className="orbitNode nodeDiscussion"
//                                 style={{ transform: `translate(${Math.cos(scrollY * 0.004) * 12}px, ${Math.sin(scrollY * 0.004) * 10}px)` }}
//                             >
//                                 discussion
//                             </div>
//                             <div
//                                 className="orbitNode nodeAction"
//                                 style={{ transform: `translate(${-Math.sin(scrollY * 0.004) * 10}px, ${-Math.cos(scrollY * 0.004) * 12}px)` }}
//                             >
//                                 action
//                             </div>
//
//                             <div className="centralSun">
//                                 <span className="sunCore">✦</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* SECTION 05: BEHIND THE SCENE WITH STAMP PARALLAX */}
//             <section className="BehindSection" id="behind">
//                 <div className="sectionTag">05 — BEHIND THE SCENE</div>
//                 <div className="behindContent">
//                     <div className="behindBadgeBox">
//                         <div
//                             className="stampBox"
//                             style={{
//                                 transform: `translateY(${Math.sin((scrollY - 2200) * 0.003) * 18}px) rotate(${-3 + Math.sin(scrollY * 0.003) * 4}deg)`
//                             }}
//                         >
//                             <span>C / 01</span>
//                         </div>
//                     </div>
//
//                     <div className="behindStory">
//                         <h2 className="behindHeading">
//                             Hi, I&apos;m Aviral Mishra — <br />
//                             <span className="serifItalic">building Converge.</span>
//                         </h2>
//                         <p className="behindParagraph bioHighlight">
//                             I&apos;m a second-year BTech student at KJSCE (K. J. Somaiya College of Engineering), passionate about building intuitive tools at the intersection of AI, creative workflows, and real-time collaboration.
//                         </p>
//                         <p className="behindParagraph">
//                             I&apos;m interested in the gap between having an idea and knowing what to do with it next. Converge is my attempt to make that gap feel less lonely, less complicated, and a lot more visual.
//                         </p>
//                         <p className="behindParagraph">
//                             This is early. The product is still taking shape, and that&apos;s the point — the best version of it will be shaped with people who care about making things together.
//                         </p>
//                         <div className="madeInPublic">
//                             <span className="greenPulse"></span>
//                             <span>made in public • Aviral Mishra</span>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* SECTION 06: DIRECT CONTACT & FOOTER */}
//             <footer className="EarlyAccessSection" id="early-access">
//                 <div className="accessCard">
//                     <div className="accessLeft">
//                         <div className="sectionTagAccess">06 — DIRECT REACH & COLLABORATE</div>
//                         <h2 className="accessHeading">
//                             Have an idea, question, <br />
//                             <em>or want to build together?</em>
//                         </h2>
//                         <p className="accessSubtext" style={{ marginTop: '14px', marginBottom: '22px' }}>
//                             Whether it&apos;s feedback on the whiteboard, architectural thoughts, or a collaboration — drop me a direct message. I read and answer every email personally.
//                         </p>
//
//                         {/* Direct Email Address Pill with One-Click Copy */}
//                         <div className="directEmailPill">
//                             <a href="mailto:aviralmishra7002@gmail.com" className="emailLinkActual">
//                                 <span className="emailIconSymbol">✉</span>
//                                 <span className="emailTextActual">aviralmishra7002@gmail.com</span>
//                             </a>
//                             <button
//                                 type="button"
//                                 className="btnCopyEmailPill"
//                                 onClick={handleCopyEmail}
//                                 title="Click to copy email"
//                             >
//                                 {copiedEmail ? '✓ Copied!' : '⧉ Copy'}
//                             </button>
//                         </div>
//                     </div>
//
//                     <div className="accessRight">
//                         <div className="accessSubHeader">
//                             <h3 className="stayLoopTitle">Stay in the loop</h3>
//                             <p className="accessSubtext">
//                                 Leave your email for progress notes, early experimental releases, and upcoming canvas features.
//                             </p>
//                         </div>
//
//                         {isSubscribed ? (
//                             <div className="subscribedSuccess">
//                                 <span className="checkIcon">✓</span>
//                                 <span>Response posted! Thank you for joining.</span>
//                             </div>
//                         ) : (
//                             <form className="emailForm" onSubmit={handleSubscribe}>
//                                 <input
//                                     type="email"
//                                     placeholder="you@example.com"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="emailInput"
//                                 />
//                                 <button type="submit" className="btnSubmitEmail">
//                                     Response posted ↗
//                                 </button>
//                             </form>
//                         )}
//
//                         <div className="creatorMiniBadge">
//                             <div className="creatorAvatar">AM</div>
//                             <div className="creatorDetails">
//                                 <span className="creatorName">Aviral Mishra</span>
//                                 <span className="creatorTagline">KJSCE BTech &bull; Creator of Converge</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Bottom Bar */}
//                 <div className="bottomFooterBar">
//                     <div className="footerLogo">
//                         converge<span className="logoDot">.</span>
//                     </div>
//
//                     <div className="footerLinks">
//                         <a href="#idea" onClick={(e) => scrollTo(e, 'idea')}>The Idea</a>
//                         <a href="#inside" onClick={(e) => scrollTo(e, 'inside')}>What&apos;s Inside</a>
//                         <a href="#behind" onClick={(e) => scrollTo(e, 'behind')}>About me</a>
//                         <Link to="/Register" className="footerOpenApp">Open live app ↗</Link>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };
//
// export default HomePage;



import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import heroImage from '../assets/hero.png';
import ZoomParallax from './ZoomParallax';

const EMAIL = 'aviralmishra7002@gmail.com';

/* Small hand-drawn smiley: the recurring brand motif */
const Smile = ({ size = 28, className = '' }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
    >
        <circle cx="16" cy="18" r="3" fill="currentColor" />
        <circle cx="32" cy="18" r="3" fill="currentColor" />
        <path
            d="M10 29c3.5 8.5 24.5 8.5 28 0"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
);

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const zoomImages = [
    { src: heroImage, alt: 'Converge interactive canvas' },
    { src: u('photo-1522071820081-009f0129c71c'), alt: 'Team working together at a table' },
    { src: u('photo-1552664730-d307ca884978'), alt: 'Colleagues in a planning session' },
    { src: u('photo-1531482615713-2afd69097998'), alt: 'Team discussing ideas' },
    { src: u('photo-1517245386807-bb43f82c33c4'), alt: 'Group collaborating in an office' },
    { src: u('photo-1497366216548-37526070297c'), alt: 'Bright, open workspace' },
    { src: u('photo-1556761175-5973dc0f32e7'), alt: 'People gathered around a shared screen' },
];

const features = [
    {
        title: 'Interactive whiteboard',
        desc: 'A flexible canvas for drawing, arranging thoughts, and finding the shape of an idea.',
        icon: (
            <>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </>
        ),
    },
    {
        title: 'Real-time collaboration',
        desc: 'Bring the whole room into one shared space and watch the thinking happen together.',
        icon: (
            <>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </>
        ),
    },
    {
        title: 'AI-powered brainstorming',
        desc: 'Kickstart thoughts, summarize the conversation, and surface paths you might have missed.',
        icon: (
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
        ),
    },
    {
        title: 'Intelligent planning',
        desc: 'Turn loose ideas into actionable workflows, and keep the reasoning attached to every step.',
        icon: (
            <>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </>
        ),
    },
];

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const scrollTo = (e, id) => {
        e.preventDefault();
        setIsMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) setIsSubscribed(true);
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2200);
        } catch {
            /* clipboard unavailable: the mailto link still works */
        }
    };

    return (
        <div className="landingPage">
            {/* Navigation */}
            <header className="navbar">
                <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="logoText">
                    <span className="logoMark"><Smile size={18} /></span>
                    converge<span className="logoDot">.</span>
                </a>

                <div className={`nav-links-wrapper ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="menu">
                        <li><a href="#idea" onClick={(e) => scrollTo(e, 'idea')}>The idea</a></li>
                        <li><a href="#inside" onClick={(e) => scrollTo(e, 'inside')}>The method</a></li>
                        <li><a href="#shift" onClick={(e) => scrollTo(e, 'shift')}>The shift</a></li>
                        <li><a href="#behind" onClick={(e) => scrollTo(e, 'behind')}>The mind behind</a></li>
                    </ul>
                    <div className="nav-buttons">
                        <Link to="/Login" className="btn-login-nav">Log in</Link>
                        <Link to="/Register" className="btn-register-nav">Register</Link>
                    </div>
                </div>

                <button
                    type="button"
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen((p) => !p)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </header>

            <main>
                {/* Hero */}
                <section className="FirstSection" id="home">
                    <div className="heroCopy">
                        <p className="heroPill">
                            <span className="pulseDot"></span>
                            AI-powered collaborative whiteboard
                        </p>
                        <h1 className="mainHeading">
                            Make room for <span className="headingAccent">better thinking.</span>
                        </h1>
                        <p className="text">
                            Great teams read a problem before they solve it. Converge turns scattered thoughts into
                            a shared picture, so everyone sees the same thing and moves in the same direction.
                        </p>
                        <div className="heroCtas">
                            <Link to="/Register" className="btnPrimary">Open the live app</Link>
                            <a href="#idea" onClick={(e) => scrollTo(e, 'idea')} className="btnGhost">Read the story</a>
                        </div>
                    </div>

                    <div className="heroVisual">
                        <div className="heroFrame">
                            <img src={heroImage} alt="Converge interactive canvas" className="heroImg" />
                        </div>
                        <span className="heroSmile"><Smile size={44} /></span>
                    </div>
                </section>

                {/* Static value strip */}
                <div className="valueStrip">
                    <span>Signal</span>
                    <span>Shine</span>
                    <span>Together</span>
                    <span>Build smarter</span>
                    <span>Real-time whiteboard</span>
                </div>

                {/* The Idea */}
                <section className="IdeaSection" id="idea">
                    <h2 className="ideaHeading">
                        Good ideas get <span className="headingAccent">better together.</span>
                    </h2>
                    <div className="ideaRight">
                        <p className="ideaParagraph">
                            The best thinking rarely happens in a straight line. It is a question, a tangent, a sketch
                            in the margin, and it gets clearer when someone else can see it too.
                        </p>
                        <p className="ideaParagraph">
                            Converge is built for that in-between space, where an early thought becomes a shared
                            direction and a conversation becomes something you can see and work with.
                        </p>
                        <Link to="/Register" className="textLink">Start a canvas</Link>
                    </div>
                </section>

                {/* Zoom reveal */}
                <section className="zoomSection" aria-label="Converge in context">
                    <div className="zoomIntro">
                        <h2 className="zoomHeading">
                            Every room has a <span className="headingAccent">story.</span>
                        </h2>
                        <p className="zoomSub">Keep scrolling. The whole picture comes into focus.</p>
                    </div>
                    <ZoomParallax images={zoomImages} />
                </section>

                {/* The Method */}
                <section className="InsideSection" id="inside">
                    <div className="insideHeader">
                        <h2 className="insideHeading">From blank canvas to next move</h2>
                        <p className="insideSub">
                            One workspace for the messy beginning, the structured middle, and the moment everything clicks.
                        </p>
                    </div>

                    <div className="featuresGrid">
                        {features.map((f) => (
                            <article className="featureCard" key={f.title}>
                                <div className="cardIcon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        {f.icon}
                                    </svg>
                                </div>
                                <h3 className="cardTitle">{f.title}</h3>
                                <p className="cardDesc">{f.desc}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* The Shift */}
                <section className="ShiftSection" id="shift">
                    <div className="shiftContainer">
                        <div className="shiftLeft">
                            <h2 className="shiftHeading">
                                Fewer tabs. <span className="shiftAccent">More flow.</span>
                            </h2>
                            <p className="shiftText">
                                When the map, the conversation, and the plan live together, the distance between
                                &ldquo;what if?&rdquo; and &ldquo;let&apos;s do it&rdquo; gets a lot shorter.
                            </p>
                        </div>

                        <ol className="shiftSteps">
                            <li>
                                <span className="stepNum">1</span>
                                <div>
                                    <h3>Thought</h3>
                                    <p>Capture the raw idea on the canvas before it slips away.</p>
                                </div>
                            </li>
                            <li>
                                <span className="stepNum">2</span>
                                <div>
                                    <h3>Discussion</h3>
                                    <p>Talk it through with your team, right on top of the work.</p>
                                </div>
                            </li>
                            <li>
                                <span className="stepNum stepDone"><Smile size={22} /></span>
                                <div>
                                    <h3>Action</h3>
                                    <p>Turn the conclusion into a plan everyone can follow.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>

                {/* Behind */}
                <section className="BehindSection" id="behind">
                    <div className="behindBadgeBox">
                        <div className="stampBox"><Smile size={48} /></div>
                    </div>

                    <div className="behindStory">
                        <h2 className="behindHeading">
                            Hi, I&apos;m Aviral Mishra, <span className="headingAccent">building Converge.</span>
                        </h2>
                        <p className="behindParagraph bioHighlight">
                            I&apos;m a second-year BTech student at KJSCE (K. J. Somaiya College of Engineering),
                            building intuitive tools at the intersection of AI, creative workflows, and real-time
                            collaboration.
                        </p>
                        <p className="behindParagraph">
                            I&apos;m interested in the gap between having an idea and knowing what to do with it next.
                            Converge is my attempt to make that gap less lonely, less complicated, and far more visual.
                        </p>
                        <p className="behindParagraph">
                            It&apos;s early, and the product is still taking shape. The best version of it will be
                            shaped with people who care about making things together.
                        </p>
                        <div className="madeInPublic">
                            <span className="greenPulse"></span>
                            <span>Made in public by Aviral Mishra</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Contact & footer */}
            <footer className="EarlyAccessSection" id="early-access">
                <div className="accessCard">
                    <div className="accessLeft">
                        <h2 className="accessHeading">Have an idea, a question, or want to build together?</h2>
                        <p className="accessSubtext">
                            Feedback on the whiteboard, architectural thoughts, or a collaboration: send me a
                            message. I read and answer every email personally.
                        </p>

                        <div className="directEmailPill">
                            <a href={`mailto:${EMAIL}`} className="emailLinkActual">
                                <span className="emailIconSymbol" aria-hidden="true">✉</span>
                                <span>{EMAIL}</span>
                            </a>
                            <button type="button" className="btnCopyEmailPill" onClick={handleCopyEmail}>
                                {copiedEmail ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    <div className="accessRight">
                        <h3 className="stayLoopTitle">Stay in the loop</h3>
                        <p className="accessSubtext">
                            Leave your email for progress notes, early releases, and upcoming canvas features.
                        </p>

                        {isSubscribed ? (
                            <div className="subscribedSuccess" role="status">
                                <span className="checkIcon">✓</span>
                                <span>You&apos;re on the list. Thank you.</span>
                            </div>
                        ) : (
                            <form className="emailForm" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    aria-label="Email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="emailInput"
                                />
                                <button type="submit" className="btnSubmitEmail">Subscribe</button>
                            </form>
                        )}

                        <div className="creatorMiniBadge">
                            <div className="creatorAvatar">AM</div>
                            <div className="creatorDetails">
                                <span className="creatorName">Aviral Mishra</span>
                                <span className="creatorTagline">KJSCE BTech &bull; Creator of Converge</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottomFooterBar">
                    <div className="footerLogo">
                        converge<span className="logoDot">.</span>
                    </div>
                    <nav className="footerLinks" aria-label="Footer">
                        <a href="#idea" onClick={(e) => scrollTo(e, 'idea')}>The idea</a>
                        <a href="#inside" onClick={(e) => scrollTo(e, 'inside')}>The method</a>
                        <a href="#behind" onClick={(e) => scrollTo(e, 'behind')}>The mind behind</a>
                        <Link to="/Register" className="footerOpenApp">Open live app</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;