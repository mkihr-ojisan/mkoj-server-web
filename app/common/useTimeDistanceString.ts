import { useCallback, useEffect, useRef, useState } from "react";

export function useTimeDistanceString(date: Date) {
    const [text, setText] = useState<string>("");
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const update = useCallback(() => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        setText(
            `${Math.floor(diff / 3600000).toString()}:${Math.floor((diff % 3600000) / 60000)
                .toString()
                .padStart(2, "0")}:${Math.floor((diff % 60000) / 1000)
                .toString()
                .padStart(2, "0")}`
        );
        timer.current = setTimeout(update, 1000 - (diff % 1000));
    }, [date]);

    useEffect(() => {
        update();
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [update]);

    return text;
}
