import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MdDownload } from "react-icons/md";

const InstallPWA = () => {
  const [click, setClick] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const location = useLocation();
  const deferredPrompt = useRef(null)

  useEffect(() => {
    const handlePrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt.current = e
    }

    window.addEventListener('beforeinstallprompt', handlePrompt)
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt)
  })

  const isInStandaloneMode = () =>
    (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

  useEffect(() => {
    // if PWA is installed
    if (isInStandaloneMode()) {
      setShowButton(false);
    }
  }, [])

  const installPWA = () => {
    setClick(true);
    if (!deferredPrompt.current) return
    deferredPrompt.current.prompt()
  }

  return ( !click 
    ? showButton &&
      <button
        className={location.pathname === '/' ? 'home-pwa-install-button' :"pwa-install-button"}
        id="setup_button"
        aria-label="Install app"
        title="Install app"
        onClick={installPWA}
      >
        <MdDownload /> <p style={{fontSize: '0.6em'}}>Download</p>
      </button>
    :
      <div style={{position: 'fixed', bottom:window.innerHeight * 0.05, zIndex:'2', display:'flex', justifyContent:'center', alignItems:'center', width:window.innerWidth * 0.95}}>
        <img onClick={() => setClick(false)} alt='download instruction' width='360px' className='download-instruction-img' src='/download-instruction.jpg'/>
      </div>
  );
};

export default InstallPWA;
