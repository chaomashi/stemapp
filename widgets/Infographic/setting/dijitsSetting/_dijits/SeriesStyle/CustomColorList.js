define([
    'dojo/_base/declare',
    './CustomColorItem',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/on',
    'dojo/_base/html',
    'dojo/_base/lang'
  ],
  function(declare, CustomColorItem, Evented,
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, on, html, lang) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-custom-color-list',
      templateString: '<div>' +
        '<div class="costom-color-list-header">' +
        '<div title="${nls.category}">${nls.category}</div>' +
        '<div title="${nls.labelAxis}">${nls.labelAxis}</div>' +
        '<div title="${nls.color}">${nls.color}</div>' +
        '</div>' +
        '<div class="costom-color-list" data-dojo-attach-point="colorList"></div>' +
        '<div class="costom-color-list" data-dojo-attach-point="otherList"></div>' +
        '</div>',

      // config:
      //  categories:[text,label,color],
      //  others:[]
      constructor: function(options) {
        this.inherited(arguments);
        this._colorItems = [];
        this._otherItems = [];
        if (options.nls) {
          this.nls = options.nls;
        }
        this.others = [{
          text: this.nls.nullText,
          label: this.nls.nullText,
          id: 'null',
          color: '#808080'
        }, {
          text: this.nls.others,
          label: this.nls.others,
          id: 'others',
          color: '#808080'
        }];
      },

      setConfig: function(config) {
        if (!config || !config.categories || !Array.isArray(config.categories)) {
          return;
        }
        this.clear();
        var categories = config.categories;
        var others;
        if (!config.others || !config.others.length) {
          others = lang.clone(this.others);
        } else {
          others = config.others;
        }

        this._setCategories(categories);
        this._setOthers(others);
      },

      updateColorItemsColor: function() {
        if (!this._colorItems.length) {
          return;
        }
        this._colorItems.forEach(function(colorItem) {
          colorItem.setColor(this._getRandomColor());
        }.bind(this));
      },

      setCategoryType: function(categoryTypes) {
        this._categoryTypes = categoryTypes;
        if (!this._colorItems.length) {
          return;
        }
        this._colorItems.forEach(function(colorItem) {
          colorItem.setCategoryType(categoryTypes);
        }.bind(this));
      },

      _getRandomColor: function() {
        var color;
        var colorIndex = 0;
        if (this._lastColor) {
          var lastIndex = this._colors.indexOf(this._lastColor);
          if (lastIndex > -1) {
            colorIndex = lastIndex + 1;
            if (colorIndex > this._colors.length - 1) {
              colorIndex = 0;
            }
          }
        }
        color = this._colors[colorIndex];
        this._lastColor = color;
        return color;
      },

      _setCategories: function(categories) {
        categories.forEach(function(cc) {
          this.addNewColorItem(cc);
        }.bind(this));
      },

      _setOthers: function(others) {
        if (!others || !others.length) {
          return;
        }
        others.forEach(function(oc) {
          var hideLabel = false;
          if (oc.id === 'others') {
            hideLabel = true;
          }
          this._addOtherColorItem(oc, hideLabel);
        }.bind(this));
      },

      clear: function() {
        html.empty(this.colorList);
        html.empty(this.otherList);
        this._colorItems = [];
        this._otherItems = [];
      },

      _addOtherColorItem: function(oc, hideLabel) {
        var colorItem = new CustomColorItem({
          nls: this.nls,
          config: oc
        });
        colorItem.placeAt(this.otherList);
        colorItem.startup();
        colorItem.hideDeleteButton();
        if (hideLabel) {
          colorItem.hideLabelPart();
        }
        this._otherItems.push(colorItem);
        this._bindEvent(colorItem);
      },

      getColorSettedCategories: function() {
        var categories = this._colorItems.map(function(colorItem) {
          var cic = colorItem.getConfig();
          if (cic) {
            return cic.id + "";
          }
        });
        return categories.filter(function(cv) {
          return !!cv;
        });
      },

      addNewColorItem: function(cc, highlight) {
        var colorItem = new CustomColorItem({
          nls: this.nls,
          config: cc,
          categoryTypes: this._categoryTypes
        });
        colorItem.placeAt(this.colorList);
        colorItem.startup();
        if (highlight) {
          colorItem.highLight();
        }
        this._colorItems.push(colorItem);
        this._bindEvent(colorItem);
        var categories = this.getColorSettedCategories();
        this.emit('color-list-change', categories);
        setTimeout(function() {
          this._onChange();
        }.bind(this), 50);
      },

      _bindEvent: function(dijit) {
        this.own(on(dijit, 'change', function() {
          this._onChange();
        }.bind(this)));
        this.own(on(dijit, 'delete', function(uniqueID) {
          this._colorItems = this._colorItems.filter(function(colorItem) {
            return colorItem.uniqueID !== uniqueID;
          }.bind(this));
          this._onChange();
          var categories = this.getColorSettedCategories();
          this.emit('color-list-change', categories);
        }.bind(this)));
      },

      getConfig: function() {
        if (!this._colorItems.length && !this._otherItems.length) {
          return false;
        }

        var categories = this._colorItems.map(function(colorItem) {
          return colorItem.getConfig();
        });

        categories = categories.filter(function(sc) {
          return !!sc;
        });

        var others = this._otherItems.map(function(otherItem) {
          return otherItem.getConfig();
        });

        others = others.filter(function(sc) {
          return !!sc;
        });

        return {
          categories: categories,
          others: others
        };
      },

      _onChange: function() {
        var config = this.getConfig();
        if (config) {
          this.emit('change', config);
        }
      }

    });
  });