import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashBoard.css';

const DashBoard = () => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');

    const handleCreateCanvas = () => {

        navigate('/canvas');
    };

    const handleJoinCanvas = (e) => {
        e.preventDefault();
        navigate('/canvas');
    };

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
                            <span>AM</span>
                            <span className="online-dot" title="Active"></span>
                        </div>
                        <div className="user-meta">
                            <span className="user-name">Aviral Mishra</span>
                            <span className="user-status-text">Logged in</span>
                        </div>
                    </div>

                    {/* Switch / Log In Option */}
                    <div className="header-actions">
                        <Link to="/Login" className="btn-switch-account">
                            Switch Account
                        </Link>
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

                {/* Skeletal Structure for Recent Canvases */}
                <div className="recent-sessions-section">
                    <div className="section-title-row">
                        <h3 className="section-title">Recent Whiteboards</h3>
                        <span className="skeletal-tag">Skeletal Preview</span>
                    </div>

                    <div className="skeletal-grid">
                        <div className="skeletal-item" onClick={handleCreateCanvas}>
                            <div className="skeletal-preview-box">
                                <span className="preview-emoji">🎨</span>
                            </div>
                            <div className="skeletal-info">
                                <div className="skeletal-title">Default Workspace Canvas</div>
                                <div className="skeletal-meta">Room: 123 • Active</div>
                            </div>
                        </div>

                        <div className="skeletal-item placeholder-item">
                            <div className="skeletal-preview-box empty-box">
                                <span>+</span>
                            </div>
                            <div className="skeletal-info">
                                <div className="skeletal-title">New Slot</div>
                                <div className="skeletal-meta">Available to initialize</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashBoard;
