'use strict';

/**
 *  planet controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::planet.planet');
