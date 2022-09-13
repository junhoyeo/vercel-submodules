![Vercel Submodules](./vercel-submodules.svg)


<h1>
<code>vercel-submodules</code>: <br />
The CLI to handle <br />
<strong>Git Submodules</strong> <br />
in your <strong><a href="https://vercel.com/home">Vercel</a> Project</strong>
</h1>

## Installation and Usage

```
yarn add -D vercel-submodules
```

Go to the [**Build & Development Settings** section](https://vercel.com/docs/concepts/deployments/configure-a-build#build-and-development-settings) and override **Build Command** with `vercel-submodules --all && (...)`. Such as `npx vercel-submodules --all && yarn build`.

## Clone all Submodules

```
npx vercel-submodules --all
```

This command clones all submodules inside the repository.

## Clone selected Submodules

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

Default value is `1`

## Token

```
npx vercel-submodules --token 7777777141f111cf9f0308a63dbd9d0cad3010c4
```
> FYI, that's my Ethereum address

Default value is `$GITHUB_TOKEN`
