import {Link} from "react-router-dom";

function EmbedPage() {
    const params = new URLSearchParams(window.location.search);
    const target = params.get("url");

    return (
        <div className="embed-page">
            <div className="embed-card">
                <div className="embed-icon">🚀</div>
                <h1 className="embed-title">Embed Page</h1>
                <p className="embed-description">{target ? `URL: ${target}` : "Параметр 'url' не указан"}</p>

                <div className="embed-actions">
                    <Link className="embed-btn embed-btn-back" to="/">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        На главную
                    </Link>

                    {target && (
                        <Link className="embed-btn embed-btn-open" to={target}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Открыть контент
                        </Link>
                    )}

                    {target && (
                        <Link
                            className="embed-btn embed-btn-new-tab"
                            to={target}
                            target="_blank"
                            rel="noopener noreferrer">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Открыть в новой вкладке
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmbedPage;
