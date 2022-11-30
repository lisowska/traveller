import { act } from 'react-dom/test-utils';

export const waitForNextTick = async () =>
  act(() => new Promise((resolve) => setTimeout(resolve, 0)));
