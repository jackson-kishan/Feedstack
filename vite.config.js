import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.ts",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173, // default Vite port
        watch: {
            usePolling: true,
        },
        ssr: {
            noExternal: ["@inertiajs/server"],
        },
    },
});
