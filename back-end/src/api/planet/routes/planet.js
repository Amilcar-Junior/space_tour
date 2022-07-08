'use strict';

/**
 * planet router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::planet.planet');
