import path from 'path'
import { moveFile } from 'move-file'
import rimraf from 'rimraf'

const NAME = path.basename(process.cwd())

async function rimrafPromise(path) {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

console.info('Project:', NAME)
;(async () => {
  await rimrafPromise(path.join(process.cwd(), 'dist', NAME, `${NAME}-linux*`))
  await rimrafPromise(path.join(process.cwd(), 'dist', NAME, `${NAME}-mac*`))
  await rimrafPromise(path.join(process.cwd(), 'dist', 'cmd'))
  try {
    await moveFile(
      path.join(process.cwd(), 'dist', NAME, `${NAME}-win_x64.exe`),
      path.join(process.cwd(), 'dist', NAME, `${NAME}.exe`)
    )
  } catch (e) {
    if (e.message.includes('ENOENT')) {
      console.warn('[move]', `Couldn't find: ${path.join(process.cwd(), 'dist', NAME, `${NAME}-win_x64.exe`)}`)
    }
  }
  console.info('DONE')
})()
