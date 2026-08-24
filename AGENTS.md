# Repository workflow

- After every user-requested page adjustment, run the relevant build and tests, then commit and push the verified change to `origin/main`.
- Never add source video files (`.mp4`, `.mov`, `.m4v`, `.webm`, `.avi`) to Git.
- Do not commit generated standalone HTML files from `outputs/`, because they embed local video data.
- Keep images, posters, source code, styles, and tests versioned.
