import { ReactElement, useState, useEffect, useRef } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}

export function useTimer(
  startTimeParam: string | Date | null | undefined, // ✅ allow empty
  defaultMinutes: number = 90,
  onStart?: () => void
) {
  // ✅ Convert to timestamp ONLY if valid
  const [startTimestamp, setStartTimeStamp] = useState<number | null>(
    startTimeParam ? new Date(startTimeParam).getTime() : null
  );

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(defaultMinutes * 60); // seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const TOTAL_MS: number = defaultMinutes * 60 * 1000;

  // ✅ Check elapsed time
  const hasTimePassed = (startTime: number, minutes: number): boolean => {
    const now = new Date();
    return now.getTime() - startTime >= minutes * 60 * 1000;
  };

  // ✅ Stop
  const stop = (): void => {
    setIsRunning(false);
    setTimeLeft(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // ✅ Reset timer
  const reset = (): void => {
    setIsRunning(false);
    setTimeLeft(defaultMinutes * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // ✅ Manual start()
  const start = (): void => {
    if (!startTimestamp) {
      setStartTimeStamp(new Date().getTime());
      console.warn("❗ startTimeParam is empty — timer will start from fresh.");
      if (onStart) onStart();
    }
    setIsRunning(true);
  };

  // ✅ Auto-start ONLY when startTimeParam exists
  useEffect(() => {
    if (!startTimestamp) return; // ⛔ Do NOT auto-start when empty

    // ✅ If expired before page loads
    if (hasTimePassed(startTimestamp, defaultMinutes)) {
      setTimeLeft(0);
      setIsRunning(false);
      return;
    }

    // ✅ Auto-start only when valid timestamp exists
    setIsRunning(true);
  }, [startTimestamp, defaultMinutes]);

  // ✅ Main timer effect
  useEffect(() => {
    if (!isRunning || !startTimestamp) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - (startTimestamp ?? 0);
      const remainingMs = TOTAL_MS - elapsed;

      if (remainingMs <= 0) {
        setTimeLeft(0);
        setIsRunning(false);

        return;
      }

      setTimeLeft(Math.floor(remainingMs / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, startTimestamp, defaultMinutes]);

  return {
    timeLeft,
    isRunning,
    start, // ✅ added
    reset,
    hasFinished: timeLeft <= 0,
    hasTimePassed,
    stop,
  };
}
