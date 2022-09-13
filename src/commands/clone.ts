import chalk from 'chalk';
import path from 'path';
import * as zx from 'zx';

import { Submodule } from '../utils/submodules.js';

const insideDir = async (path: string, callback: () => Promise<void>) => {
  const pwd = (await zx.$`pwd`).stdout;
  zx.cd(path);
  await callback();

  try {
    zx.cd(pwd);
  } catch {
    /* ignored */
  }
};

type CloneOptions = {
  githubToken: string;
  depth: number;
  submodules: Submodule[];
};
export const clone = async ({ githubToken, depth, submodules }: CloneOptions) => {
  const rootDir = (await zx.$`pwd`).stdout.trim();

  await Promise.all(
    submodules.map(async (submodule) => {
      const submoduleDir = path.join(rootDir, submodule.path);

      await zx.$`rm -rf ${submoduleDir}`.catch(() => {
        /* ignored */
      });
      await zx.$`mkdir ${submoduleDir}`.catch(() => {
        /* ignored */
      });

      await insideDir(submoduleDir, async () => {
        await zx.$`git init`;
        try {
          await zx.$`git remote add origin ${submodule.url}`;
        } catch {
          await zx.$`git remote set-url origin ${submodule.url}`;
        }
        await zx.$`git fetch origin ${submodule.commitHash} --depth=${depth} --no-tags`;
        await zx.$`git reset --hard FETCH_HEAD`;
      });

      console.log(`${chalk.green('Clone Success')} Submodule ${chalk.cyan(`${submodule.path}@${submodule.commitHash.slice(0, 7)}`)}`);
    }),
  );
};
