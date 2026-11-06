import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
    Tldraw,
    toRichText,
    DefaultMainMenu,
    DefaultMainMenuContent,
    DefaultActionsMenu,
    DefaultActionsMenuContent,
    TldrawUiMenuGroup,
    TldrawUiMenuItem,
    getSnapshot
} from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import 'tldraw/tldraw.css';
import './Canvas.css';

const DEFAULT_ROOM_ID = 'converge-shared-whiteboard-session';

const Canvas = () => {
    const { roomId } = useParams();
    const [searchParams] = useSearchParams();
    const activeRoomId = roomId || searchParams.get('room') || DEFAULT_ROOM_ID;

    // Ref to hold the tldraw editor instance for saving
    const editorRef = useRef(null);

    // ── Auth & data state ──────────────────────────────────
    const [dashBoards, setDashBoards] = useState([]);
    const [nameConverge, setNameConverge] = useState('');
    const [emailConverge, setEmailConverge] = useState('');
    const [isAllowed, setIsAllowed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // ── ALL hooks MUST be called before any early return ───
    const store = useSyncDemo({ roomId: activeRoomId });

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
                    console.error("Error getting dashboard data");
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function verifyLoggingIN() {
            try {
                const userInfo = await fetch("https://converge-backend-t1.onrender.com/checkForLoggedIn", {
                    method: "GET",
                    credentials: 'include',
                });
                if (userInfo.status === 200) {
                    const data = await userInfo.json();
                    setNameConverge(data.name);
                    setEmailConverge(data.email);
                    setIsAllowed(true);
                    gettingDashBoards();
                }
            } catch (error) {
                console.log(error);
                setIsAllowed(false);
            } finally {
                setIsLoading(false);
            }
        }
        verifyLoggingIN();
    }, []);

    const handleMount = useCallback((editor) => {
        editorRef.current = editor;

        if (editor.getCurrentPageShapeIds().size === 0) {
            editor.createShape({
                type: 'text',
                x: 450,
                y: 200,
                props: {
                    richText: toRichText('Welcome to Converge'),
                },
            });
            editor.selectAll();
            editor.zoomToSelection({
                animation: { duration: 1500 },
            });
        }
    }, []);

    const handleSaveCanvas = useCallback(async () => {
        if (!editorRef.current) {
            console.error("Editor not initialized yet");
            return;
        }

        try {
            const snapshot = getSnapshot(editorRef.current.store);
            const confirmation = await fetch("https://converge-backend-t1.onrender.com/save-canvas", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomAddress: activeRoomId,
                    data: snapshot,
                }),
            });

            if (confirmation.status === 200) {
                console.log("Canvas saved successfully! Room:", activeRoomId);
                alert("Canvas saved successfully!");
            } else {
                console.error("Save failed with status:", confirmation.status);
                alert("Failed to save canvas. Please try again.");
            }
        } catch (err) {
            console.error("Error saving canvas:", err);
        }
    }, [activeRoomId]);

    // Custom Actions Menu (The Three Dots '...' Menu)
    const CustomActionsMenu = useCallback((props) => (
        <DefaultActionsMenu {...props}>
            <TldrawUiMenuGroup id="converge-actions-save">
                <TldrawUiMenuItem
                    id="save-canvas"
                    label="Save Canvas"
                    iconLeft="download"
                    onSelect={handleSaveCanvas}
                />
            </TldrawUiMenuGroup>
            <DefaultActionsMenuContent />
        </DefaultActionsMenu>
    ), [handleSaveCanvas]);

    // Custom Main Menu (Hamburger Menu)
    const CustomMainMenu = useCallback((props) => (
        <DefaultMainMenu {...props}>
            <TldrawUiMenuGroup id="converge-main-save">
                <TldrawUiMenuItem
                    id="save-canvas"
                    label="Save Canvas"
                    iconLeft="download"
                    onSelect={handleSaveCanvas}
                />
            </TldrawUiMenuGroup>
            <DefaultMainMenuContent />
        </DefaultMainMenu>
    ), [handleSaveCanvas]);

    // Memoized components override for Tldraw
    const customComponents = useMemo(() => ({
        ActionsMenu: CustomActionsMenu,
        MainMenu: CustomMainMenu,
    }), [CustomActionsMenu, CustomMainMenu]);

    // ── Conditional returns AFTER all hooks ─────────────────
    if (isLoading) {
        return <div>Verifying your credentials, please wait...</div>;
    }

    if (!isAllowed) {
        return <div>⛔ Access Denied...</div>;
    }

    if (store.status === 'loading') {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0f172a',
                zIndex: 9999
            }}>
                <div style={{
                    width: '38px',
                    height: '38px',
                    border: '3px solid #e2e8f0',
                    borderTopColor: '#2563eb',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    marginBottom: '16px'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.3px' }}>
                    converge<span style={{ color: '#2563eb' }}>.</span> canvas
                </div>
                <div style={{ fontSize: '13.5px', color: '#64748b', marginTop: '6px' }}>
                    Connecting to collaborative workspace...
                </div>
            </div>
        );
    }

    if (store.status === 'error') {
        return (
            <div className="canvas-wrapper">
                <div className="canvas-bottom-bar">
                    <Link to="/dashboard" className="canvas-back-btn" title="Back to Dashboard">
                        <span>←</span>
                        <span>Dashboard</span>
                    </Link>
                    <div className="canvas-room-pill" title="Live Whiteboard Session">
                        <span className="room-live-dot" />
                        <span>#{activeRoomId}</span>
                    </div>
                </div>
                <Tldraw onMount={handleMount} components={customComponents} />
            </div>
        );
    }

    return (
        <div className="canvas-wrapper">
            {/* Minimal Floating Bottom-Right Overlay */}
            <div className="canvas-bottom-bar">
                <Link to="/dashboard" className="canvas-back-btn" title="Back to Dashboard">
                    <span>←</span>
                    <span>Dashboard</span>
                </Link>

                <div className="canvas-room-pill" title="Live Whiteboard Session">
                    <span className="room-live-dot" />
                    <span>#{activeRoomId}</span>
                </div>
            </div>

            <Tldraw onMount={handleMount} store={store} components={customComponents} />
        </div>
    );
};

export default Canvas;
