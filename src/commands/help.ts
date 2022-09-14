import chalk from 'chalk';

const VERCEL_LOGO = '▲';
const prop = chalk.bold.underline;
const code = (value: string) => chalk.dim(`\`${value}\``);

export const help = () => {
  console.log(`
  ${chalk.bold(`${VERCEL_LOGO} vercel-submodules [options]`)}

  ${chalk.dim('Options:')}

    -h, --help                Output usage information
    -v, --verbose             Enable verbose mode
    --all                     Clone all submodules inside the repository
    --paths ${prop('SUBMODULE_PATHS')}   Clone only specific submodules with the provided ${code('path')})
    --depth ${prop('CLONE_DEPTH')}       Configure the clone depth (default: ${code('1')})
    --token ${prop('TOKEN')}             Configure the token used for GitHub Authentication (default: ${code('$GITHUB_TOKEN')})

  ${chalk.dim('Examples:')}

  ${chalk.gray('–')} Clone all submodules

    ${chalk.cyan(`$ vercel-submodules --all`)}

  ${chalk.gray('–')} Only clone specific submodules

    ${chalk.cyan(`$ vercel-submodules --paths packages/module-a ./packages/module-b docs`)}
`);
};
