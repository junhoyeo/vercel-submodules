declare module 'git-url-parse' {
  export type ParsedGitUrlObject = {
    token: string;
  };
  export type Protocol =
    | 'ssh'
    | 'git+ssh'
    | 'ssh+git'
    | 'ftp'
    | 'ftps'
    | 'http'
    | 'https';
  function GitURLParse(url: string): ParsedGitUrlObject;
  namespace GitURLParse {
    export function stringify(
      parsed: ParsedGitUrlObject,
      protocol?: Protocol,
    ): string;
  }
  export default GitURLParse;
}
