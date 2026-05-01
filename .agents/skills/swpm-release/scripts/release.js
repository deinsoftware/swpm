#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { prompt } from 'readline-sync'

const CHANGELOG = 'CHANGELOG.md'
const PACKAGE = 'package.json'

// Read current version from package.json
const packageJson = JSON.parse(readFileSync(PACKAGE, 'utf-8'))
const currentVersion = packageJson.version
const [major, minor, patch] = currentVersion.split('.').map(Number)

// Prompt for version type
console.log(`Current version: ${currentVersion}`)
console.log('Select version bump:')
console.log(`  1) patch (${major}.${minor}.${patch + 1})`)
console.log(`  2) minor (${major}.${minor + 1}.0)`)
console.log(`  3) major (${major + 1}.0.0)`)

const choice = prompt('Choice: ')
let newVersion
if (choice === '1') {
  newVersion = `${major}.${minor}.${patch + 1}`
} else if (choice === '2') {
  newVersion = `${major}.${minor + 1}.0`
} else if (choice === '3') {
  newVersion = `${major + 1}.0.0`
} else {
  console.error('Invalid choice')
  process.exit(1)
}

console.log(`\nNew version will be: ${newVersion}`)
const confirm = prompt('Proceed? (y/N): ')
if (confirm.toLowerCase() !== 'y') {
  console.log('Cancelled')
  process.exit(0)
}

// Update package.json
packageJson.version = newVersion
writeFileSync(PACKAGE, JSON.stringify(packageJson, null, 2) + '\n')
console.log(`\nUpdating ${PACKAGE} to ${newVersion}...`)

// Read CHANGELOG.md
let changelog = readFileSync(CHANGELOG, 'utf-8')

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0]

// Find [Unreleased] section
const unreleasedRegex = /(## \[Unreleased\]\n\n)([\s\S]*?)(?=\n## \[|$)/i
const match = changelog.match(unreleasedRegex)

if (!match) {
  console.error('Could not find [Unreleased] section in CHANGELOG.md')
  process.exit(1)
}

const unreleasedContent = match[2].trim()

if (!unreleasedContent) {
  console.error('[Unreleased] section is empty. Nothing to release.')
  process.exit(1)
}

// Create new version section
const newVersionSection = `\n## [${newVersion}] - ${today}\n\n${unreleasedContent}\n`

// Replace [Unreleased] content with empty (keep the header)
changelog = changelog.replace(unreleasedRegex, '## [Unreleased]\n\n')

// Insert new version section after [Unreleased]
const unreleasedIndex = changelog.indexOf('## [Unreleased]')
const insertIndex = changelog.indexOf('\n\n', unreleasedIndex) + 2
changelog = changelog.slice(0, insertIndex) + newVersionSection + changelog.slice(insertIndex)

// Update comparison links at bottom
const linkRegex = /(\[unreleased\]: .*?compare\/v.*?...HEAD)/i
changelog = changelog.replace(linkRegex, `[unreleased]: https://github.com/deinsoftware/swpm/compare/v${newVersion}...HEAD`)

// Add new comparison link before [unreleased]
const newLink = `[${newVersion}]: https://github.com/deinsoftware/swpm/compare/v${currentVersion}...v${newVersion}\n`
changelog = changelog.replace(/\[unreleased\]:/i, `${newLink}[unreleased]:`)

// Write updated CHANGELOG
writeFileSync(CHANGELOG, changelog)
console.log(`Moving [Unreleased] entries to [${newVersion}] - ${today}...`)
console.log(`Updating comparison links...`)

// Extract the new version section from CHANGELOG
const versionSectionRegex = new RegExp(`## \\[${newVersion}\\] - .*?\\n\\n([\\s\\S]*?)(?=\\n## \\[|\\n\\[)`, 'i')
const versionMatch = changelog.match(versionSectionRegex)
const versionContent = versionMatch ? versionMatch[1].trim() : ''

console.log(`\n=== COPY BELOW FOR COMMIT ===`)
console.log(`Tag: v${newVersion}`)
console.log(`\n--- CHANGELOG CONTENT FOR v${newVersion} ---`)
console.log(versionContent)
console.log(`--- END ---\n`)

console.log(`\nNext steps:`)
console.log(`  1. Review CHANGELOG.md`)
console.log(`  2. Copy the tag and content above`)
console.log(`  3. Commit: git add . && git commit -m "Release v${newVersion}"`)
console.log(`  4. Create tag manually: git tag v${newVersion}`)
console.log(`  5. Push tag: git push origin v${newVersion}`)
console.log(`\n(You manage tagging manually to control the publish hook)`)
