
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashBoard.css';

const DashBoard = () => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');
    const [isAllowed, setIsAllowed] = useState(false);
    const [Loading, setIsLoading] = useState(true);
    const [nameConverge, setNameConverge] = useState('John Doe');
    const [emailConverge, setEmailConverge] = useState('');
    const [dashBoards, setDashBoards] = useState([]);
    const [copiedCode, setCopiedCode] = useState('');

    const handleCreateCanvas = async () => {
        try {
            const canvasName = window.prompt("Name your new whiteboard:", "Untitled Whiteboard");
            if (canvasName === null) return; // User cancelled

            const response = await fetch("https://converge-backend-t1.onrender.com/createDashBoard", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dashBoardname: canvasName.trim() || "Untitled Whiteboard",
                    aboutDashboard: "Collaborative whiteboard session",
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                const room = data.RoomCode || data.roomCode;
                navigate('/canvas/' + encodeURIComponent(room));
                return;
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Failed to create dashboard, status:", response.status, errorData);
                alert(`Error creating canvas: ${errorData.error || response.statusText || 'Server Error (500)'}`);
            }
        } catch (err) {
            console.log("Error creating canvas:", err);
        }
    };

    const handleJoinCanvas = (e) => {
        e.preventDefault();
        if (!roomCode.trim()) return;
        navigate('/canvas/' + encodeURIComponent(roomCode.trim()));
    };

    const handleCopyCode = (e, code) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(''), 2000);
    };

    const handleSwitchAccount = async () => {
        try {
            await fetch('https://converge-backend-t1.onrender.com/logout', {
                method: 'POST',
                credentials: 'include',
            });
            navigate('/Login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // useEffect(() => {
    //     async function gettingDashBoards() {
    //         try {
    //             const fetching = await fetch("https://converge-backend-t1.onrender.com/getCanvas", {
    //                 method: 'GET',
    //                 credentials: 'include',
    //             });
    //
    //             if (fetching.status === 200) {
    //                 const data = await fetching.json();
    //                 setDashBoards(data);
    //             } else {
    //                 console.error("Error getting dashboard data:", fetching.status);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //
    //     async function verifyLoggingIN() {
    //         try {
    //             const userInfo = await fetch(
    //                 "https://converge-backend-t1.onrender.com/checkForLoggedIn",
    //                 {
    //                     method: "GET",
    //                     credentials: 'include',
    //                 }
    //             );
    //
    //             if (userInfo.status === 401) {
    //                 window.location.href = '/login';
    //                 return;
    //             }
    //
    //             if (userInfo.status === 200) {
    //                 const data = await userInfo.json();
    //                 setNameConverge(data.name);
    //                 setEmailConverge(data.email);
    //                 setIsAllowed(true);
    //
    //                 await gettingDashBoards();
    //             } else {
    //                 setIsAllowed(false);
    //             }
    //         } catch (error) {
    //             console.log("Auth check error:", error);
    //             setIsAllowed(false);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //
    //     verifyLoggingIN();
    // }, []);

    useEffect(() => {
        async function gettingDashBoards() {
            try {
                const fetching = await fetch("https://converge-backend-t1.onrender.com/getCanvas", {
                    method: 'GET',
                    credentials: 'include',
                });

                if (fetching.status === 200) {
                    const data = await fetching.json();
                    setDashBoards(data);
                } else {
                    console.error("Error getting dashboard data:", fetching.status);
                }
            } catch (error) {
                console.log("Canvas fetch error:", error);
            }
        }

        async function verifyLoggingIN() {
            try {
                const userInfo = await fetch(
                    "https://converge-backend-t1.onrender.com/checkForLoggedIn",
                    {
                        method: "GET",
                        credentials: 'include',
                    }
                );

                // Handle unauthorized access gracefully via router navigation
                if (userInfo.status === 401) {
                    navigate('/login', { replace: true });
                    return;
                }

                if (userInfo.status === 200) {
                    // Call .json() EXACTLY ONCE
                    const data = await userInfo.json();
                    setNameConverge(data.name);
                    setEmailConverge(data.email);
                    setIsAllowed(true);

                    await gettingDashBoards();
                } else {
                    setIsAllowed(false);
                }
            } catch (error) {
                console.log("Auth check error:", error);
                setIsAllowed(false);
            } finally {
                setIsLoading(false);
            }
        }

        verifyLoggingIN();
    }, [navigate]);


    if (Loading) {
        return <div>Verifying your credentials, please wait...</div>;
    }

    if (!isAllowed) {
        return <div>⛔ Access Denied...</div>;
    }

    return (
        <div className="dashboard-page">
            {/* Ambient Background Glow */}
            <div className="dashboard-ambient-glow"></div>

            {/* Header with Logged-in State & Login Options */}
            <header className="dashboard-header">
                <div className="header-brand">
                    <Link to="/" className="brand-logo">
                        converge<span className="brand-dot">.</span>
                    </Link>
                    <span className="workspace-badge">Workspace</span>
                </div>

                <div className="header-user-section">
                    {/* Logged In User Profile Pill */}
                    <div className="user-profile-pill">
                        <div className="avatar-circle">
                            <span>
                                {nameConverge
                                    ? nameConverge.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                                    : 'U'}
                            </span>
                            <span className="online-dot" title="Active"></span>
                        </div>
                        <div className="user-meta">
                            <span className="user-name">{nameConverge}</span>
                            <span className="user-status-text">Logged in</span>
                        </div>
                    </div>

                    {/* Switch / Log In Option */}
                    <div className="header-actions">
                        <button className="btn-switch-account" onClick={handleSwitchAccount}>
                            Switch Account
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Area */}
            <main className="dashboard-main">
                <div className="dashboard-intro">
                    <h1 className="dashboard-heading">Collaborative Whiteboard</h1>
                    <p className="dashboard-subheading">
                        Create a blank infinite canvas or join an ongoing collaborative session with your team.
                    </p>
                </div>

                {/* Action Cards: Create & Join */}
                <div className="action-cards-grid">
                    {/* Create Card */}
                    <div className="action-card create-card">
                        <div className="card-badge">Instant</div>
                        <div className="card-icon create-icon-bg">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </div>
                        <h2 className="card-title">Create Canvas</h2>
                        <p className="card-description">
                            Start a new real-time whiteboard. Brainstorm, draw diagrams, and visualize thoughts instantly.
                        </p>
                        <button
                            type="button"
                            className="btn-dashboard btn-create"
                            onClick={handleCreateCanvas}
                        >
                            <span>Open Canvas</span>
                            <span className="btn-arrow">↗</span>
                        </button>
                    </div>

                    {/* Join Card */}
                    <div className="action-card join-card">
                        <div className="card-badge">Collaborate</div>
                        <div className="card-icon join-icon-bg">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h2 className="card-title">Join Canvas</h2>
                        <p className="card-description">
                            Enter an existing room code or session ID to connect to a live collaborative session.
                        </p>

                        {/* Skeletal Join Form */}
                        <form className="join-form" onSubmit={handleJoinCanvas}>
                            <div className="join-input-wrapper">
                                <input
                                    type="text"
                                    className="join-input"
                                    placeholder="Enter room code (e.g. 123)"
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value)}
                                />
                                <button type="submit" className="btn-dashboard btn-join">
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Whiteboards Section */}
                <div className="recent-sessions-section">
                    <div className="section-title-row">
                        <div className="title-with-badge">
                            <h3 className="section-title">Your Whiteboards</h3>
                            <span className="canvas-count-badge">
                                {dashBoards.length} {dashBoards.length === 1 ? 'canvas' : 'canvases'}
                            </span>
                        </div>
                    </div>

                    {dashBoards.length === 0 ? (
                        /* Empty State when no canvases exist */
                        <div className="empty-canvases-state">
                            <div className="empty-icon-circle">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </div>
                            <h4 className="empty-title">No whiteboards created yet</h4>
                            <p className="empty-desc">
                                Create a new canvas to start diagramming, brainstorming, or collaborating with your team.
                            </p>
                            <button
                                type="button"
                                className="btn-dashboard btn-create-empty"
                                onClick={handleCreateCanvas}
                            >
                                <span>Create Your First Canvas</span>
                                <span className="btn-arrow">↗</span>
                            </button>
                        </div>
                    ) : (
                        /* Dynamic Canvas Cards Grid */
                        <div className="canvas-cards-grid">
                            {dashBoards.map((canvas) => (
                                <div
                                    key={canvas._id || canvas.myRoomCode}
                                    className="canvas-card"
                                    onClick={() => navigate(`/canvas/${encodeURIComponent(canvas.myRoomCode)}`)}
                                >
                                    <div className="canvas-card-header">
                                        <div className="canvas-icon-preview">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                        </div>

                                        <button
                                            type="button"
                                            className={`room-code-tag ${copiedCode === canvas.myRoomCode ? 'copied' : ''}`}
                                            onClick={(e) => handleCopyCode(e, canvas.myRoomCode)}
                                            title="Click to copy room code"
                                        >
                                            <span>#{canvas.myRoomCode}</span>
                                            <span className="copy-hint">
                                                {copiedCode === canvas.myRoomCode ? '✓ Copied' : '⧉ Copy'}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="canvas-card-body">
                                        <h4 className="canvas-name" title={canvas.dashBoardname}>
                                            {canvas.dashBoardname}
                                        </h4>
                                        <p className="canvas-desc">
                                            {canvas.aboutDashboard || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="canvas-card-footer">
                                        <span className="canvas-date">
                                            {canvas.updatedAt
                                                ? new Date(canvas.updatedAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })
                                                : canvas.createdAt
                                                    ? new Date(canvas.createdAt).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                    : "Active canvas"}
                                        </span>

                                        <button
                                            type="button"
                                            className="btn-open-canvas"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/canvas/${encodeURIComponent(canvas.myRoomCode)}`);
                                            }}
                                        >
                                            <span>Open</span>
                                            <span className="open-arrow">→</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashBoard;