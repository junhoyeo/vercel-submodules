[![Vercel Submodules](https://raw.githubusercontent.com/junhoyeo/vercel-submodules/main/docs/images/vercel-submodules.svg)](https://www.npmjs.com/package/vercel-submodules)

<h1>
  <code>vercel-submodules</code>: <br />
  The CLI to handle <br />
  <strong>Private Git Submodules</strong> <br />
  in your <strong>
    <a href='https://vercel.com/home'>Vercel</a> Project
  </strong>
</h1>

<a aria-label="npm version" href="https://www.npmjs.com/package/vercel-submodules">
  <img alt="" src="https://badgen.net/npm/v/vercel-submodules">
</a>
<a aria-label="License" href="https://github.com/junhoyeo/vercel-submodules/blob/main/LICENSE">
  <img alt="" src="https://badgen.net/npm/license/vercel-submodules">
</a>

> This project is community-driven and not affiliated with Vercel in any way. However, I'd love to contribute!

## The Status Quo

> **@vercel** [Support for private Git Submodules #44](https://github.com/orgs/vercel/discussions/44)

With Git Submodules, you can add other repositories as a subdirectory of another repository. The [`experimental.externalDir` option in Next.js](https://github.com/vercel/next.js/pull/22867) makes it even more magical by directly transpiling external libraries.

However, Vercel does not support private Git Submodules for now. There have been many community-made workarounds, like [calling Vercel CLI inside GitHub Actions](https://github.com/vercel/community/discussions/44#discussioncomment-22319) (not a fundamental solution) or [using shell scripts](https://github.com/beeinger/vercel-private-submodule) (it works, but it cannot fit general needs like cloning multiple repositories, auto-response for newly added submodules), having their own set of limitations.

## 📦 Installation and Usage

```
yarn add -D vercel-submodules
```

Go to the [**Build & Development Settings** section](https://vercel.com/docs/concepts/deployments/configure-a-build#build-and-development-settings) and override **Install Command** with `vercel-submodules --all && (...)`. Such as `vercel-submodules --all && yarn install`.

Once configured, `vercel-submodules` take care of everything. It detects the indicated commit hashes with all or configured submodules; you don't have to update anything again!

[![Usage information for `vercel-submodules`](https://raw.githubusercontent.com/junhoyeo/vercel-submodules/main/docs/images/usage-information.jpg?v=2)](https://www.npmjs.com/package/vercel-submodules)

## Clone all Submodules

```
npx vercel-submodules --all
```

This command clones all submodules inside the repository.

## Clone only specific Submodules

```
npx vercel-submodules --paths packages/module-a ./packages/module-b docs
```

This command above will clone submodules with the following `path`:

- `./packages/module-a`
- `./packages/module-b`
- `./docs`

## Configure clone depth

```
npx vercel-submodules --depth 10
```

The default value is `1`.

## Set GitHub Token

In order to deploy to Vercel, follow these steps:

1. [Generate a new GitHub access token](https://github.com/settings/tokens/new),
2. Add it as an environment variable in Vercel called `GITHUB_TOKEN`.

Alternatively, you can explicitly set the token argument:
```
npx vercel-submodules --token 7777777141f111cf9f0308a63dbd9d0cad3010c4
```

> FYI, that's my [Ethereum address](https://etherscan.io/enslookup-search?search=junhoyeo.eth) 💎

The default value is `$GITHUB_TOKEN`.
