import chalk from 'chalk';
import GitUrlParse from 'git-url-parse';
import path from 'path';
import * as zx from 'zx';

import { insideDir } from '../utils/filesystem.js';
import { Submodule } from '../utils/submodules.js';

const convertToAuthURL = (url: string, githubToken: string): string => {
  const parsed = GitUrlParse(url);
  parsed.token = githubToken;
  return GitUrlParse.stringify(parsed, 'https');
};

type CloneOptions = {
  githubToken: string;
  depth: number;
  submodules: Submodule[];
};
export const clone = async ({ githubToken, depth, submodules }: CloneOptions) => {
  const rootDir = (await zx.$`pwd`).stdout.trim();

  for (const submodule of submodules) {
    const submoduleDir = path.join(rootDir, submodule.path);
    const submoduleURL = !!githubToken ? convertToAuthURL(submodule.url, githubToken) : submodule.url;

    await zx.$`rm -rf ${submoduleDir}`.catch(() => {
      /* ignored */
    });
    await zx.$`mkdir ${submoduleDir}`.catch(() => {
      /* ignored */
    });

    await insideDir(submoduleDir, async () => {
      await zx.$`git init`;
      try {
        await zx.$`git remote add origin ${submoduleURL}`;
      } catch {
        await zx.$`git remote set-url origin ${submoduleURL}`;
      }
      await zx.$`git fetch origin ${submodule.commitHash} --depth=${depth} --no-tags`;
      await zx.$`git reset --hard FETCH_HEAD`;
    });

    console.log(`${chalk.green('Clone Success')} Submodule ${chalk.cyan(`${submodule.path}@${submodule.commitHash.slice(0, 7)}`)}`);
  }
};
