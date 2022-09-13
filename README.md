![Vercel Submodules](./vercel-submodules.svg)

<h1>
  <code>vercel-submodules</code>: <br />
  The CLI to handle <br />
  <strong>Private Git Submodules</strong> <br />
  in your <strong>
    <a href='https://vercel.com/home'>Vercel</a> Project
  </strong>
</h1>

> This project is community-driven and not affiliated with Vercel in any way. However, I'd love to contribute!

## The Status Quo

> **@vercel** [Support for private git submodules #44](https://github.com/orgs/vercel/discussions/44)

With Git Submodules, you can add other repositories as a subdirectory of another repository. The `experimental.externalDir` option in Next.js makes it even more magical by directly transpiling external libraries.

However, Vercel does not support private Git Submodules for now. There have been many community-made workarounds, like [calling Vercel CLI inside GitHub Actions](https://github.com/vercel/community/discussions/44#discussioncomment-22319) (not a fundamental solution) or [using shell scripts](https://github.com/beeinger/vercel-private-submodule) (it works, but it cannot fit general needs like cloning multiple repositories, auto-response for newly added submodules), having their own set of limitations.

## 📦 Installation and Usage

```
yarn add -D vercel-submodules
```

Go to the [**Build & Development Settings** section](https://vercel.com/docs/concepts/deployments/configure-a-build#build-and-development-settings) and override **Build Command** with `vercel-submodules --all && (...)`. Such as `vercel-submodules --all && yarn build`.

Once configured, `vercel-submodules` take care of everything. It detects the indicated commit hashes with all or configured submodules; you don't have to update anything again!

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

```
npx vercel-submodules --token 7777777141f111cf9f0308a63dbd9d0cad3010c4
```

> FYI, that's my [Ethereum address](https://etherscan.io/enslookup-search?search=junhoyeo.eth) 💎

The default value is `$GITHUB_TOKEN`.
