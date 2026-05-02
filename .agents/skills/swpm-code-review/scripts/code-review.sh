#!/usr/bin/env bash

set -e

# Default values
BRANCH="master"
FILES=""
STAGED=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --master)
      BRANCH="master"
      shift
      ;;
    --main)
      BRANCH="main"
      shift
      ;;
    --staged)
      STAGED=true
      shift
      ;;
    --files)
      FILES="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--master|--main|--staged|--files <file1 file2...>]"
      exit 1
      ;;
  esac
done

echo "=== SWPM Code Review ==="
echo ""

# Get files to check
if [ "$STAGED" = true ]; then
  echo "Checking staged files..."
  files=$(git diff --cached --name-only -- '*.ts' '*.js' '*.md' | grep -v '.test.\|spec.' || true)
elif [ -n "$FILES" ]; then
  echo "Checking specified files: $FILES"
  files="$FILES"
else
  echo "Checking changes vs $BRANCH branch..."
  files=$(git diff "${BRANCH}..HEAD" --name-only -- '*.ts' '*.js' '*.md' | grep -v '.test.\|spec.' || true)
fi

if [ -z "$files" ]; then
  echo "No files to check."
  exit 0
fi

echo "Files to review:"
echo "$files" | while IFS= read -r file; do
  echo "  - $file"
done
echo ""

# Run lint
echo "=== Running lint ==="
npm run lint 2>&1 || true
echo ""

# Run type check
echo "=== Running type check ==="
npm run ts:check 2>&1 || true
echo ""

# Run tests for changed test files
echo "=== Running tests for changed files ==="
for file in $files; do
  if [[ "$file" == *.test.ts ]] || [[ "$file" == *.spec.ts ]]; then
    echo "Running test: $file"
    npx vitest run "$file" --pool=forks 2>&1 || true
  fi
done

# Check typing standards in changed files
echo ""
echo "=== Checking typing standards ==="
echo "$files" | while IFS= read -r file; do
  if [[ "$file" == *.ts ]]; then
    # Check for 'any' type
    if grep -q "\bany\b" "$file" 2>/dev/null; then
      echo "  WARNING: Found 'any' type in $file"
    fi
    
    # Check for 'interface' (should use 'type')
    if grep -q "^interface " "$file" 2>/dev/null; then
      echo "  WARNING: Found 'interface' in $file (use 'type' instead)"
    fi
  fi
done

# Check naming conventions in changed files
echo ""
echo "=== Checking naming conventions ==="
echo "$files" | while IFS= read -r file; do
  if [[ "$file" == *.ts ]]; then
    # Check for PascalCase components/functions (should be camelCase)
    if grep -q "^export const [A-Z]" "$file" 2>/dev/null; then
      echo "  WARNING: Found PascalCase export in $file (use camelCase)"
    fi
  fi
done

# Check markdown files
echo ""
echo "=== Checking markdown files ==="
echo "$files" | while IFS= read -r file; do
  if [[ "$file" == *.md ]]; then
    # Check for trailing whitespace
    if grep -q " $" "$file" 2>/dev/null; then
      echo "  WARNING: Found trailing whitespace in $file"
    fi
    
    # Check for multiple consecutive blank lines
    if grep -qP "\n\n\n" "$file" 2>/dev/null; then
      echo "  WARNING: Found multiple consecutive blank lines in $file"
    fi
  fi
done

echo ""
echo "=== Code Review Complete ==="
