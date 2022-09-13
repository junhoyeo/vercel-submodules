import path from 'path';
import * as zx from 'zx';

export type Submodule = {
  commitHash: string;
  path: string;
  url: string;
};

// NOTE: Assumes that current platform is case-sensitive
const haveSamePath = (haystack: string[], needle: string) =>
  haystack.some((hay) => path.resolve(hay) === path.resolve(needle));

type FetchSubmodulesOptions = {
  paths: string[] | null;
};
export const fetchSubmodules = async (
  options: FetchSubmodulesOptions,
): Promise<Submodule[]> => {
  const output = await zx.$`git submodule status --recursive`;

  const submodules = await Promise.all(
    output.stdout
      .split('\n')
      .flatMap((rawLine) => {
        const line = rawLine.trim();
        if (line.length > 0) {
          let [commitHash, path] = line.split(' ');
          if (!!options.paths && !haveSamePath(options.paths, path)) {
            return [];
          }
          if (commitHash.startsWith('-')) {
            commitHash = commitHash.slice(1);
          }
          return { commitHash, path };
        }
        return [];
      })
      .map(async ({ commitHash, path }) => {
        const url =
          await zx.$`git config --file .gitmodules --get submodule.${path}.url`.then(
            (output) => output.stdout.trim(),
          );
        return { commitHash, path, url };
      }),
  );

  return submodules;
};
