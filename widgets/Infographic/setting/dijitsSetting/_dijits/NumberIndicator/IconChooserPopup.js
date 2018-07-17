define(['dojo/_base/declare',
    'dijit/_WidgetBase',
    'dojo/Evented',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./IconChooserPanel.html',
    'jimu/dijit/ColorPickerPopup',
    'dojo/_base/Color',
    'dijit/TooltipDialog',
    'dijit/popup',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/query',
    'dojo/dom-style'
  ],
  function(declare, _WidgetBase, Evented, _TemplatedMixin, _WidgetsInTemplateMixin,
    template, ColorPickerPopup, Color, TooltipDialog, dojoPopup, html, lang, on, query, domStyle) {
    //Inner class, icon-chooser
    var IconChooserPanel = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-setting-number-icon-chooser-panel',
      templateString: template,
      nls: null,
      // 10 icons class
      icons: ['icon-up-svg', 'icon-down-svg', 'icon-stop-svg', 'icon-star-svg', 'icon-danger-svg',
        'icon-alarm-svg', 'icon-right-svg', 'icon-wrong-svg', 'icon-like-svg', 'icon-unlike-svg'
      ],
      iconInfo: null,
      // color:"#fff",
      // icon:"icon-up",//a icon class of this .icons
      // placement:"left",// replace,right
      postCreate: function() {
        this.inherited(arguments);
        this.DEFAULT_ICON = {
          color: '#49B4CB',
          icon: 'icon-up',
          placement: 'left'
        };
        this.iconInfo = lang.mixin(this.DEFAULT_ICON, this.iconInfo);
        this._init();
        this.setConfig(this.iconInfo);
        this._hasLoaded = true;
      },
      _init: function() {
        this._initIcons();
        this._initColorPicker();
        this._initEvent();
      },
      //create all icons of this.icons
      _initIcons: function() {
        this.icons.forEach(lang.hitch(this, function(icon, index) {
          var domStr = '<div class="iconDiv ' + icon + '"></div>';
          var iconDom = html.toDom(domStr);
          iconDom.icon = icon.replace('-svg', '');
          if (index < 5) {
            html.place(iconDom, this.iconStyle1, 'last');
          } else {
            html.place(iconDom, this.iconStyle2, 'last');
          }

        }));
      },
      getIconColor: function() {
        if (this.iconInfo) {
          return this.iconInfo.color;
        }
      },
      setIconColor: function(color) {
        this.iconColorPicker.setColor(new Color(color));
        this.iconColorPicker.picker.changeColor();
      },
      _onIconInfoChanged: function() {
        if (this._hasLoaded) {
          if (this.iconInfo) {
            var iconInfo = lang.clone(this.iconInfo);
            this.emit("change", iconInfo);
          }
        }
      },
      //create a color picker to change the icon color
      _initColorPicker: function() {
        this.iconColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          }
        });
        this.iconColorPicker.placeAt(this.colorPicker);
        this.iconColorPicker.startup();
        this.own(on(this.iconColorPicker, 'change', lang.hitch(this, function(color) {
          this.iconInfo.color = color.toHex();
          this._onIconInfoChanged();
        })));
      },
      _handleStyleClick: function(event) {
        event.stopPropagation();
        var vaildDom;
        var target = event.srcElement || event.target;
        if (target.icon) {
          vaildDom = target;
        } else if (!!target.parentElement.icon) {
          vaildDom = target.parentElement;
        }
        if (!vaildDom) {
          return;
        }
        this._onIconSelected(vaildDom);
      },
      //bind event of icons and placement
      _initEvent: function() {
        this.own(on(this.iconStyle1, 'click', lang.hitch(this, this._handleStyleClick)));
        this.own(on(this.iconStyle2, 'click', lang.hitch(this, this._handleStyleClick)));
        this.own(on(this.placement, 'click', lang.hitch(this, function(event) {
          event.stopPropagation();

          var target = event.srcElement || event.target;
          if (!html.hasClass(target, 'placeDiv')) {
            return;
          }

          this._onPlacementSelected(target);
        })));
      },
      setConfig: function(iconInfo) {
        if (!iconInfo) {
          return;
        }
        this.iconInfo = iconInfo;
        if (this.iconInfo.color) {
          this.iconColorPicker.setColor(new Color(this.iconInfo.color));
        }
        if (this.iconInfo.icon) {
          var iconDom = query('.styleDiv .' + this.iconInfo.icon + '-svg')[0];
          if (iconDom) {
            this._onIconSelected(iconDom);
          }
        }
        if (this.iconInfo.placement) {
          var placeDom = query('.placement .' + this.iconInfo.placement)[0];
          if (placeDom) {
            this._onPlacementSelected(placeDom);
          }
        }
      },
      getConfig: function() {
        if (!this.iconInfo || !this.iconInfo.icon || !this.iconInfo.placement) {
          return;
        }
        return this.iconInfo;
      },
      _onIconSelected: function(iconDom) {
        query('.styleDiv .iconDiv').removeClass("iconSelected");
        html.addClass(iconDom, 'iconSelected');
        this.iconInfo.icon = iconDom.icon;
        this._onIconInfoChanged();
      },
      _onPlacementSelected: function(placeDom) {
        var placement;
        if (html.hasClass(placeDom, 'left')) {
          placement = "left";
        } else if (html.hasClass(placeDom, 'replace')) {
          placement = "replace";
        } else if (html.hasClass(placeDom, 'right')) {
          placement = "right";
        }
        query('.placement .placeDiv').removeClass("placeSelected");
        html.addClass(placeDom, 'placeSelected');
        this.iconInfo.placement = placement;
        this._onIconInfoChanged();
      }
    });
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-setting-number-icon-chooser-popup',
      templateString: '<div><div class="icon" data-dojo-attach-point="iconPreview"></div>' +
        '<div class="border-merge drop-down-arrow"></div></div>',
      _isTooltipDialogOpened: false,
      folderUrl: '',
      //public method:
      // setConfig
      // getConfig
      // hideTooltipDialog
      postCreate: function() {
        this.inherited(arguments);
        this.DEFAULT_ICON = {
          color: '#49B4CB',
          icon: 'icon-up',
          placement: 'left'
        };
        //Create a tooltipDialog and put icon-chooser in it

        this.config = lang.mixin(this.DEFAULT_ICON, this.config);
        this._createTooltipDialog();
        this.setConfig(this.config);
      },
      setConfig: function(config) {
        this.config = config;
        if (!this.config) {
          return;
        }
        this.iconChooser.setConfig(this.config);
        this._previewIcon(this.config);
      },
      getConfig: function() {
        this.config = this.iconChooser.getConfig();
        return this.config;
      },
      getIconColor: function() {
        return this.iconChooser.getIconColor();
      },
      setIconColor: function(color) {
        this.iconChooser.setIconColor(color);
      },
      _setIconChooserUI: function() {
        this.getConfig();
        if (this.config) {
          this.iconChooser.setConfig(this.config);
        }
      },
      _previewIcon: function(config) {
        html.removeClass(this.iconPreview);
        html.addClass(this.iconPreview, ['iconPreview', 'indicator-icon', config.icon]);
        domStyle.set(this.iconPreview, 'color', config.color);
        this._onUpdate();
      },
      _onUpdate: function() {
        this.emit('change', this.getConfig());
      },
      _createTooltipDialog: function() {
        var ttdContent = html.create("div");
        this.tooltipDialog = new TooltipDialog({
          content: ttdContent
        });
        html.addClass(this.tooltipDialog.domNode,
          'infographic-setting-number-icon-chooser-popup-dialog');

        this.iconChooser = new IconChooserPanel({
          nls: this.nls,
          iconInfo: this.config
        });
        this.iconChooser.placeAt(ttdContent);
        this.iconChooser.startup();
        //init event for click this.domNode
        this.own(on(this.domNode, 'click', lang.hitch(this, function(event) {
          event.stopPropagation();
          event.preventDefault();
          if (this._isTooltipDialogOpened) {
            this._hideTooltipDialog();
          } else {
            this._showTooltipDialog();
          }
        })));
        //init event for close tooltip dialog
        this.own(on(document, 'click', lang.hitch(this, function(event) {
          var target = event.srcElement || event.target;
          if (!this._isPartOfPopup(target)) {
            this._hideTooltipDialog();
          }
        })));
        // init event for icon-chooser
        this._initIconChooserEvent();
      },
      _initIconChooserEvent: function() {
        this.own(on(this.iconChooser, 'change', lang.hitch(this, function(iconInfo) {
          this._previewIcon(iconInfo);
        })));
      },
      hideTooltipDialog: function() {
        this._hideTooltipDialog();
      },
      _showTooltipDialog: function() {
        dojoPopup.open({
          parent: this.getParent(),
          popup: this.tooltipDialog,
          around: this.domNode
        });
        this._isTooltipDialogOpened = true;
        this._setIconChooserUI();
      },
      _hideTooltipDialog: function() {
        dojoPopup.close(this.tooltipDialog);
        this._isTooltipDialogOpened = false;
      },
      destroy: function() {
        if (this.iconChooser) {
          this.iconChooser.destroy();
          this.iconChooser = null;
        }
        if (this.tooltipDialog) {
          this.tooltipDialog.destroy();
          this.tooltipDialog = null;
        }
        this.inherited(arguments);
      },
      _isPartOfPopup: function(target) {
        var a, b, c;
        var node = this.tooltipDialog.domNode;
        a = target === node || html.isDescendant(target, node);

        if (this.iconChooser && this.iconChooser.iconColorPicker) {
          var iconChooserColorPickerDom = this.iconChooser.iconColorPicker.getTooltipDialog().domNode;
          b = target === iconChooserColorPickerDom || html.isDescendant(target, iconChooserColorPickerDom);
        }
        // a known custom close pupup bug
        var topPopup = dojoPopup.getTopPopup();
        if (topPopup && topPopup.wrapper) {
          var nodeInsidePopup = topPopup.wrapper;
          c = target === nodeInsidePopup || html.isDescendant(target, nodeInsidePopup);
        }
        return a || b || c;
      }
    });
  });