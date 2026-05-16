import fetch from 'node-fetch'
// @ts-expect-error - for google-auth-library
if (!globalThis.fetch) globalThis.fetch = fetch
import * as core from '@actions/core'
import * as glob from '@actions/glob'
import axios from 'axios'
import { readFileSync } from 'node:fs'
import { JWT } from 'google-auth-library'
import { Webstore } from './webstore.js'

// Inputs
const inputs = {
  extID: core.getInput('extension_id', { required: true }),
  pubID: core.getInput('publisher_id', { required: true }),

  zipFile: core.getInput('zip_file'),
  submit: core.getBooleanInput('submit'),
  status: core.getBooleanInput('status'),

  jsonData: core.getInput('json_data'),
  jsonFile: core.getInput('json_file'),

  email: core.getInput('client_email'),
  key: core.getInput('private_key'),

  token: core.getInput('token'),

  summary: core.getBooleanInput('summary'),
} as const

type Inputs = typeof inputs

async function main() /* NOSONAR */ {
  const version: string = process.env.GITHUB_ACTION_REF
    ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
    : '\u001b[33;1mSource'
  core.info(`🏳️ Starting Web Store Publish Action - ${version}`)

  // // Debug
  // core.startGroup('Debug: github.context')
  // console.log(github.context)
  // core.endGroup() // Debug github.context
  // core.startGroup('Debug: process.env')
  // console.log(process.env)
  // core.endGroup() // Debug process.env

  // // Debug Path
  // const __filename = fileURLToPath(import.meta.url)
  // core.debug(`__filename: ${__filename}`)
  // const __dirname = path.dirname(__filename)
  // core.debug(`__dirname: ${__dirname}`)
  // const src = path.resolve(__dirname, '../src')
  // core.debug(`src: ${src}`)

  // Setup
  if (!inputs.zipFile && !inputs.submit && !inputs.status) {
    return core.setFailed('You must provide a zip file, submit extension or get status.')
  }
  let zipFile: string | undefined
  if (inputs.zipFile) {
    const globber = await glob.create(inputs.zipFile)
    const files = await globber.glob()
    console.log('files:', files)
    const file = files[0]
    console.log('file:', file)
    if (!file) return core.setFailed(`No files matching glob: ${inputs.zipFile}`)
    zipFile = file
  }

  const token = await getToken(inputs)
  // console.log('token:', token)
  if (!token) {
    return core.setFailed('Unable to get Access Token.')
  }
  core.setSecret(token)

  // Process
  const api = new Webstore(inputs.pubID, inputs.extID, token)

  let upload
  if (zipFile) {
    core.info(`Uploading ZIP: ${zipFile}`)
    const file = readFileSync(zipFile)
    upload = await api.uploadFile(file)
    core.startGroup('Upload')
    console.log(upload)
    core.endGroup() // Upload
  } else {
    core.info('Skipping Extension Upload...')
  }

  let publish
  if (inputs.submit) {
    core.info(`Submitting Extension: ${inputs.extID}`)
    publish = await api.publishExtension()
    core.startGroup('Publish')
    console.log(publish)
    core.endGroup() // Publish
  } else {
    core.info('Skipping Submit for Review...')
  }

  let status
  if (inputs.status) {
    core.info(`Getting Status: ${inputs.extID}`)
    status = await api.getExtension()
    core.startGroup('Status')
    console.log(status)
    core.endGroup() // Status
  }

  // Summary
  if (inputs.summary) {
    core.info('📝 Writing Job Summary')
    try {
      await addSummary(inputs, upload, publish, status)
    } catch (e) {
      console.log(e)
      if (e instanceof Error) core.warning(`Error writing Job Summary ${e.message}`)
    }
  }

  // Set Outputs
  core.info('📩 Setting Outputs')
  core.setOutput('token', token)
  if (upload) core.setOutput('upload', upload)
  if (publish) core.setOutput('publish', publish)
  if (status) core.setOutput('status', status)

  core.info(`✅ \u001b[32;1mFinished Success`)
}

async function getToken(inputs: Inputs) {
  if (inputs.token) return inputs.token

  let email = inputs.email
  let key = inputs.key
  if (inputs.jsonData || inputs.jsonFile) {
    core.info('Parsing Credentials from JSON...')
    const json = inputs.jsonData || readFileSync(inputs.jsonFile, 'utf8')
    const data = JSON.parse(json)
    email = data.client_email
    key = data.private_key
  }
  console.log('email length:', email.length)
  // console.log('email:', email.slice(16))
  console.log('key length:', key.length)
  // console.log('key:', key.slice(0, 27))
  if (!email || !key) {
    throw new Error('You must provide the credentials JSON or both key/email.')
  }

  // Token
  const scopes = ['https://www.googleapis.com/auth/chromewebstore']
  // const auth = new GoogleAuth({ keyFile: inputs.jsonData, credentials: data, scopes })
  const client = new JWT({ email, key, scopes })
  core.info('Getting Access Token...')
  const token = await client.getAccessToken()
  console.log('token.token length:', token.token?.length)
  // console.log('token.token:', token.token?.slice(0, 32))
  return token.token
}

async function addSummary(inputs: Inputs, upload: any, publish: any, status: any) {
  const itemUrl = `https://chromewebstore.google.com/detail/${inputs.extID}`
  const packageUrl = `https://chrome.google.com/webstore/devconsole/${inputs.pubID}/${inputs.extID}/edit/package`
  const downloadUrl = `https://chrome.google.com/webstore/download/${inputs.extID}/revision/__DRAFT/package/main/crx/3`

  core.summary.addRaw('## Web Store Publish Action\n\n')
  core.summary.addRaw(
    `Publishing Extension [${inputs.extID}](${itemUrl}) to the [Developer Console](${packageUrl}).\n\n`,
  )

  if (upload) {
    core.summary.addRaw(`\n\n:globe_with_meridians: Successfully Uploaded Extension.\n\n`)
    core.summary.addCodeBlock(JSON.stringify(upload, null, 2), 'json')
  }
  if (publish) {
    core.summary.addRaw(`\n\n:rocket: Successfully Submitted Extension.\n\n`)
    core.summary.addCodeBlock(JSON.stringify(publish, null, 2), 'json')
  }
  if (status) {
    core.summary.addRaw(`\n\n:question: Extension Status.\n\n`)
    core.summary.addCodeBlock(JSON.stringify(status, null, 2), 'json')
  }

  core.summary.addRaw('\n<details><summary>Details</summary>')
  core.summary.addTable([
    [
      { data: 'Item', header: true },
      { data: 'Value', header: true },
    ],
    [{ data: 'Extension ID' }, { data: inputs.extID }],
    [{ data: 'Publisher ID' }, { data: inputs.pubID }],
    [{ data: 'ZIP File' }, { data: inputs.zipFile }],
    [{ data: 'Store Item' }, { data: itemUrl }],
    [{ data: 'Dashboard' }, { data: packageUrl }],
    [{ data: 'Download' }, { data: downloadUrl }],
  ])
  core.summary.addRaw('</details>\n')

  const text = 'View Documentation, Report Issues or Request Features'
  const link = 'https://github.com/cssnr/webstore-publish-action'
  core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
  await core.summary.write()
}

try {
  await main()
} catch (e) {
  if (axios.isAxiosError(e)) {
    console.log('isAxiosError:', e.message)
    const data = e.response?.data
    console.log('data:', data)
    const message = data?.error?.message
    console.log('message:', message)
    core.setFailed(message || e.message || 'Unknown Axios Error')
  } else if (e instanceof Error) {
    console.log('Error:', e)
    core.setFailed(e.message)
  } else {
    console.log('Unknown Error:', e)
    core.setFailed('Unknown Error')
  }
}
