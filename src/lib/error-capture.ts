/**
 * Minimal fejl-fangst – gemmer sidste fejl så SSR kan vise den.
 */

let lastError: Error | null = null;

export function captureError(error: unknown) {
  lastError = error instanceof Error ? error : new Error(String(error));
}

export function consumeLastCapturedError(): Error | null {
  const e = lastError;
  lastError = null;
  return e;
}

// Global catch (side-effect ved import)
if (typeof process !== "undefined") {
  process.on("uncaughtException", captureError);
  process.on("unhandledRejection", captureError);
}
