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

/* Auto-loads your media from src/assets named 1, 2, 3 ... (png, jpg, jpeg, gif, webp) */
const mediaModules = import.meta.glob('../assets/*.{png,jpg,jpeg,gif,webp}', {
    eager: true,
    import: 'default',
});

const mediaImages = Object.entries(mediaModules)
    .map(([path, src]) => ({ n: Number(path.match(/\/(\d+)\.[a-z]+$/i)?.[1]), src }))
    .filter((m) => Number.isFinite(m.n))
    .sort((a, b) => a.n - b.n)
    .map((m) => ({ src: m.src, alt: `Converge preview ${m.n}` }));

/* hero image sits in the centre, your media flies out around it (max 7 total) */
const zoomImages = [{ src: heroImage, alt: 'Converge interactive canvas' }, ...mediaImages].slice(0, 7);

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