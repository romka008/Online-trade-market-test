import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // слушать на всех сетевых интерфейсах (0.0.0.0)
        port: 5173 // порт по умолчанию, можно изменить при необходимости
    }
});
