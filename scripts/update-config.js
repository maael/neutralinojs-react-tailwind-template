const path = require('path')
const fs = require('fs')
const configPath = path.join(__dirname, '..', 'neutralino.config.json')
const config = require(configPath)

const projectName = path.basename(process.cwd())

config.modes = config.modes || {}
config.modes.window = config.modes.window || {}
config.modes.window.title = projectName
config.cli.binaryName = projectName
config.modes.window.enableInspector = false
config.modes.window.alwaysOnTop = false
config.globalVariables.ENVIRONMENT = process.env.ENVIRONMENT || 'development'
config.modes.browser.globalVariables.ENVIRONMENT = process.env.ENVIRONMENT || 'development'

const githubRef = process.env.GITHUB_REF || ''
let githubVersion
if (githubRef.startsWith('refs/tags/v')) {
  githubVersion = githubRef.replace('refs/tags/v', '').trim()
}

config.version = process.env.APP_VERSION || githubVersion || config.version
config.globalVariables.APP_VERSION = config.version
config.modes.browser.globalVariables.APP_VERSION = config.version

fs.writeFileSync(path.join(process.cwd(), 'neutralino.config.json'), JSON.stringify(config, undefined, 2), {
  encoding: 'utf-8',
})

console.info('[config][updated]', { version: config.version })
