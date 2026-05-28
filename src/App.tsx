import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import EmbedPage from "./pages/EmbedPage.tsx";
import "./App.css";

function HomePage() {
    const baseUrl = window.location.origin;
    const [iframeUrl, setIframeUrl] = useState(`${baseUrl}/embed?url=https://example.com`);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIframeUrl(e.target.value);
    };

    return (
        <div className="app-container">
            <div className="url-bar">
                <label htmlFor="iframe-url">Ссылка для iframe:</label>
                <input
                    id="iframe-url"
                    type="text"
                    value={iframeUrl}
                    onChange={handleUrlChange}
                    placeholder="Вставьте вашу ссылку сюда..."
                />
            </div>
            <div className="iframe-wrapper">
                <iframe
                    src={iframeUrl}
                    title="Встроенный контент"
                    width="100%"
                    height="100%"
                    style={{border: "none"}}
                    // allow="cookies"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/embed" element={<EmbedPage />} />
        </Routes>
    );
}
