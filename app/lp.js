'use strict';

var m = require('mithril');
var plusSvg = require('./icons/plus.svg');
var minusSvg = require('./icons/minus.svg');

var Analytics = require('./analytics');

// Representation of a player's life points.
function Lp (spec) {
  spec = spec === undefined ? {} : spec;
  var player = spec.player;
  var operand = spec.operand;

  var lp = {};

  // Add a quantity to a player's life points.
  function gain () {
    Analytics.event('Action', 'Add');
    player.gain(operand.getNumericValue());
    operand.reset();
  }

  // Remove a quantity from a player's life points.
  function lose () {
    Analytics.event('Action', 'Subtract');
    player.lose(operand.getNumericValue());
    operand.reset();
  }

  lp.view = function () {
    var lifePoints = player.getLifePoints();
    return m('.yc-lp', [
      m('.yc-lp-val.yc-lp-len-' + String(lifePoints).length, lifePoints),
      m('.yc-lp-gain.yc-icon-container', {onclick: gain}, m.trust(plusSvg)),
      m('.yc-lp-lose.yc-icon-container', {onclick: lose}, m.trust(minusSvg))
    ]);
  };

  return lp;
}

module.exports = Lp;
