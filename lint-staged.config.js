export default {
  '*.ts': [
    'eslint --fix --quiet -f visualstudio',
    'prettier --write',
    'yarn test --silent --no-coverage --forceExit --ci --bail',
  ],
  '.env': ['git rm'],
  '*.{md,json,yaml,yml}': ['prettier --write'],
  '**/package.json': filenames => [
    ...filenames.map(file => `npmPkgJsonLint ${file}`),
    'prettier-package-json --write',
  ],
  '.codecov.yml': () =>
    'curl -f --silent --data-binary @.codecov.yml https://codecov.io/validate',
};
