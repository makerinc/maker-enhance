# How To Release A New Version

1. Make sure all tests are passing and build is commited `yarn build`
2. Depending upon the changes, decide if it is a major/minor/patch release. [Read more about semantic versioning.](https://semver.org/)
3. `git changelog` to auto generate changelog. Look at CHANGELOG.md and edit the changes + version number.
4. `yarn version --major|minor|patch` to bump version, create a tag and publish.
