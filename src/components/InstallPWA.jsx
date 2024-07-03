import { useEffect, useState } from "react";

const InstallPWA = () => {
  // const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      // setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    setClick(true);
    if (promptInstall) {
      promptInstall.prompt();
      // return;
    }
  };
  // if (!supportsPWA) {
  //   return null;
  // }
  return ( !click ?
    <button
      className="pwa-install-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install Relish 📲
    </button>
    :
    <div style={{position: 'fixed', bottom:'0px'}}>
      <img onClick={() => setClick(false)} alt='download instruction' height='100vh' width='100%' style={{ borderRadius:'18px'}} src='/download-instruction.jpg'/>
    </div>
  );
};

export default InstallPWA;
