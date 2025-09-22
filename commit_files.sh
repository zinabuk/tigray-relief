#!/bin/bash

# Get changed and untracked files (unique)
files=$(git ls-files --modified --others --exclude-standard)

if [ -z "$files" ]; then
  echo "No changed or untracked files detected."
  exit 0
fi

# Use while-read with null delimiter to handle spaces/newlines correctly
echo "$files" | while IFS= read -r file; do
  git add "$file"
  filename=$(basename "$file")
  git commit -m "$filename updated"
done

git push
