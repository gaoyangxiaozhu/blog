import path from 'path'
import gulp from 'gulp'
import del from 'del'

const  spawn = require('child_process').spawn

gulp.task('clean',)


function run(command, args){
    return new Promise((resolve , reject) => {
        let task = spawn(command, args, {
            cwd: process.cwd()
        }).on('close', (code) => {
            if(code !== 0){
                reject(new Error(`${command} process exited with code ${code}`))
            }else{
                resolve()
            }
        })
        task.stdout.pipe(process.stdout)
        task.stdin.pipe(process.stdin)
    })
}
gulp.task('build', (cb) => {
    run('node_modules/.bin/hexo', ['generate']).then(()=>{
        return del(['public/tags', 'public/categories', 'public/archives'])
    }).then(() => {
        cb()
    })
    .catch((e) => {
        console.error(e.message)
        cb()
    })
})

gulp.task('default', ['build'])
