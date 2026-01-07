module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'summary'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    parallel: 1
  },
  
  // Headless profile for CI/CD
  headless: {
    paths: ['features/**/*.feature'],
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'json:test-results/cucumber-report.json'],
    parallel: 2,
    publishQuiet: true
  },
  
  // Specific feature profiles
  login: {
    paths: ['features/login.feature'],
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar']
  }
};
