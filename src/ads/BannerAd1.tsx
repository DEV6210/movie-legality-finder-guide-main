import { useEffect } from "react";

const BannerAd1: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("banner-ad-container");
    if (!container) return;

    // Script to set ad options
    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `
      atOptions = {
        'key': '523d40d129d33e5e4ea027de98d0a8a8',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;

    // Script to load ad script
    const adScript = document.createElement("script");
    adScript.type = "text/javascript";
    adScript.src = "//www.highperformanceformat.com/523d40d129d33e5e4ea027de98d0a8a8/invoke.js";

    container.appendChild(optionsScript);
    container.appendChild(adScript);
  }, []);

  return (
    <div
      id="banner-ad-container"
      style={{ display: "flex", justifyContent: "center", marginBottom:'2rem' }}
    ></div>
  );
};

export default BannerAd1;
