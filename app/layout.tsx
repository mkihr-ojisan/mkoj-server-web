import type { Metadata } from "next";
import { QueryClientProvider } from "./common/queryClient";

export const metadata: Metadata = {
    title: "mkoj server",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body>
                <QueryClientProvider>{children}</QueryClientProvider>
            </body>
        </html>
    );
}
