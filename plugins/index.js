/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');
// promisified fs module
const fs = require('fs-extra');
const path = require('path');

// Function to read the configuration file
function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);
  
  // Check if file exists before trying to read it
  if (!fs.existsSync(pathToConfigFile)) {
    console.error(`Configuration file ${file}.json not found!`);
    return {};
  }

  return fs.readJson(pathToConfigFile).catch(err => {
    console.error(`Error reading the configuration file: ${err}`);
    return {};
  });
}

module.exports = (on, config) => {
  // Before the browser launches, prepare audit
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  // Define custom tasks for lighthouse and pa11y
  on('task', {
    lighthouse: lighthouse(),
    pa11y: pa11y(),
  });

  // Get the configuration file to use (defaults to 'development')
  const file = config.env.configFile || 'development';

  // Return the configuration from the selected file
  return getConfigurationByFile(file);
};
