import React, { useImperativeHandle, useRef, useEffect } from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': any;
      }
    }
  }
}

interface GoogleModelViewerProps {
  src: string;
  poster?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  cameraControls?: boolean;
  shadowIntensity?: number;
  environmentImage?: string;
  exposure?: number;
  className?: string;
  cameraOrbit?: string; // e.g. "45deg 55deg 4m"
  cameraTarget?: string; // e.g. "0m 0m 0m"
}

export interface GoogleModelViewerRef {
  setCameraOrbit: (orbit: string) => void;
}

const GoogleModelViewer = React.forwardRef<GoogleModelViewerRef, GoogleModelViewerProps>(
  (
    {
      src,
      poster,
      autoRotate = true,
      cameraControls = true,
      shadowIntensity = 1,
      environmentImage = 'neutral',
      exposure = 1,
      className = "w-full h-full",
      cameraOrbit,
      cameraTarget,
    },
    ref
  ) => {
    const modelRef = useRef<any>(null);
    const [isReady, setIsReady] = React.useState(
      () => customElements.get('model-viewer') !== undefined,
    );

    useEffect(() => {
      if (customElements.get('model-viewer')) {
        setIsReady(true);
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>('script[data-model-viewer]');
      const script = existing ?? document.createElement('script');
      const onLoad = () => setIsReady(true);

      script.addEventListener('load', onLoad, { once: true });
      if (!existing) {
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        script.dataset.modelViewer = 'true';
        document.head.appendChild(script);
      }

      return () => script.removeEventListener('load', onLoad);
    }, []);

    useImperativeHandle(ref, () => ({
      setCameraOrbit: (orbit: string) => {
        if (modelRef.current) {
          modelRef.current.cameraOrbit = orbit;
        }
      },
    }));

    if (!isReady) {
      return <div className={className} />;
    }

    return (
      <div className={className}>
        <model-viewer
          ref={modelRef}
          src={src}
          poster={poster}
          auto-rotate={autoRotate ? "" : undefined}
          camera-controls={cameraControls ? "" : undefined}
          shadow-intensity={shadowIntensity}
          environment-image={environmentImage}
          exposure={exposure}
          interaction-prompt="none"
          ar-status="not-presenting"
          loading="lazy"
          {...(cameraOrbit && { 'camera-orbit': cameraOrbit })}
          {...(cameraTarget && { 'camera-target': cameraTarget })}
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent', '--poster-color': 'transparent' } as any}
        >
        </model-viewer>
      </div>
    );
  }
);

GoogleModelViewer.displayName = 'GoogleModelViewer';
export default GoogleModelViewer;
