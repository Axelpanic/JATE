const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Check onload to see if the app is supported
window.addEventListener("load", () => {
    if (!installSupported()) {
      console.log("Install is not supported");
      hideInstallButton();
      return;
    }
  
    console.log("Install is supported");
    window.addEventListener("beforeinstallprompt", (event) => {
      window.deferredPrompt = event;
      showInstallButton(event);
    });
  
    butInstall.addEventListener("click", async () => {
      const promptEvent = window.deferredPrompt;
  
      if (!promptEvent) {
        return;
      }
  
      // Show prompt
      promptEvent.prompt();
  
      window.deferredPrompt = null;
    });
  
    // Hide the install button
    window.addEventListener("appinstalled", (event) => {
      hideInstallButton();
      window.deferredPrompt = null;
    });
  });
  
  /** Checks to see if install is supported in browser */
  function installSupported() {
    return "getInstalledRelatedApps" in navigator;
  }

  function showInstallButton(event) {
    window.deferredPrompt = event;
    butInstall.classList.toggle("hidden", false);
  }
  function hideInstallButton() {
    butInstall.classList.toggle("hidden", true);
  }