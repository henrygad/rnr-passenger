import { useEffect, useState } from "react";

export function useResendTimer(initialSeconds = 60) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [secondsLeft]);

    function reset() {
        setSecondsLeft(initialSeconds);
        setCanResend(false);
    }

    return {
        secondsLeft,
        canResend,
        reset,
    };
}
