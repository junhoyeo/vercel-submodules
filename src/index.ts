import { exit } from 'process';

import { help } from './commands/help.js';

const OPTIONS = {
  '-h': 'help',
  '--help': 'help',
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

  if (parsedOptions.help) {
    help();
    exit(0);
  }

  let githubToken: string = '';
  if (parsedOptions.token?.[0]) {
    [githubToken] = parsedOptions.token;
  } else {
    githubToken = process.env.GITHUB_TOKEN || '';
  }
};

main();
