
/// <reference types="vite/client" />

// Define the LayoutShift interface for web performance API
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources: Array<{
    node?: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
}

// Define performance timing interfaces
interface PerformanceEventTiming extends PerformanceEntry {
  interactionId?: number;
  interactionCount?: number;
  processingStart: DOMHighResTimeStamp;
  processingEnd: DOMHighResTimeStamp;
  duration: DOMHighResTimeStamp;
  cancelable: boolean;
  target?: Node;
}

// If we need durationThreshold in the future, we could extend the interface like this:
// But for now, let's remove it as it's causing a TypeScript error
// interface ExtendedPerformanceObserverInit extends PerformanceObserverInit {
//   durationThreshold?: number;
// }
