import { useCallback, useEffect, useRef, useState } from "react";

export function useTimeDistanceString(date: Date) {
    const [text, setText] = useState<string>("");
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const update = useCallback(() => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        if (diff < 1000 * 60) {
            setText(`${Math.floor(diff / 1000)}秒`);
            timer.current = setTimeout(update, 1000 - (diff % 1000));
        } else if (diff < 1000 * 60 * 60) {
            setText(`${Math.floor(diff / (1000 * 60))}分`);
            timer.current = setTimeout(update, 1000 * 60 - (diff % (1000 * 60)));
        } else if (diff < 1000 * 60 * 60 * 24) {
            setText(`${Math.floor(diff / (1000 * 60 * 60))}時間`);
            timer.current = setTimeout(update, 1000 * 60 * 60 - (diff % (1000 * 60 * 60)));
        } else {
            setText(`${Math.floor(diff / (1000 * 60 * 60 * 24))}日`);
            timer.current = setTimeout(update, 1000 * 60 * 60 * 24 - (diff % (1000 * 60 * 60 * 24)));
        }
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
