import path from 'path';
import * as zx from 'zx';

// NOTE: Assumes that current platform is case-sensitive
export const haveSamePath = (haystack: string[], needle: string) =>
  haystack.some((hay) => path.resolve(hay) === path.resolve(needle));

export const insideDir = async (
  path: string,
  callback: () => Promise<void>,
) => {
  const pwd = (await zx.$`pwd`).stdout;
  zx.cd(path);
  await callback();

  try {
    zx.cd(pwd);
  } catch {
    /* ignored */
  }
};
