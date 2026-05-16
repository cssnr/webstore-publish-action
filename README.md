[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/webstore-publish-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/webstore-publish-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/webstore-publish-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/webstore-publish-action/releases)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/webstore-publish-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/webstore-publish-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/webstore-publish-action/dist%2Findex.js?logo=bookstack&logoColor=white&label=dist%20size)](https://github.com/cssnr/webstore-publish-action/blob/master/src)
[![Action Run Using](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fcssnr%2Fwebstore-publish-action%2Frefs%2Fheads%2Fmaster%2Faction.yml&query=%24.runs.using&logo=githubactions&logoColor=white&label=runs)](https://github.com/cssnr/actionlint-action/blob/master/action.yml)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/webstore-publish-action/release.yaml?logo=norton&logoColor=white&label=release)](https://github.com/cssnr/webstore-publish-action/actions/workflows/release.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/webstore-publish-action/lint.yaml?logo=norton&logoColor=white&label=lint)](https://github.com/cssnr/webstore-publish-action/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/webstore-publish-action?logo=github&label=updated)](https://github.com/cssnr/webstore-publish-action)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/webstore-publish-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/webstore-publish-action)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/webstore-publish-action?logo=buffer&label=repo%20size)](https://github.com/cssnr/webstore-publish-action?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/webstore-publish-action?logo=devbox)](https://github.com/cssnr/webstore-publish-action?tab=readme-ov-file#readme)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/webstore-publish-action?logo=southwestairlines)](https://github.com/cssnr/webstore-publish-action/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues/cssnr/webstore-publish-action?logo=codeforces&logoColor=white)](https://github.com/cssnr/webstore-publish-action/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/webstore-publish-action?logo=livechat&logoColor=white)](https://github.com/cssnr/webstore-publish-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/webstore-publish-action?style=flat&logo=forgejo&logoColor=white)](https://github.com/cssnr/webstore-publish-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/webstore-publish-action?style=flat&logo=gleam&logoColor=white)](https://github.com/cssnr/webstore-publish-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=apachespark&logoColor=white&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Web Store Publish Action

<a title="Web Store Publish Action" href="https://actions.cssnr.com/" target="_blank">
<img alt="Web Store Publish Action" align="right" width="128" height="auto" src="https://raw.githubusercontent.com/cssnr/webstore-publish-action/refs/heads/master/.github/assets/logo.svg"></a>

- [Features](#Features)
- [Setup](#Setup)
- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Support](#Support)
- [Contributing](#Contributing)

Upload and/or Publish Web Extensions to the Google Chrome Web Store v2 using Service Account Credentials, JSON, or Token.
Additionally, you can check the status of your extension and reuse the generated bearer token later in the workflow from the [Outputs](#outputs).

```yaml
- name: 'Web Store Publish'
  uses: cssnr/webstore-publish-action@v1
  with:
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    zip_file: chrome-extension.zip # uploads extension
    submit: true # submits extension for publishing
    json_data: ${{ secrets.WEBSTORE_JSON }}
```

For additional ways to provide authentication, see the [Inputs](#Inputs) or [Examples](#Examples).

## Features

- Upload, Publish, or Both
- Check Extension Status
- Works With Service Accounts
- Provide JSON Data, File, Credentials or Token
- Outputs Generated Bearer Token
- Uses the Google Chrome [Web Store API v2](https://developer.chrome.com/docs/webstore/api/reference/rest)

### Upcoming

- Add Outputs for download, dashboard, and item URLs.

The API also allows getting the status, cancelling a submission and changing deploy percentage.
These features can **easily** be added [on request](https://github.com/cssnr/webstore-publish-action/issues/new?template=1-feature.yaml).

> If you want to see one of these features, or another one,
> please [submit a feature request](https://github.com/cssnr/webstore-publish-action/issues/new?template=1-feature.yaml).

## Setup

1. Follow all the steps on this page only:
   - <https://developer.chrome.com/docs/webstore/service-accounts>
2. Download the Service Account JSON file.
3. Open the file and copy the contents.
4. Add the contents as the value to a GitHub Secret.
   - Recommended to minify the JSON: `jq . -c credentials.json`
5. Set the `json_data` input to the secret (see the [Examples](#Examples)).

To get your Publisher ID, see these instructions:

- <https://developer.chrome.com/docs/webstore/using-api#obtain_your_publisher_id>

## Inputs

> [!TIP]  
> Only provide `json_data` **OR** `json_file` **OR** `client_email`/`private_key` **OR** `token`

| Input                         |  Req.   | Default | Input&nbsp;Description       |
| :---------------------------- | :-----: | :-----: | :--------------------------- |
| **extension_id**              | **Yes** |    -    | Chrome Extension ID          |
| [publisher_id](#publisher_id) | **Yes** |    -    | Chrome Publisher ID          |
| [zip_file](#zip_file)         |    -    |    -    | Extension ZIP File Glob      |
| [submit](#submit)             |    -    | `false` | Submit Extension for Review  |
| [status](#status)             |    -    | `false` | Check Extension Status       |
| **json_data**                 |    -    |    -    | Service Account JSON Data    |
| **json_file**                 |    -    |    -    | Service Account JSON File    |
| **client_email**              |    -    |    -    | Service Account Client Email |
| **private_key**               |    -    |    -    | Service Account Private Key  |
| **token**                     |    -    |    -    | Generated Bearer Token       |
| **summary**                   |    -    | `true`  | Add Summary to Job           |

There are 4 ways to provide authentication.  
Either provide the service account credentials JSON `json_data` (as a string),
a path to the JSON `json_file`, or the `client_email` and `private_key` from the JSON file.

Alternatively, if you have already generated a Bearer Token, you can provide the `token` only.

#### publisher_id

You can get the Publisher ID from the Developer Dashboard.

- https://developer.chrome.com/docs/webstore/using-api#obtain_your_publisher_id

#### zip_file

This is the path to your extension archive zip file.  
Supports file globs (uses the first file matched).  
Omit this to skip uploading to [submit](#submit) only.

#### submit

Set this to `true` to submit the extension for publishing/review.

### status

Set this to `true` to check the extension status or just test the workflow.

## Examples

If you added the Credentials JSON file contents as a secret.

```yaml
- name: 'Web Store Publish'
  uses: cssnr/webstore-publish-action@v1
  with:
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    zip_file: chrome-extension.zip # uploads extension
    submit: true # submits extension for publishing
    json_data: ${{ secrets.WEBSTORE_JSON }}
```

If you have a path to the Credentials JSON file.

```yaml
- name: 'Web Store Publish'
  uses: cssnr/webstore-publish-action@v1
  with:
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    zip_file: chrome-extension.zip # uploads extension
    submit: true # submits extension for publishing
    json_file: service-account-credentials.json
```

If you are only providing the email and key.

```yaml
- name: 'Web Store Publish'
  uses: cssnr/webstore-publish-action@v1
  with:
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    zip_file: chrome-extension.zip # uploads extension
    submit: true # submits extension for publishing
    email: ${{ secrets.CLIENT_EMAIL }}
    key: ${{ secrets.PRIVATE_KEY }}
```

If you already generated a bearer token.

```yaml
- name: 'Web Store Publish'
  uses: cssnr/webstore-publish-action@v1
  with:
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    zip_file: chrome-extension.zip # uploads extension
    submit: true # submits extension for publishing
    token: ${{ env.BEARER_TOKEN }}
```

For more examples, you can check out other projects using this action:  
https://github.com/cssnr/webstore-publish-action/network/dependents

## Outputs

| Output  | Description                 |
| :------ | :-------------------------- |
| token   | Bearer Token                |
| upload  | Upload Response JSON **¹**  |
| publish | Publish Response JSON **¹** |
| status  | Status Response JSON **¹**  |

> **¹** Only available if this input was provided.

This lets you reuse the generated `token` or validate the response data.

```yaml
- name: 'Web Store Publish'
  id: publish
  uses: cssnr/webstore-publish-action@v1
  with:
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    status: true # checks the status of the extension
    json_data: ${{ secrets.WEBSTORE_JSON }}

- name: 'Echo Outputs'
  run: |
    echo "token: ${{ steps.publish.outputs.token }}"
    echo "upload: ${{ steps.publish.outputs.upload }}"
    echo "publish: ${{ steps.publish.outputs.publish }}"
    echo "status: ${{ steps.publish.outputs.status }}"
```

## Tags

The following rolling [tags](https://github.com/cssnr/webstore-publish-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                               | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/webstore-publish-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/webstore-publish-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/webstore-publish-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/webstore-publish-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/webstore-publish-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/webstore-publish-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/webstore-publish-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

# Support

If you run into any issues or need help getting started, please do one of the following:

- [Report an Issue](https://github.com/cssnr/webstore-publish-action/issues)
- [Q&A Discussion](https://github.com/cssnr/webstore-publish-action/discussions/categories/q-a)
- [Request a Feature](https://github.com/cssnr/webstore-publish-action/issues/new?template=1-feature.yaml)
- [Chat with us on Discord](https://discord.gg/wXy6m2X8wY)

[![Features](https://img.shields.io/badge/features-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/cssnr/webstore-publish-action/issues/new?template=1-feature.yaml)
[![Issues](https://img.shields.io/badge/issues-red?style=for-the-badge&logo=southwestairlines&logoColor=white)](https://github.com/cssnr/webstore-publish-action/issues)
[![Discussions](https://img.shields.io/badge/discussions-blue?style=for-the-badge&logo=livechat&logoColor=white)](https://github.com/cssnr/webstore-publish-action/discussions)
[![Discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wXy6m2X8wY)

# Contributing

If you would like to submit a PR, please review the [CONTRIBUTING.md](#contributing-ov-file).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

[![Actions Tools](https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/actions/actions-tools.png)](https://actions-tools.cssnr.com/)

Additionally, you can support other [GitHub Actions](https://actions.cssnr.com/) I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy Action](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [Docker Context Action](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme)
- [Actions Up Action](https://github.com/cssnr/actions-up-action?tab=readme-ov-file#readme)
- [Webstore Publish Action](https://github.com/cssnr/webstore-publish-action?tab=readme-ov-file#readme)
- [Rhysd Actionlint Action](https://github.com/cssnr/actionlint-action?tab=readme-ov-file#readme)
- [Zensical Action](https://github.com/cssnr/zensical-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Homebrew Action](https://github.com/cssnr/homebrew-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [TOML Action](https://github.com/cssnr/toml-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [JSON Key Value Check Action](https://github.com/cssnr/json-key-value-check-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
- [Label Creator Action](https://github.com/cssnr/label-creator-action?tab=readme-ov-file#readme)
- [Algolia Crawler Action](https://github.com/cssnr/algolia-crawler-action?tab=readme-ov-file#readme)
- [Create Pull Action](https://github.com/cssnr/create-pull-action?tab=readme-ov-file#readme)
- [Upload Release Action](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
- [Check Build Action](https://github.com/cssnr/check-build-action?tab=readme-ov-file#readme)
- [Web Request Action](https://github.com/cssnr/web-request-action?tab=readme-ov-file#readme)
- [Get Commit Action](https://github.com/cssnr/get-commit-action?tab=readme-ov-file#readme)

<details><summary>❔ Unpublished Actions</summary>

These actions are not published on the Marketplace, but may be useful.

- [cssnr/create-files-action](https://github.com/cssnr/create-files-action?tab=readme-ov-file#readme) - Create various files from templates.
- [cssnr/draft-release-action](https://github.com/cssnr/draft-release-action?tab=readme-ov-file#readme) - Keep a draft release ready to publish.
- [cssnr/env-json-action](https://github.com/cssnr/env-json-action?tab=readme-ov-file#readme) - Convert env file to json or vice versa.
- [cssnr/push-artifacts-action](https://github.com/cssnr/push-artifacts-action?tab=readme-ov-file#readme) - Sync files to a remote host with rsync.
- [smashedr/update-release-notes-action](https://github.com/smashedr/update-release-notes-action?tab=readme-ov-file#readme) - Update release notes.
- [smashedr/combine-release-notes-action](https://github.com/smashedr/combine-release-notes-action?tab=readme-ov-file#readme) - Combine release notes.

---

</details>

<details><summary>📝 Template Actions</summary>

These are basic action templates that I use for creating new actions.

- [javascript-action](https://github.com/smashedr/javascript-action?tab=readme-ov-file#readme) - JavaScript
- [typescript-action](https://github.com/smashedr/typescript-action?tab=readme-ov-file#readme) - TypeScript
- [py-test-action](https://github.com/smashedr/py-test-action?tab=readme-ov-file#readme) - Dockerfile Python
- [test-action-uv](https://github.com/smashedr/test-action-uv?tab=readme-ov-file#readme) - Dockerfile Python UV
- [docker-test-action](https://github.com/smashedr/docker-test-action?tab=readme-ov-file#readme) - Docker Image Python

Note: The `docker-test-action` builds, runs and pushes images to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

---

</details>

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)

<a href="https://github.com/cssnr/webstore-publish-action">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=cssnr/webstore-publish-action&type=date&legend=bottom-right&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=cssnr/webstore-publish-action&type=date&legend=bottom-right" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=cssnr/webstore-publish-action&type=date&legend=bottom-right" />
 </picture>
</a>
