
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
