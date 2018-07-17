define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dojo/Evented',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./MultipleIndicators.html',
    'dojo/on',
    'dojo/query',
    'dojo/mouse',
    'dojo/_base/html',
    'dojo/_base/lang',
    './SingleIndicator',
    "dijit/form/Select",
    "jimu/dijit/CheckBox"
  ],
  function(declare, _WidgetBase, Evented, _TemplatedMixin, _WidgetsInTemplateMixin, template,
    on, query, mouse, html, lang, SingleIndicator) {
    var enterEvent = mouse.enter,
      leaveEvent = mouse.leave;
    var Sortable = window.Sortable;
    return declare([_WidgetBase, Evented, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'infographic-setting-multiple-indicators',
      templateString: template,
      nls: null,
      //config:
      // type:"",//gauge,number
      // indicators:[indicator.config]

      constructor: function() {
        this.inherited(arguments);
        this.indicators = [];
      },

      postCreate: function() {
        this.inherited(arguments);

        this._initEvent();
        this.setConfig(this.config);
      },

      startup: function() {
        this.inherited(arguments);

        this.sortableIndicatorNode = Sortable.create(this.indicatorDiv, {
          handle: ".drag-masker",
          filter: ".disable-drag .unvaild", //itme can't drag, with this class
          sort: true,
          disabled: false,
          //delay: 10,
          animation: 100,
          onSort: lang.hitch(this, function() {
            this._onSorted();
          })
        });

        this.setConfig(this.config);
      },

      _initEvent: function() {
        this.own(on(this.topIcon, 'click', lang.hitch(this, this._onAddIndicatorClicked)));
        this.own(on(this.topBlock, 'click', lang.hitch(this, this._onAddIndicatorClicked)));
        this.own(on(this.topText, 'click', lang.hitch(this, this._onAddIndicatorClicked)));
        this._handleAddIdicatorHoverColor();
      },

      _handleAddIdicatorHoverColor: function() {
        this.own(on(this.topIcon, enterEvent, lang.hitch(this, function() {
          html.addClass(this.topIcon, 'active');
          html.addClass(this.topText, 'active');
        })));
        this.own(on(this.topBlock, enterEvent, lang.hitch(this, function() {
          html.addClass(this.topIcon, 'active');
          html.addClass(this.topText, 'active');
        })));
        this.own(on(this.topText, enterEvent, lang.hitch(this, function() {
          html.addClass(this.topIcon, 'active');
          html.addClass(this.topText, 'active');
        })));
        this.own(on(this.topIcon, leaveEvent, lang.hitch(this, function() {
          html.removeClass(this.topIcon, 'active');
          html.removeClass(this.topText, 'active');
        })));
        this.own(on(this.topBlock, leaveEvent, lang.hitch(this, function() {
          html.removeClass(this.topIcon, 'active');
          html.removeClass(this.topText, 'active');
        })));
        this.own(on(this.topText, leaveEvent, lang.hitch(this, function() {
          html.removeClass(this.topIcon, 'active');
          html.removeClass(this.topText, 'active');
        })));
      },

      setConfig: function(config) {
        this.config = config;
        if (!this.config) {
          return;
        }
        this._setIndicators();
      },

      _getIndicatorIDs: function() {
        var indicatorNodes = query('.infographic-setting-single-indicator', this.indicatorDiv);
        return indicatorNodes.map(function(node) {
          return html.getAttr(node, 'data-id');
        });
      },

      getConfig: function(check) {
        var indicators = [];
        this.indicators.forEach(lang.hitch(this, function(indecator) {
          if (indecator) {
            var config = indecator.getConfig();
            if (config) {
              indicators.push(config);
            }
          }
        }));
        if (check) {
          if (this.indicators.length !== indicators.length) {
            return false;
          }
        }
        return indicators;
      },

      _setIndicators: function() {
        var indicators = this.config.indicators;
        if (indicators) {
          indicators.forEach(lang.hitch(this, function(indicatorConfig) {
            this._createIndicator(indicatorConfig);
          }));
        }
        this._updateIndicatorBottomLineDisplay();
      },

      _reSortIndicatorArray: function() {
        var IDs = this._getIndicatorIDs();
        var indicators = [];
        IDs.forEach(function(id) {
          this.indicators.some(function(indicator) {
            if (indicator.uniqueID === id) {
              indicators.push(indicator);
              return true;
            }
            return false;
          });
        }.bind(this));
        this.indicators = null;
        this.indicators = indicators;
      },

      _onSorted: function() {
        this._reSortIndicatorArray();
        this._updateIndicatorBottomLineDisplay();
        this._onUpdate();
      },

      _onUpdate: function() {
        this.emit('change');
      },

      _updateIndicatorBottomLineDisplay: function() {
        if (!this.indicators || !this.indicators.length) {
          return;
        }
        var indicatorNum = this.indicators.length - 1;
        this.indicators.forEach(lang.hitch(this, function(indicator, index) {
          if (indicator) {
            indicator.updateBottomLineDisplay(index, indicatorNum);
          }
        }));
      },

      _onAddIndicatorClicked: function(event) {
        event.stopPropagation();
        this._createIndicator();
      },

      _createIndicator: function(indicatorConfig) {
        var config = {
          type: this.type,
          nls: this.nls,
          folderUrl: this.folderUrl
        };

        if (indicatorConfig) {
          config.config = indicatorConfig;
        }
        var indicator = new SingleIndicator(config);
        indicator.placeAt(this.indicatorDiv);
        indicator.startup();

        this.own(on(indicator, 'remove', lang.hitch(this, function(uniqueID) {
          this.indicators = this.indicators.filter(function(e) {
            return e.uniqueID !== uniqueID;
          });
          indicator.destroy();
          indicator = null;
          this._updateIndicatorBottomLineDisplay();
        })));
        this.own(on(indicator, 'change', lang.hitch(this, function() {
          this._onUpdate();
        })));
        this.indicators.push(indicator);

        this._updateIndicatorBottomLineDisplay();
      },

      destroy: function() {
        if (this.indicators) {
          this.indicators.forEach(lang.hitch(this, function(indicator) {
            if (indicator) {
              indicator.destroy();
              indicator = null;
            }
          }));
        }
        this.inherited(arguments);
      }
    });
  });