import NodePath from 'path';
import * as zx from 'zx';

import { haveSamePath, insideDir } from './filesystem.js';

export type Submodule = {
  commitHash: string;
  path: string;
  url: string;
  gitModulePath: string;
};

type FetchSubmodulesOptions = {
  paths: string[] | null;
};
export const fetchSubmodules = async (
  options: FetchSubmodulesOptions,
): Promise<Submodule[]> => {
  const topLevel = (await zx.$`git rev-parse --show-toplevel`).stdout.trim();
  let output: string = '';
  await insideDir(topLevel, async () => {
    output = (await zx.$`git submodule status --recursive`).stdout;
  });

  let submodules: Submodule[] = [];

  const submoduleRefs = output.split('\n').flatMap((rawLine) => {
    const line = rawLine.trim();
    if (line.length > 0) {
      let [commitHash, path] = line.split(' ');
      if (!!options.paths && !haveSamePath(options.paths, path)) {
        return [];
      }
      if (commitHash.startsWith('-')) {
        commitHash = commitHash.slice(1);
      }
      return {
        commitHash,
        path: NodePath.join(topLevel, path),
        gitModulePath: path,
      };
    }
    return [];
  });

  for (const { commitHash, path, gitModulePath } of submoduleRefs) {
    await insideDir(topLevel, async () => {
      let pathName = path.endsWith('/')
        ? path.substring(0, path.lastIndexOf('/'))
        : path;
      pathName = pathName.split('/').slice(-1)[0];

      const url =
        await zx.$`git config --file .gitmodules --get submodule.${gitModulePath}.url`.then(
          (output) => output.stdout.trim(),
        );
      submodules.push({ commitHash, path, url, gitModulePath });
    });
  }

  return submodules;
};
