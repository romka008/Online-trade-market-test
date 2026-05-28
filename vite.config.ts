import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

const P3P_HEADER = 'CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        headers: {
            "P3P": P3P_HEADER
        }
    }
});
