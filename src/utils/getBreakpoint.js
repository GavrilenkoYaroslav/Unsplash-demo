import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind-config';

const fullConfig = resolveConfig(tailwindConfig);

const getBreakpointValue = (value) => parseInt(fullConfig.theme.screens[value] || '0');

const getCurrentBreakpoint = () => {
  let currentBreakpoint = 'xs';
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }

  return currentBreakpoint;
};

export {
  getBreakpointValue,
  getCurrentBreakpoint,
}
