import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './ZoomParallax.css';

/**
 * Scroll-driven zoom parallax. Pass up to 7 images: { src, alt }.
 * Image 0 is the centre piece and zooms the least; the rest fly outward.
 */
const ZoomParallax = ({ images = [] }) => {
    const container = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    return (
        <div ref={container} className="zp">
            <div className="zp-stage">
                {images.slice(0, 7).map(({ src, alt }, i) => (
                    <motion.div
                        key={i}
                        className={`zp-layer zp-layer-${i}`}
                        style={reduceMotion ? undefined : { scale: scales[i] }}
                    >
                        <div className="zp-frame">
                            <img src={src} alt={alt || `Converge preview ${i + 1}`} loading="lazy" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ZoomParallax;
