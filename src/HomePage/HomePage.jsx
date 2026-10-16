import { useState, useEffect, useRef } from 'react';
import './Homepage.css';
import heroImage from '../assets/hero.png';

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Refs for smooth inertia scrolling
    const scrollState = useRef({
        current: 0,
        target: 0,
        isRunning: false
    });

    // Buttery Smooth Momentum Scrolling Engine (Lenis / Locomotive style)
    useEffect(() => {
        const state = scrollState.current;
        state.current = window.scrollY;
        state.target = window.scrollY;
        const ease = 0.075; // Buttery inertia multiplier

        const render = () => {
            state.current += (state.target - state.current) * ease;
            window.scrollTo(0, state.current);
            setScrollY(state.current);

            if (Math.abs(state.target - state.current) > 0.4) {
                requestAnimationFrame(render);
            } else {
                state.current = state.target;
                window.scrollTo(0, state.current);
                setScrollY(state.current);
                state.isRunning = false;
            }
        };

        const handleWheel = (e) => {
            // Intercept mousewheel harsh steps and interpolate smoothly
            e.preventDefault();
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            state.target += e.deltaY * 0.95;
            state.target = Math.max(0, Math.min(state.target, maxScroll));

            if (!state.isRunning) {
                state.isRunning = true;
                requestAnimationFrame(render);
            }
        };

        const handleNativeScroll = () => {
            // Keep in sync if scrollbar or key navigation is used
            if (!state.isRunning) {
                state.current = window.scrollY;
                state.target = window.scrollY;
                setScrollY(window.scrollY);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleNativeScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleNativeScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const scrollTo = (e, id) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const targetY = element.getBoundingClientRect().top + window.scrollY - 70;
            const state = scrollState.current;
            state.target = targetY;
            if (!state.isRunning) {
                state.isRunning = true;
                const ease = 0.08;
                const render = () => {
                    state.current += (state.target - state.current) * ease;
                    window.scrollTo(0, state.current);
                    setScrollY(state.current);
                    if (Math.abs(state.target - state.current) > 0.4) {
                        requestAnimationFrame(render);
                    } else {
                        state.current = state.target;
                        window.scrollTo(0, state.current);
                        setScrollY(state.current);
                        state.isRunning = false;
                    }
                };
                requestAnimationFrame(render);
            }
        }
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
        }
    };

    return (
        <div className="landingPage">
            {/* Top Navigation */}
            <nav className="navbar">
                <div className="logo-container">
                    <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="logoText">
                        converge<span className="logoDot">.</span>
                    </a>
                </div>

                <div className={`nav-links-wrapper ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="menu">
                        <li className="item"><a href="#idea" onClick={(e) => scrollTo(e, 'idea')}>The Idea</a></li>
                        <li className="item"><a href="#inside" onClick={(e) => scrollTo(e, 'inside')}>What&apos;s Inside</a></li>
                        <li className="item"><a href="#shift" onClick={(e) => scrollTo(e, 'shift')}>The Shift</a></li>
                        <li className="item"><a href="#behind" onClick={(e) => scrollTo(e, 'behind')}>About Me</a></li>
                    </ul>

                    <div className="nav-buttons">
                        <a href="#early-access" onClick={(e) => scrollTo(e, 'early-access')} className="btn-app-link">Open live app ↗</a>
                    </div>
                </div>

                <button 
                    type="button" 
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </nav>

            {/* Blue Marquee Ticker Banner */}
            <div className="marqueeBanner">
                <div className="marqueeTrack">
                    <span>SIGNAL</span> <span className="tickerDot">•</span>
                    <span>SHINE</span> <span className="tickerDot">•</span>
                    <span>TOGETHER</span> <span className="tickerDot">•</span>
                    <span>BUILD</span> <span className="tickerDot">•</span>
                    <span>SMARTER</span> <span className="tickerDot">•</span>
                    <span>SIGNAL</span> <span className="tickerDot">•</span>
                    <span>SHINE</span> <span className="tickerDot">•</span>
                    <span>TOGETHER</span> <span className="tickerDot">•</span>
                    <span>BUILD</span> <span className="tickerDot">•</span>
                    <span>SMARTER</span> <span className="tickerDot">•</span>
                </div>
            </div>

            {/* SECTION 01: HERO WITH PARALLAX */}
            <section className="FirstSection" id="home">
                {/* Horizontal Parallax Watermark Text */}
                <div 
                    className="heroWatermark"
                    style={{ transform: `translateX(${-scrollY * 0.18}px)` }}
                >
                    CONVERGE WHITEBOARD
                </div>

                <div className="ThingstoLeft">
                    <div className="sectionTag">#1 — AI-POWERED COLLABORATIVE WHITEBOARD</div>
                    <h1 className="mainHeading">
                        Make room for <br />
                        <span className="serifItalic">better thinking.</span>
                    </h1>
                    <p className="text">
                        Converge turns scattered thoughts into shared momentum — a visual space to think together, build
                        smarter, and move ideas forward.
                    </p>
                    <div className="heroCtas">
                        <a href="#idea" onClick={(e) => scrollTo(e, 'idea')} className="btnReadStory">Read the story →</a>
                        <a href="#early-access" onClick={(e) => scrollTo(e, 'early-access')} className="btnSeeLive">See the live app →</a>
                    </div>
                    <div className="scrollIndicator">
                        <span className="scrollText">SCROLL TO EXPLORE</span>
                        <span className="scrollCount">01 / 05</span>
                    </div>
                </div>

                {/* Hero Mockup with Vertical Parallax Offset */}
                <div 
                    className="ImageInRight"
                    style={{ transform: `translateY(${-scrollY * 0.16}px)` }}
                >
                    <div className="heroMockupWrapper">
                        <img src={heroImage} alt="Converge interactive canvas" className="heroImg" />
                        <div 
                            className="heroBadgeFloating"
                            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                        >
                            <span className="pulseDot"></span>
                            <span>4+ people thinking</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 02: THE IDEA WITH PARALLAX */}
            <section className="IdeaSection" id="idea">
                <div className="sectionTag">02 — THE IDEA</div>

                <div className="ideaContent">
                    <div 
                        className="ideaLeft"
                        style={{ transform: `translateY(${Math.max(-40, Math.min(40, (scrollY - 600) * 0.08))}px)` }}
                    >
                        <h2 className="ideaHeading">
                            Good ideas <br />
                            <span className="serifItalic">get better together.</span>
                        </h2>
                    </div>

                    <div className="ideaRight">
                        <p className="ideaParagraph">
                            The best thinking rarely happens in a straight line. It&apos;s a question, a tangent, a sketch on the edge of a page — made clearer when someone else can see it too.
                        </p>
                        <p className="ideaParagraph">
                            Converge is being built for that in-between space: where an early thought becomes a shared direction, and a conversation becomes something you can see.
                        </p>

                        {/* Interactive Parallax Rotation Circle Button */}
                        <button 
                            type="button" 
                            className="circleExploreBtn"
                            style={{ 
                                transform: `rotate(${scrollY * 0.08}deg) translateY(${Math.sin(scrollY * 0.005) * 12}px)` 
                            }}
                        >
                            <span>Explore the canvas</span>
                            <span className="btnArrow">↗</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 03: WHAT'S INSIDE WITH STAGGERED PARALLAX CARDS */}
            <section className="InsideSection" id="inside">
                <div className="sectionTag">03 — WHAT&apos;S INSIDE</div>
                <div className="insideHeader">
                    <h2 className="insideHeading">From blank canvas to next move</h2>
                    <p className="insideSub">One workspace for the messy beginning, the structured middle, and the moment everything clicks.</p>
                </div>

                <div className="featuresGrid">
                    {/* Card 1 */}
                    <div 
                        className="featureCard"
                        style={{ transform: `translateY(${Math.sin((scrollY - 1100) * 0.004) * 14}px)` }}
                    >
                        <div className="cardTop">
                            <span className="cardNumber">01</span>
                            <div className="cardIcon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className="cardTitle">Interactive whiteboard</h3>
                        <p className="cardDesc">A flexible visual canvas for drawing, arranging thoughts, and finding the shape of an idea.</p>
                        <span className="cardArrow">↗</span>
                    </div>

                    {/* Card 2 */}
                    <div 
                        className="featureCard"
                        style={{ transform: `translateY(${-Math.sin((scrollY - 1100) * 0.004) * 18}px)` }}
                    >
                        <div className="cardTop">
                            <span className="cardNumber">02</span>
                            <div className="cardIcon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className="cardTitle">Real-time collaboration</h3>
                        <p className="cardDesc">Bring the room into one shared space: see the thinking happen, together and in the moment.</p>
                        <span className="cardArrow">↗</span>
                    </div>

                    {/* Card 3 */}
                    <div 
                        className="featureCard"
                        style={{ transform: `translateY(${Math.sin((scrollY - 1100) * 0.004) * 16}px)` }}
                    >
                        <div className="cardTop">
                            <span className="cardNumber">03</span>
                            <div className="cardIcon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className="cardTitle">AI-powered brainstorming</h3>
                        <p className="cardDesc">Use AI to kickstart thoughts, summarize the conversation, and reveal paths you missed.</p>
                        <span className="cardArrow">↗</span>
                    </div>

                    {/* Card 4 */}
                    <div 
                        className="featureCard"
                        style={{ transform: `translateY(${-Math.sin((scrollY - 1100) * 0.004) * 20}px)` }}
                    >
                        <div className="cardTop">
                            <span className="cardNumber">04</span>
                            <div className="cardIcon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                        </div>
                        <h3 className="cardTitle">Intelligent planning</h3>
                        <p className="cardDesc">Move from loose ideas to actionable workflows: organize steps without losing the why.</p>
                        <span className="cardArrow">↗</span>
                    </div>
                </div>
            </section>

            {/* SECTION 04: THE SHIFT (ROYAL BLUE WITH ORBITAL PARALLAX) */}
            <section className="ShiftSection" id="shift">
                <div className="shiftContainer">
                    <div className="shiftLeft">
                        <div className="sectionTagLight">04 — THE SHIFT</div>
                        <h2 className="shiftHeading">
                            Less tab <br />
                            <span className="shiftGoldItalic">More flow.</span>
                        </h2>
                        <p className="shiftText">
                            When the map, the conversation, and the plan live together, the distance between &ldquo;what if?&rdquo; and &ldquo;let&apos;s do it&rdquo; gets a whole lot shorter.
                        </p>
                    </div>

                    <div className="shiftRight">
                        <div className="orbitalSystem">
                            {/* Outer Orbit Rotating with Parallax */}
                            <div 
                                className="orbitRing orbitOuter"
                                style={{ transform: `rotate(${scrollY * 0.04}deg)` }}
                            ></div>

                            {/* Inner Orbit Rotating in Reverse */}
                            <div 
                                className="orbitRing orbitInner"
                                style={{ transform: `rotate(${-scrollY * 0.06}deg)` }}
                            ></div>
                            
                            <div 
                                className="orbitNode nodeThought"
                                style={{ transform: `translate(${Math.sin(scrollY * 0.004) * 10}px, ${Math.cos(scrollY * 0.004) * 8}px)` }}
                            >
                                thought
                            </div>
                            <div 
                                className="orbitNode nodeDiscussion"
                                style={{ transform: `translate(${Math.cos(scrollY * 0.004) * 12}px, ${Math.sin(scrollY * 0.004) * 10}px)` }}
                            >
                                discussion
                            </div>
                            <div 
                                className="orbitNode nodeAction"
                                style={{ transform: `translate(${-Math.sin(scrollY * 0.004) * 10}px, ${-Math.cos(scrollY * 0.004) * 12}px)` }}
                            >
                                action
                            </div>

                            <div className="centralSun">
                                <span className="sunCore">✦</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 05: BEHIND THE SCENE WITH STAMP PARALLAX */}
            <section className="BehindSection" id="behind">
                <div className="sectionTag">05 — BEHIND THE SCENE</div>
                <div className="behindContent">
                    <div className="behindBadgeBox">
                        <div 
                            className="stampBox"
                            style={{ 
                                transform: `translateY(${Math.sin((scrollY - 2200) * 0.003) * 18}px) rotate(${-3 + Math.sin(scrollY * 0.003) * 4}deg)` 
                            }}
                        >
                            <span>C / 01</span>
                        </div>
                    </div>

                    <div className="behindStory">
                        <h2 className="behindHeading">
                            Hi, I&apos;m Aviral Mishra — <br />
                            <span className="serifItalic">building Converge.</span>
                        </h2>
                        <p className="behindParagraph bioHighlight">
                            I&apos;m a second-year BTech student at KJSCE (K. J. Somaiya College of Engineering), passionate about building intuitive tools at the intersection of AI, creative workflows, and real-time collaboration.
                        </p>
                        <p className="behindParagraph">
                            I&apos;m interested in the gap between having an idea and knowing what to do with it next. Converge is my attempt to make that gap feel less lonely, less complicated, and a lot more visual.
                        </p>
                        <p className="behindParagraph">
                            This is early. The product is still taking shape, and that&apos;s the point — the best version of it will be shaped with people who care about making things together.
                        </p>
                        <div className="madeInPublic">
                            <span className="greenPulse"></span>
                            <span>made in public • Aviral Mishra</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 06: JOIN EARLY ACCESS & FOOTER */}
            <footer className="EarlyAccessSection" id="early-access">
                <div className="accessCard">
                    <div className="accessLeft">
                        <div className="sectionTagAccess">06 — JOIN EARLY ACCESS</div>
                        <h2 className="accessHeading">
                            Have a thought? <br />
                            <em>Let&apos;s converge.</em>
                        </h2>
                    </div>

                    <div className="accessRight">
                        <p className="accessSubtext">
                            Leave your email for notes, progress, and a chance to shape what comes next.
                        </p>

                        {isSubscribed ? (
                            <div className="subscribedSuccess">
                                <span className="checkIcon">✓</span>
                                <span>Response posted! Thank you for joining.</span>
                            </div>
                        ) : (
                            <form className="emailForm" onSubmit={handleSubscribe}>
                                <input 
                                    type="email" 
                                    placeholder="you@example.com" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="emailInput" 
                                />
                                <button type="submit" className="btnSubmitEmail">
                                    Response posted ↗
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bottomFooterBar">
                    <div className="footerLogo">
                        converge<span className="logoDot">.</span>
                    </div>

                    <div className="footerLinks">
                        <a href="#idea" onClick={(e) => scrollTo(e, 'idea')}>The Idea</a>
                        <a href="#inside" onClick={(e) => scrollTo(e, 'inside')}>What&apos;s Inside</a>
                        <a href="#behind" onClick={(e) => scrollTo(e, 'behind')}>About me</a>
                        <a href="#home" onClick={(e) => scrollTo(e, 'home')}>Open live app ↗</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
