import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/common/Header';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';

function App() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const initializeVanta = () => {
      if (vantaRef.current && window.VANTA && window.THREE && !vantaRef.current.vantaEffect) {
        vantaRef.current.vantaEffect = window.VANTA.FOG({
          el: vantaRef.current,
    mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  highlightColor: 0x20202,
  midtoneColor: 0xffffff,
  lowlightColor: 0xffffff,
  baseColor: 0xffffff,
  zoom: 1.50
        });
      }
    };

    const loadThreeJs = () => {
      return new Promise((resolve) => {
        if (window.THREE) {
          resolve();
        } else {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
          threeScript.onload = resolve;
          threeScript.onerror = () => console.error('Failed to load Three.js');
          document.body.appendChild(threeScript);
        }
      });
    };

    const loadVantaJs = () => {
      return new Promise((resolve) => {
        if (window.VANTA) {
          resolve();
        } else {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.fog.min.js';
          vantaScript.onload = resolve;
          vantaScript.onerror = () => console.error('Failed to load Vanta.js');
          document.body.appendChild(vantaScript);
        }
      });
    };

    const loadScripts = async () => {
      await loadThreeJs();
      await loadVantaJs();
      initializeVanta();
    };

    loadScripts();

    return () => {
      if (vantaRef.current && vantaRef.current.vantaEffect) {
        vantaRef.current.vantaEffect.destroy();
        vantaRef.current.vantaEffect = null;
      }
    };
  }, []);

  return (
    <Router>
      <div ref={vantaRef} className="d-flex flex-column min-vh-100 m-0 p-0">
        <Header />
        <main className="flex-grow-1 m-0 p-0">
          <Routes />
        </main>
      </div>
    </Router>
  );
}

export default App;