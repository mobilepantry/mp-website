import { useEffect, useRef, useState } from "react";

const DIGITS = "0123456789";
const SYMBOL = "%";

interface SlotDigitProps {
  target: string;
  delay: number;
}

const SlotDigit = ({ target, delay }: SlotDigitProps) => {
  const [display, setDisplay] = useState(target === "%" ? "%" : "0");
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState(false);

  const startSpin = () => {
    if (target === "%") {
      // Symbol just pops in
      setTimeout(() => setLanded(true), delay + 200);
      return;
    }

    setSpinning(true);
    const targetNum = parseInt(target);
    let tick = 0;
    const totalTicks = 12 + Math.round(delay / 50);
    const interval = setInterval(() => {
      tick++;
      if (tick < totalTicks) {
        setDisplay(DIGITS[Math.floor(Math.random() * 10)]);
      } else {
        setDisplay(target);
        setSpinning(false);
        setLanded(true);
        clearInterval(interval);
      }
    }, 60);
  };

  return (
    <div className="w-16 h-20 md:w-24 md:h-28 lg:w-28 lg:h-32 rounded-xl bg-foreground flex items-center justify-center shadow-lg overflow-hidden relative">
      <span
        className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-background tracking-tight transition-transform duration-300 ${
          landed ? "scale-100" : "scale-90"
        }`}
        style={{
          display: "inline-block",
        }}
        ref={(el) => {
          if (el) {
            (el as any).__startSpin = startSpin;
          }
        }}
      >
        {display}
      </span>
    </div>
  );
};

export const SlotCounter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const digitRefs = useRef<Array<() => void>>([]);

  const chars = ["4", "0", "%"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          // Trigger each digit's spin
          digitRefs.current.forEach((fn) => fn?.());
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center gap-2 md:gap-3 mb-6">
      {chars.map((char, i) => (
        <SlotDigitWrapper key={i} target={char} delay={i * 150} registerStart={(fn) => { digitRefs.current[i] = fn; }} />
      ))}
    </div>
  );
};

interface SlotDigitWrapperProps {
  target: string;
  delay: number;
  registerStart: (fn: () => void) => void;
}

const SlotDigitWrapper = ({ target, delay, registerStart }: SlotDigitWrapperProps) => {
  const [display, setDisplay] = useState(target === "%" ? "%" : "0");
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    registerStart(() => {
      if (target === "%") {
        setTimeout(() => setLanded(true), delay + 400);
        return;
      }

      let tick = 0;
      const totalTicks = 10 + Math.round(delay / 40);

      setTimeout(() => {
        const interval = setInterval(() => {
          tick++;
          if (tick < totalTicks) {
            setDisplay(DIGITS[Math.floor(Math.random() * 10)]);
          } else {
            setDisplay(target);
            setLanded(true);
            clearInterval(interval);
          }
        }, 55);
      }, delay);
    });
  }, []);

  return (
    <div className="w-16 h-20 md:w-24 md:h-28 lg:w-28 lg:h-32 rounded-xl bg-foreground flex items-center justify-center shadow-lg overflow-hidden">
      <span
        className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-background tracking-tight transition-all duration-300 ${
          landed ? "scale-100 opacity-100" : "scale-75 opacity-70"
        }`}
      >
        {display}
      </span>
    </div>
  );
};
