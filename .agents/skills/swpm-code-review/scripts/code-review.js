#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()
let errors = 0
let warnings = 0

// Get files to review
let filesToReview = []

if (process.argv.includes('--master')) {
  // Get files changed compared to master
  try {
    const diffOutput = execSync('git diff master --name-only', { encoding: 'utf-8', cwd: ROOT })
    filesToReview = diffOutput.trim().split('\n').filter(f => f && (f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.md')))
    console.log(`Reviewing ${filesToReview.length} file(s) changed from master...`)
  } catch (error) {
    console.error('Error getting diff from master:', error.message)
    process.exit(1)
  }
} else if (process.argv.includes('--staged')) {
  // Get staged files
  try {
    const diffOutput = execSync('git diff --cached --name-only', { encoding: 'utf-8', cwd: ROOT })
    filesToReview = diffOutput.trim().split('\n').filter(f => f && (f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.md')))
    console.log(`Reviewing ${filesToReview.length} staged file(s)...`)
  } catch (error) {
    console.error('Error getting staged files:', error.message)
    process.exit(1)
  }
} else if (process.argv.length > 2) {
  // Specific files passed as arguments
  filesToReview = process.argv.slice(2).filter(f => !f.startsWith('--'))
} else {
  // All source files (including tests)
  filesToReview = getFiles(join(ROOT, 'src'), ['.ts', '.js', '.md'])
}

if (filesToReview.length === 0) {
  console.log('No files to review.')
  process.exit(0)
}

console.log('SWPM Code Review')
console.log('===============\n')

// Check typing standards
console.log('Checking typing standards...')
const tsFiles = filesToReview.filter(f => f.endsWith('.ts'))

let interfaceCount = 0
let anyCount = 0
let wrongImportCount = 0

for (const file of tsFiles) {
  const content = readFileSync(file, 'utf-8')
  
  // Check for interface keyword (not in comments)
  const interfaceMatches = content.match(/^[^/]*interface\s+/gm)
  if (interfaceMatches) {
    interfaceCount++
    console.log(`❌ Found 'interface' in ${file}:${content.split('\n').findIndex(l => l.includes('interface')) + 1}`)
  }
  
  // Check for any type
  const anyMatches = content.match(/:\s*any\b/g)
  if (anyMatches) {
    anyCount++
    console.log(`❌ Found 'any' type in ${file}`)
  }
  
  // Check for import type usage
  const wrongImports = content.match(/^import\s+{[^}]*type[^}]*}\s+from/gm)
  if (wrongImports) {
    wrongImportCount++
    console.log(`❌ Missing 'type' keyword in import in ${file}`)
  }
}

if (interfaceCount === 0) {
  console.log('✅ No `interface` usage found')
} else {
  errors += interfaceCount
}

if (anyCount === 0) {
  console.log('✅ No `any` type found')
} else {
  errors += anyCount
}

if (wrongImportCount === 0) {
  console.log('✅ All type imports use `import type`')
} else {
  errors += wrongImportCount
}

// Check naming conventions
console.log('\nChecking naming conventions...')
const srcFiles = filesToReview.filter(f => f.endsWith('.ts') || f.endsWith('.js'))

let namingErrors = 0
for (const file of srcFiles) {
  const basename = file.split('/').pop() || ''
  const name = basename.split('.')[0]
  
  // Check for PascalCase or snake_case in src/
  if (/[A-Z]/.test(name) && !basename.startsWith('SKILL')) {
    console.log(`❌ PascalCase file: ${file}`)
    namingErrors++
  }
  
  if (/_/.test(name)) {
    console.log(`❌ snake_case file: ${file}`)
    namingErrors++
  }
}

if (namingErrors === 0) {
  console.log('✅ All files follow kebab-case or lowercase')
} else {
  errors += namingErrors
}

// Check package.json
console.log('\nChecking project constraints...')
const packageJson = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'))

// Node version
const nodeVersion = packageJson.engines?.node || packageJson.volta?.node || ''
if (nodeVersion && !nodeVersion.includes('20')) {
  console.log(`❌ Node.js version: ${nodeVersion} (expected: >=20)`)
  errors++
} else {
  console.log(`✅ Node.js version: ${nodeVersion || '20+'}`)
}

// ESM
if (packageJson.type !== 'module') {
  console.log('❌ Not ESM (missing "type": "module")')
  errors++
} else {
  console.log('✅ ESM enabled')
}

// yargs version
const yargsVersion = packageJson.dependencies?.yargs || ''
if (yargsVersion && !yargsVersion.startsWith('18')) {
  console.log(`❌ @yargs version: ${yargsVersion} (expected: v18+)`)
  errors++
} else {
  console.log(`✅ @yargs version: ${yargsVersion || '18+'}`)
}

// Check CHANGELOG.md
console.log('\nChecking CHANGELOG.md...')
const changelog = readFileSync(join(ROOT, 'CHANGELOG.md'), 'utf-8')

// Check for slashes in dates
const slashDates = changelog.match(/\d{4}\/\d{2}\/\d{2}/g)
if (slashDates && slashDates.length > 0) {
  console.log(`❌ Found ${slashDates.length} date(s) with slashes (use hyphens): ${slashDates.slice(0, 3).join(', ')}...`)
  errors += slashDates.length
} else {
  console.log('✅ Date formats correct (YYYY-MM-DD)')
}

// Check for [Unreleased] section
if (!changelog.includes('## [Unreleased]')) {
  console.log('❌ Missing `## [Unreleased]` section')
  errors++
} else {
  console.log('✅ [Unreleased] section present')
}

// Check for backtick issues in .md files
console.log('\nChecking Markdown files...')
const mdFiles = filesToReview.filter(f => f.endsWith('.md'))
let backtickErrors = 0

for (const file of mdFiles) {
  const content = readFileSync(file, 'utf-8')
  if (content.includes('`')) {
    console.log(`❌ Escaped backticks in ${file}`)
    backtickErrors++
  }
}

if (backtickErrors === 0) {
  console.log('✅ No Markdown lint errors')
} else {
  errors += backtickErrors
}

// Run linters
console.log('\nRunning linters...')
try {
  execSync('npm run lint', { encoding: 'utf-8', cwd: ROOT, stdio: 'inherit' })
  console.log('✅ Lint passed')
} catch (error) {
  console.log('❌ Lint failed')
  errors++
}

// Run TypeScript check
console.log('\nRunning TypeScript check...')
try {
  execSync('npm run ts:check', { encoding: 'utf-8', cwd: ROOT, stdio: 'inherit' })
  console.log('✅ TypeScript check passed')
} catch (error) {
  console.log('❌ TypeScript check failed')
  errors++
}

// Run tests for changed files
const testFiles = filesToReview.filter(f => f.includes('.test.ts'))
if (testFiles.length > 0) {
  console.log(`\nRunning tests for ${testFiles.length} test file(s)...`)
  try {
    testFiles.forEach(file => {
      execSync(`npx vitest run ${file} --pool=forks`, { encoding: 'utf-8', cwd: ROOT, stdio: 'inherit' })
    })
    console.log('✅ Tests passed')
  } catch (error) {
    console.log('❌ Tests failed')
    errors++
  }
} else {
  console.log('\nNo test files to run')
}

// Summary
console.log('\n===============')
if (errors === 0) {
  console.log('Review Complete: ✅ No errors, 0 warnings')
} else {
  console.log(`Review Complete: ❌ ${errors} error(s), ${warnings} warning(s)`)
}

process.exit(errors > 0 ? 1 : 0)

// Helper function
function getFiles(dir, extensions) {
  const files = []
  const items = readdirSync(dir)
  
  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...getFiles(fullPath, extensions))
    } else if (stat.isFile()) {
      const ext = extname(fullPath)
      if (Array.isArray(extensions) ? extensions.includes(ext) : ext === extensions) {
        files.push(fullPath)
      }
    }
  }
  
  return files
}
