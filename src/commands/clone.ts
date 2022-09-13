import { Submodule } from '../utils/submodules.js';

type CloneOptions = {
  githubToken: string;
  depth: number;
  submodules: Submodule[];
};
export const clone = (_options: CloneOptions) => {
  // TODO:
  console.log(_options);
};
