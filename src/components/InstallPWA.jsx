import { useEffect, useState, useRef } from "react";
import { MdDownload } from "react-icons/md";

const InstallPWA = () => {
  const [click, setClick] = useState(false);

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

  const installPWA = () => {
    setClick(true);
    if (!deferredPrompt.current) return
    deferredPrompt.current.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        localStorage.setItem("pwa-is-installed", 'true')
      }
    })
  }

  return ( !click 
    ? !JSON.parse(localStorage.getItem("pwa-is-installed")) &&
      <button
        className="pwa-install-button"
        id="setup_button"
        aria-label="Install app"
        title="Install app"
        onClick={installPWA}
      >
        <MdDownload />
      </button>
    :
      <div style={{position: 'relative', margin:'auto auto 20px'}}>
        <img onClick={() => setClick(false)} alt='download instruction' width='360px' className='download-instruction-img' src='/download-instruction.jpg'/>
      </div>
  );
};

export default InstallPWA;
