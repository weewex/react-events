/* istanbul ignore file */
let debugMode = false;

export function configure({ debug }: { debug: boolean }): void {
  debugMode = debug;
}

export function isDebugMode(): boolean {
  return debugMode;
}
