import chalk from 'chalk';
import { exit } from 'process';
import * as zx from 'zx';

import { clone } from './commands/clone.js';
import { help } from './commands/help.js';
import { fetchSubmodules } from './utils/submodules.js';

const OPTIONS = {
  '-h': 'help',
  '--help': 'help',
  '-v': 'verbose',
  '--verbose': 'verbose',
  '--all': 'all',
  '--paths': 'paths',
  '--depth': 'depth',
  '--token': 'token',
} as const;
type OptionAlias = keyof typeof OPTIONS;
type Option = typeof OPTIONS[OptionAlias];
const isKnownOption = (arg: string): arg is OptionAlias =>
  Object.keys(OPTIONS).includes(arg);

const main = async () => {
  const argv = process.argv.slice(2);
  const parsedOptions: Partial<Record<Option, string[]>> = {};
  let current: Option | undefined = undefined;

  argv.forEach((arg) => {
    if (isKnownOption(arg)) {
      current = OPTIONS[arg];
      parsedOptions[current] = [];
    } else if (!!current) {
      parsedOptions[current]?.push(arg);
    }
  });

  if (parsedOptions.help || Object.values(parsedOptions).length === 0) {
    help();
    exit(0);
  }

  zx.$.verbose = !!parsedOptions.verbose;

  let githubToken: string = '';
  if (parsedOptions.token?.[0]) {
    [githubToken] = parsedOptions.token;
  } else {
    githubToken = process.env.GITHUB_TOKEN || '';
  }

  let depth: number = 1;
  if (parsedOptions.depth?.[0]) {
    depth = Number(parsedOptions.depth[0]);
  }
  if (depth < 1) {
    throw new Error('git commit history depth must be greater than 0');
  }

  const submodules = await fetchSubmodules();
  await clone({ githubToken, depth, submodules });
};

main().catch((error) => {
  console.error(`${chalk.red(`Error!`)} ${error.message}`);
  exit(1);
});
