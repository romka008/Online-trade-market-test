import {Link} from "react-router-dom";

/**
 * ПроблемА: iframe грузит сторонний сайт (https://api-test.aslife.ru),
 * и браузер блокирует установку cookies от этого iframe (third-party context).
 *
 * Cookies от api-test.aslife.ru НЕ ДОЛЖНЫ уходить на ваш домен (192.168.0.102).
 * Они должны оставаться на домене api-test.aslife.ru.
 *
 * Что МОЖНО сделать со стороны клиента (вашего приложения):
 * 1. Отправить скрытую форму на целевой домен (api-test.aslife.ru) —
 *    это "пробивает" cookie-блокировку в Safari/Opera (Способ 3 из статьи).
 *
 * Что ДОЛЖЕН делать сервер api-test.aslife.ru:
 * - Отправлять P3P-заголовок: P3P: CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"
 * - Устанавливать cookies с атрибутами: SameSite=None; Secure; Path=/
 * - (Без этого cookies в iframe работать не будут)
 */

function EmbedPage() {
    const href = window.location.search.replace(/^\?url=/, "");

    /**
     * Хак для third-party cookies в iframe (Способ 3 из статьи):
     * Создаём скрытую форму, которая отправляется на целевой домен (api-test.aslife.ru).
     * Это заставляет браузер "разрешить" cookies для этого домена в iframe-контексте.
     *
     * Форма отправляется в скрытый iframe, чтобы не было редиректа.
     * После этого основной iframe может устанавливать cookies на свой домен.
     */
    // useEffect(() => {
    //     if (!href) return;

    //     try {
    //         const targetUrl = new URL(href);
    //         const targetOrigin = targetUrl.origin;

    //         // Создаём скрытый iframe для приёма формы
    //         const hackIframe = document.createElement("iframe");
    //         hackIframe.name = "cookiesHackFrame";
    //         hackIframe.id = "cookiesHackFrame";
    //         hackIframe.style.display = "none";
    //         // Пытаемся загрузить пустую страницу на целевом домене
    //         hackIframe.src = `${targetOrigin}/blank.html`;
    //         document.body.appendChild(hackIframe);

    //         // Создаём форму, которая отправляется на целевой домен
    //         const form = document.createElement("form");
    //         form.id = "cookiesHackForm";
    //         form.method = "GET";
    //         form.action = href;
    //         form.target = "cookiesHackFrame";
    //         form.style.display = "none";
    //         document.body.appendChild(form);

    //         // Отправляем форму — это "пробивает" cookie-блокировку
    //         form.submit();

    //         return () => {
    //             const existingForm = document.getElementById("cookiesHackForm");
    //             const existingFrame = document.getElementById("cookiesHackFrame");
    //             if (existingForm) document.body.removeChild(existingForm);
    //             if (existingFrame) document.body.removeChild(existingFrame);
    //         };
    //     } catch {
    //         // Если URL некорректный — просто грузим iframe без хака
    //     }
    // }, [href]);

    return (
        <div className="embed-page">
            <div className="embed-card">
                <div className="embed-icon">🚀</div>
                <h1 className="embed-title">Embed Page</h1>
                <p className="embed-description">{href ? `URL: ${href}` : "Параметр 'url' не указан"}</p>

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

                    {href && (
                        <Link className="embed-btn embed-btn-open" to={href}>
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

                    {href && (
                        <Link
                            className="embed-btn embed-btn-new-tab"
                            to={href}
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

            {/* Основной iframe с целевым контентом */}
            {/* {href && (
                <iframe
                    src={href}
                    title="Встроенный контент"
                    width="100%"
                    height="100%"
                    style={{border: "none", position: "fixed", inset: 0, zIndex: 9999}}
                    allowFullScreen
                />
            )} */}
        </div>
    );
}

export default EmbedPage;
