// Validates that ko.json and en.json expose the exact same key set, enforcing
// CLAUDE.md's "두 파일의 키는 항상 동기화" rule mechanically instead of by review.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesDir = path.resolve(dirname, '../src/shared/i18n/messages')

function flattenKeys(obj, prefix = '') {
  const keys = []
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

const ko = JSON.parse(readFileSync(path.join(messagesDir, 'ko.json'), 'utf-8'))
const en = JSON.parse(readFileSync(path.join(messagesDir, 'en.json'), 'utf-8'))

const koKeys = new Set(flattenKeys(ko))
const enKeys = new Set(flattenKeys(en))

const onlyInKo = [...koKeys].filter((key) => !enKeys.has(key))
const onlyInEn = [...enKeys].filter((key) => !koKeys.has(key))

if (onlyInKo.length === 0 && onlyInEn.length === 0) {
  console.log(`ko.json / en.json in sync (${koKeys.size} keys).`)
  process.exit(0)
}

if (onlyInKo.length > 0) {
  console.error(`Keys only in ko.json (${onlyInKo.length}):`)
  for (const key of onlyInKo) console.error(`  - ${key}`)
}
if (onlyInEn.length > 0) {
  console.error(`Keys only in en.json (${onlyInEn.length}):`)
  for (const key of onlyInEn) console.error(`  - ${key}`)
}
process.exit(1)
