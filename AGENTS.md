# Repository workflow

- After every user-requested page adjustment, run the relevant build and tests. Push the same source commit to the `publications-source-20261022` source branch and `publications-20261022` static branch on both GitHub (`mengtingchen/team_page`) and Alibaba (`cmt271286/team_page`); preserve Alibaba `main`. Publish the generated static page through the GitHub static checkout.
- Never add source video files (`.mp4`, `.mov`, `.m4v`, `.webm`, `.avi`) to Git.
- Do not commit generated standalone HTML files from `outputs/`, because they embed local video data.
- Keep images, posters, source code, styles, and tests versioned.
