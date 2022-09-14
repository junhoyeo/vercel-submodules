import NodePath from 'path';
import * as zx from 'zx';

import { haveSamePath, insideDir } from './filesystem.js';

export type Submodule = {
  commitHash: string;
  path: string;
  url: string;
};

type FetchSubmodulesOptions = {
  paths: string[] | null;
};
export const fetchSubmodules = async (
  options: FetchSubmodulesOptions,
): Promise<Submodule[]> => {
  const output = await zx.$`git submodule status --recursive`;

  let submodules: Submodule[] = [];

  const submoduleRefs = output.stdout.split('\n').flatMap((rawLine) => {
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
  });

  for (const { commitHash, path } of submoduleRefs) {
    const parentOfSubmodule = NodePath.resolve(path, '..');

    await insideDir(parentOfSubmodule, async () => {
      let pathName = path.endsWith('/')
        ? path.substring(0, path.lastIndexOf('/'))
        : path;
      pathName = pathName.split('/').slice(-1)[0];

      const url =
        await zx.$`git config --file .gitmodules --get submodule.${pathName}.url`.then(
          (output) => output.stdout.trim(),
        );
      submodules.push({ commitHash, path, url });
    });
  }

  return submodules;
};
