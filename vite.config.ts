import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

const P3P_HEADER = 'CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"';

/**
 * Плагин для Vite, добавляющий P3P-заголовок ко всем ответам.
 * Необходимо для корректной работы cookies внутри iframe в Internet Explorer.
 */
function p3pHeaderPlugin(): import("vite").Plugin {
    return {
        name: "p3p-header",
        configureServer(server) {
            server.middlewares.use((_req, res, next) => {
                const originalWriteHead = res.writeHead.bind(res);
                res.writeHead = function (statusCode: number, ...args: unknown[]) {
                    if (!res.getHeader("P3P")) {
                        res.setHeader("P3P", P3P_HEADER);
                    }
                    return originalWriteHead(statusCode, ...args);
                };
                next();
            });
        }
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), p3pHeaderPlugin()],
    server: {
        host: true,
        port: 5173
    }
});
