#!/usr/bin/env bash

set -e

CHANGELOG="CHANGELOG.md"
PACKAGE="package.json"
MANUAL_VERSION=""

# Parse arguments
if [ $# -gt 0 ]; then
  MANUAL_VERSION="$1"
fi

# Read current version from package.json
currentVersion=$(node -p "require('./${PACKAGE}').version")
IFS='.' read -r major minor patch <<< "$currentVersion"

# If manual version provided, use it
if [ -n "$MANUAL_VERSION" ]; then
  newVersion="$MANUAL_VERSION"
  echo "Current version: $currentVersion"
  echo "Using manual version: $newVersion"
else
  # Get commits to analyze (current branch vs main)
  get_commit_messages() {
    for branch in "main" "master"; do
      if git log "${branch}..HEAD" --no-merges --format="%s" 2>/dev/null; then
        return
      fi
    done
  }

  # Analyze commits to determine version bump
  analyze_commits() {
    local hasBreaking=false hasFeat=false hasFix=false
    
    while IFS= read -r commit; do
      if [[ "$commit" == *"BREAKING CHANGE"* ]] || [[ "$commit" == *"!:"* ]]; then
        hasBreaking=true
      fi
      if [[ "$commit" == feat* ]]; then
        hasFeat=true
      fi
      if [[ "$commit" == fix* ]] || [[ "$commit" == perf* ]]; then
        hasFix=true
      fi
    done
    
    if [ "$hasBreaking" = true ]; then
      echo "major"
    elif [ "$hasFeat" = true ]; then
      echo "minor"
    else
      echo "patch"
    fi
  }

  # Determine version bump
  commits=$(get_commit_messages)
  suggestedBump=$(echo "$commits" | analyze_commits)

  echo "Current version: $currentVersion"

  if [ "$suggestedBump" = "major" ]; then
    newVersion="$((major + 1)).0.0"
  elif [ "$suggestedBump" = "minor" ]; then
    newVersion="${major}.$((minor + 1)).0"
  else
    newVersion="${major}.${minor}.$((patch + 1))"
  fi

  echo ""
  echo "Analyzing commits in branch..."
  if [ -n "$commits" ]; then
    echo "$commits" | while IFS= read -r line; do
      echo "  - $line"
    done
  else
    echo "  (no commits found or unable to compare with main/master)"
  fi

  echo ""
  echo "Suggested version bump: $suggestedBump"
  echo "New version would be: $newVersion"
  echo ""
  read -p "Proceed with this version? (y/N): " confirm

  if [ "${confirm,,}" != "y" ]; then
    echo "Cancelled"
    exit 0
  fi
fi

# Update package.json
node -e "const pkg = require('./${PACKAGE}'); pkg.version = '${newVersion}'; require('fs').writeFileSync('${PACKAGE}', JSON.stringify(pkg, null, 2) + '\n')"
echo "Updating ${PACKAGE} to ${newVersion}..."

# Read CHANGELOG.md
changelog=$(cat "$CHANGELOG")

# Get today's date in YYYY-MM-DD format
today=$(date +%Y-%m-%d)

# Find [Unreleased] section and extract content
unreleasedContent=$(node -e "
const fs = require('fs');
let content = fs.readFileSync('${CHANGELOG}', 'utf-8');
const unreleasedRegex = /(## \[Unreleased\]\n\n)([\s\S]*?)(?=\n## \[|$)/i;
const match = content.match(unreleasedRegex);
if (match) {
  const content = match[2].trim();
  if (!content) {
    console.error('[Unreleased] section is empty');
    process.exit(1);
  }
  console.log(content);
}
")

if [ -z "$unreleasedContent" ]; then
  echo "Error: [Unreleased] section is empty. Nothing to release."
  exit 1
fi

# Update CHANGELOG using Node.js for reliability
node -e "
const fs = require('fs');
let content = fs.readFileSync('${CHANGELOG}', 'utf-8');
const unreleasedRegex = /(## \[Unreleased\]\n\n)([\s\S]*?)(?=\n## \[|$)/i;
const match = content.match(unreleasedRegex);
if (match) {
  const unreleasedContent = match[2].trim();
  if (!unreleasedContent) {
    console.error('[Unreleased] section is empty');
    process.exit(1);
  }
  const today = new Date().toISOString().split('T')[0];
  const newVersionSection = \`\\\n## [${newVersion}] - \${today}\\\n\\\n\${unreleasedContent}\\\n\`;
  content = content.replace(unreleasedRegex, '## [Unreleased]\n\n');
  const unreleasedIndex = content.indexOf('## [Unreleased]');
  const insertIndex = content.indexOf('\n\n', unreleasedIndex) + 2;
  content = content.slice(0, insertIndex) + newVersionSection + content.slice(insertIndex);
  
  // Update comparison links
  content = content.replace(/(\[unreleased\]: .*?compare\/v.*?...HEAD)/i, '[unreleased]: https://github.com/deinsoftware/swpm/compare/v${newVersion}...HEAD');
  const newLink = '[${newVersion}]: https://github.com/deinsoftware/swpm/compare/v${currentVersion}...v${newVersion}\n';
  content = content.replace(/\[unreleased\]:/i, newLink + '[unreleased]:');
  
  fs.writeFileSync('${CHANGELOG}', content);
  console.log('Moving [Unreleased] entries to [${newVersion}] - ' + today + '...');
  console.log('Updating comparison links...');
}
"

# Extract the new version section for display
versionContent=$(node -e "
const fs = require('fs');
let content = fs.readFileSync('${CHANGELOG}', 'utf-8');
const versionSectionRegex = new RegExp(\`## \\[${newVersion}\\\\] - .*?\\\\n\\\\n([\\\\s\\\\S]*?)(?=\\\\n## \\\\[|\\\\n\\\\[)\`, 'i');
const match = content.match(versionSectionRegex);
if (match) {
  console.log(match[1].trim());
}
")

echo ""
echo "=== COPY BELOW FOR COMMIT ==="
echo "Tag: v${newVersion}"
echo ""
echo "--- CHANGELOG CONTENT FOR v${newVersion} ---"
echo "$versionContent"
echo "--- END ---"
echo ""
echo "Next steps:"
echo "  1. Review CHANGELOG.md"
echo "  2. Copy the tag and content above"
echo "  3. Commit: git add . && git commit -m \"Release v${newVersion}\""
echo "  4. Create tag manually: git tag v${newVersion}"
echo "  5. Push tag: git push origin v${newVersion}"
echo ""
echo "(You manage tagging manually to control the publish hook)"
