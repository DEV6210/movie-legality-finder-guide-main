import { useEffect } from "react";

const BannerAd2: React.FC = () => {
    useEffect(() => {
        const container = document.getElementById("banner-ad-container");
        if (!container) return;

        // Script to set ad options
        const optionsScript = document.createElement("script");
        optionsScript.type = "text/javascript";
        optionsScript.innerHTML = `
        atOptions = {
            'key' : 'c00731754aca9195b179f2035c571198',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
        };
    `;

        // Script to load ad script
        const adScript = document.createElement("script");
        adScript.type = "text/javascript";
        adScript.src = "//www.highperformanceformat.com/c00731754aca9195b179f2035c571198/invoke.js";

        container.appendChild(optionsScript);
        container.appendChild(adScript);
    }, []);

    return (
        <div
            id="banner-ad-container"
            style={{ display: "flex", justifyContent: "center", marginBottom: '2rem' }}
        ></div>
    );
};

export default BannerAd2;
