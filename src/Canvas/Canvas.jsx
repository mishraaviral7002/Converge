import {  Tldraw, toRichText } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'
import 'tldraw/tldraw.css'



const Canvas = () => {


    const handleMount = (editor) => {
        editor.createShape({
            type: 'text',
            x: 500,
            y: 200,
            props: {
                richText: toRichText('Welcome to Converge'),
            },
        })

        editor.selectAll()
        editor.zoomToSelection({
            animation: { duration: 2500 },
        })
    };

    const store = useSyncDemo({ roomId: '123' });



    return (
        <div style={{ position: 'fixed', inset: 0 }}>
            <Tldraw onMount={handleMount} store={store} />
        </div>
    );
};

export default Canvas;