declare module "*.css";

declare global {
  interface Window {
    // HubSpot tracking queue: an array of arrays
    // where the first element is a string (command name)
    _hsq: unknown[][];
  }
}
