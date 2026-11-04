const test = require('node:test')
const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')

test('browser entry rejects a missing Fetch API', () => {
  const result = spawnSync(process.execPath, ['-e', 'global.window={};require("./index.js")'], { cwd: __dirname + '/..', encoding: 'utf8' })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /You need fetch API/)
})

test('GET parses JSON and POST preserves options and serializes body', async () => {
  global.window = { fetch: true }
  const calls = []
  global.fetch = async (url, options) => {
    calls.push({ url, options })
    return { json: async () => ({ ok: true }) }
  }
  const { get, post } = require('../index.js')
  assert.deepEqual(await get('/fixture'), { ok: true })
  const options = { body: { value: 42 }, extra: 'preserved' }
  const response = await post('/fixture', options)
  assert.deepEqual(await response.json(), { ok: true })
  assert.deepEqual(calls[1].options, { body: '{"value":42}', extra: 'preserved', method: 'post', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
  assert.deepEqual(options.body, { value: 42 })
  await post('/fixture', { body: 'already encoded' })
  assert.equal(calls[2].options.body, 'already encoded')
})

test('fetch failures propagate to callers', async () => {
  const failure = new Error('synthetic failure')
  global.fetch = async () => { throw failure }
  const { get, post } = require('../index.js')
  await assert.rejects(get('/fixture'), failure)
  await assert.rejects(post('/fixture', {}), failure)
})
