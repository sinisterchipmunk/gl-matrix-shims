fs = require 'fs'
sys = require 'sys'
jst = require 'jst'
{spawn, exec} = require 'child_process'

puts = (error, stdout, stderr) ->
  sys.puts stdout
  sys.puts stderr

run = (cmd, args, cb) ->
  proc =         spawn cmd, args
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.on        'exit', (status) ->
    process.exit(1) if status != 0
    cb() if typeof cb is 'function'

task 'build', 'rebuild the shims', build = (options) ->
  try
    fs.mkdirSync 'build'
  catch e
    1
  files = fs.readdirSync 'src'
  files = ('src/' + file for file in files when file.match(/\.coffee$/))
  run 'coffee', ['-c', '-o', 'build'].concat(files), options.cb

task 'test', 'rebuild the shims, then run the tests', (options) ->
  build cb: ->
    exec 'NODE_PATH=$NODE_PATH:./build:./vendor node_modules/jasmine-node/bin/jasmine-node --color spec', puts

task 'browser', 'build browser-compatible distribution', (options) ->
  build cb: ->
    try
      fs.mkdirSync 'dist'
    catch e
      1
    files = fs.readdirSync 'build'
    files = (file.replace(/\.js$/, '') for file in files when file.match(/\.js$/))
    files = (filename: file, source: fs.readFileSync("build/#{file}.js") for file in files)
    dist = jst.render fs.readFileSync('src/template.js').toString().replace(/\n/g, '\\n'), files: files
    fs.writeFileSync 'dist/gl-matrix-shims.js', dist
