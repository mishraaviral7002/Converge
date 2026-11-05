import { useCallback } from 'react';
import { Tldraw, toRichText } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import 'tldraw/tldraw.css';




const ROOM_ID = 'converge-shared-whiteboard-session';

const Canvas = () => {
    const store = useSyncDemo({ roomId: ROOM_ID });

    const handleMount = useCallback((editor) => {
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
            <div style={{ position: 'fixed', inset: 0 }}>
                <Tldraw onMount={handleMount} />
            </div>
        );
    }


    return (
        <div style={{ position: 'fixed', inset: 0 }}>
            <Tldraw onMount={handleMount} store={store} />
        </div>
    );
};

export default Canvas;
