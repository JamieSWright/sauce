const common = 'features/**/*.feature --require-module ts-node/register --require features/step-definitions/**/*.ts';
const cucumberReport = `${common} --format progress-bar --format html:test-results/cucumber-report.html --format json:test-results/cucumber-report.json --format summary --format-options '{"snippetInterface":"async-await"}' --publish-quiet --parallel 1`;

module.exports = {
  default: cucumberReport,
  report: cucumberReport,
  headless: `${common} --format progress-bar --format json:test-results/cucumber-report.json --parallel 2 --publish-quiet`,
  login: `features/login.feature --require-module ts-node/register --require features/step-definitions/**/*.ts --format progress-bar --publish-quiet`,
  api: `features/api.feature --tags @api --require-module ts-node/register --require features/step-definitions/**/*.ts --format progress-bar --format html:test-results/cucumber-api-report.html --format json:test-results/cucumber-api-report.json --format summary --publish-quiet`
};
