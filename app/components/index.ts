export { default as PinIcon } from "./PinIcon";
export { default as ShieldIcon } from "./ShieldIcon";

// Provide a harmless default export so the router doesn't treat this module
// as a page missing a default React component. This file is used only to
// re-export icon components; it shouldn't render anything.
const ComponentsPlaceholder = () => null;
export default ComponentsPlaceholder;

