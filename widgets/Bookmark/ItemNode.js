///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/html',
  //'dojo/_base/array',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/on',
  'dojo/query',
  'jimu/utils',
  'dojo/text!./ItemNode.html',
  'dojo/mouse',
  "dijit/form/ValidationTextBox"
],
  function (Evented, declare, lang, html,// array,
    BaseWidget, _WidgetsInTemplateMixin,
    on, query, utils, template) {

    var In = {};
    In = declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      templateString: template,

      isSelected: false,

      postMixInProperties: function () {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },

      postCreate: function () {
        html.setAttr(this.domNode, "data-id", utils.sanitizeHTML(this.dataId));
        if (this.img) {
          html.setAttr(this.thumbnail, "src", this.img);
        }

        if (this.nls) {
          html.setAttr(this.deleteBtn, "title", this.nls.deleteBtnTip);
          html.setAttr(this.editBtn, "title", this.nls.editBtnTip);
          html.setAttr(this.changeImgBtn, "title", this.nls.changeThumbnailTip);
          html.setAttr(this.renameBtn, "title", this.nls.editBtnTip);
          html.setAttr(this.thumbnail, "title", this.nls.dragReorderTip);
          html.setAttr(this.layerInfosIcon, "title", this.nls.withVisibility);
        }

        //UI
        if (this.display) {
          if (false === this.display.selectedBtn) {
            html.addClass(this.selectedBtn, "hide");
          }
          if (false === this.display.editBtn) {
            html.addClass(this.editBtn, "hide");
          }
          if (false === this.display.deleteBtn) {
            html.addClass(this.deleteBtn, "hide");
          }
          if (false === this.display.renameBtn) {
            html.addClass(this.renameBtn, "hide");
          }
          // if (false === this.display.dragHandler) {
          //   html.addClass(this.dragHandler, "hide");
          // }
          if (true === this.display.selectedBtn) {
            html.removeClass(this.selectedBtn, "hide");
          }
          if (true === this.display.changeImgBtn) {
            html.removeClass(this.changeImgBtn, "hide");
          }
          if(true === this.display.layerInfosIcon){
            html.removeClass(this.layerInfosIcon, "hide");
            html.addClass(this.nodeBox, "with-layer-visibility");
          }
        }

        this.nodeLabel.setValue(this.label);
        //this._LAST_VALUE = utils.sanitizeHTML(this.label);
        this._updateLabelTooltips(this.label);

        this.own(on(this.selectedBtn, 'click', lang.hitch(this, this.onSelected)));
        this.own(on(this.deleteBtn, 'click', lang.hitch(this, this.onDelete)));
        this.own(on(this.editBtn, 'click', lang.hitch(this, this.onEdit)));
        this.own(on(this.changeImgBtn, 'click', lang.hitch(this, this.onChangeImg)));
        this.own(on(this.renameBtn, 'click', lang.hitch(this, this.onRenameClick)));

        this.own(on(this.nodeBox, 'click', lang.hitch(this, this.onNodeBoxClick)));
        this.own(on(this.dragMasker, 'click', lang.hitch(this, this.onNodeBoxClick)));

        if (true === this.display.enableEditLabel) {
          this.own(on(this.nodeLabel, 'click', lang.hitch(this, this.onLabelClick)));
          this.own(on(this.nodeLabel, 'change', lang.hitch(this, this.onLabelChange)));
          this.own(on(this.nodeLabel, 'blur', lang.hitch(this, this.onLabelBlur)));
        } else {
          this.nodeLabel.setDisabled(true);
        }

        //this.own(on(this.domNode, 'click', lang.hitch(this, this.onClick)));

        //for mobile
        this.own(on(this.nodeLabel, 'contextmenu', lang.hitch(this, function (evt) {
          evt.preventDefault();
        })));
        this.own(on(this.nodeBox, 'contextmenu', lang.hitch(this, function (evt) {
          evt.preventDefault();
        })));
      },

      onClick: function () {
        query('.jimu-img-node', this.getParent().domNode).removeClass('jimu-state-selected');
        query(this.domNode).addClass('jimu-state-selected');

        this.emit("click");
      },
      onNodeBoxClick: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }

        this.emit("thumbnail-click");
      },
      onLabelClick: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        this.emit("label-click");
      },
      onLabelChange: function (val) {
        //html.setAttr(this.domNode,"data-id",utils.sanitizeHTML(dataId));
        this._updateLabelTooltips(val);
      },
      onLabelBlur: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        var val = this.nodeLabel.get('value');
        this._updateLabelTooltips(val);
        //console.log("labelBlur val==>" + val);
        //if(utils.sanitizeHTML(this.nodeLabel.get('value')) !== this._LAST_VALUE){
        //  this._LAST_VALUE = utils.sanitizeHTML(this.label);
        this.emit("label-blur");
      },
      onSelected: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }

        if (html.hasClass(this.domNode, 'selected')) {
          html.removeClass(this.domNode, 'selected');
          this.isSelected = false;
          if (false !== evt) {
            this.emit("unselected");
          }
        } else {
          html.addClass(this.domNode, 'selected');
          this.isSelected = true;
          if (false !== evt) {
            this.emit("selected");
          }
        }
      },
      onDelete: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        this.emit("delete");
      },
      onEdit: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        this.emit("edit");
      },
      onChangeImg: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        this.emit("change-img");
      },
      changeImg: function (img) {
        html.setAttr(this.thumbnail, "src", img);
      },
      onRenameClick: function (evt) {
        if (evt && evt.stopPropagation && evt.preventDefault) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        this.emit("rename");
      },

      highLight: function () {
        query('.jimu-img-node', this.getParent().domNode).removeClass('jimu-state-selected');
        query(this.domNode).addClass('jimu-state-selected');
      },

      startup: function () {
        this.inherited(arguments);
      },

      destroy: function () {
        this.inherited(arguments);
        html.destroy(this.domNode);
      },

      _updateLabelTooltips: function (tips) {
        if (!tips) {
          return;
        }
        //var str = utils.sanitizeHTML(tips);
        html.setAttr(this.nodeLabel, 'title', tips);
        if (this.dragMasker) {
          html.setAttr(this.dragMasker, 'title', tips);
        }
      }
    });

    //static method
    In.addFloatLeading = function (bookmark) {
      if (bookmark.itemNode && bookmark.itemNode.domNode) {
        query('.selected-btn', bookmark.itemNode.domNode).forEach(function (node) {
          html.addClass(node, "jimu-float-leading");
        });
        query('.node-box', bookmark.itemNode.domNode).forEach(function (node) {
          html.addClass(node, "jimu-float-leading");
        });
        query('.node-label', bookmark.itemNode.domNode).forEach(function (node) {
          html.addClass(node, "jimu-float-leading");
        });
        query('.close-btn', bookmark.itemNode.domNode).forEach(function (node) {
          html.addClass(node, "jimu-float-leading");
        });
      }
    };
    In.removeFloatLeading = function (bookmark) {
      if (bookmark.itemNode && bookmark.itemNode.domNode) {
        query('.selected-btn', bookmark.itemNode.domNode).forEach(function (node) {
          html.removeClass(node, "jimu-float-leading");
        });
        query('.node-box', bookmark.itemNode.domNode).forEach(function (node) {
          html.removeClass(node, "jimu-float-leading");
        });
        query('.node-label', bookmark.itemNode.domNode).forEach(function (node) {
          html.removeClass(node, "jimu-float-leading");
        });
        query('.close-btn', bookmark.itemNode.domNode).forEach(function (node) {
          html.removeClass(node, "jimu-float-leading");
        });
      }
    };
    In.toggleEditable = function (bookmark) {
      if (bookmark.itemNode && bookmark.itemNode.nodeLabel) {
        var nodeLabel = bookmark.itemNode.nodeLabel;

        if (nodeLabel.disabled) {
          In.enableEditable(bookmark);
        } else {
          In.disableEditable(bookmark);
        }
      }
    };
    In.disableEditable = function (/*bookmark*/) {
      // if (bookmark.itemNode && bookmark.itemNode.nodeLabel) {
      //   var nodeLabel = bookmark.itemNode.nodeLabel;
      //   //nodeLabel.setDisabled(true);
      //   nodeLabel.setAttribute("readOnly", "readOnly")
      // }
    };
    In.enableEditable = function (/*bookmark*/) {
      // if (bookmark.itemNode && bookmark.itemNode.nodeLabel) {
      //   var nodeLabel = bookmark.itemNode.nodeLabel;
      //   //nodeLabel.setDisabled(false);
      //   nodeLabel.setAttribute("readOnly", "")//dijitTextBoxReadOnly
      //   //nodeLabel.readOnly = "";nodeLabel.readOnly = false
      // }
    };
    In.focusLabel = function (bookmark) {
      if (bookmark.itemNode && bookmark.itemNode.nodeLabel) {
        var nodeLabel = bookmark.itemNode.nodeLabel;
        //nodeLabel.focus();
        //delay focus
        //setTimeout(lang.hitch(this, function() {
        nodeLabel.focus();
        //_setInputsClicktoSelect: function(dijit) {
        //  html.setAttr(nodeLabel, "onclick", "this.select()");
        //html.setAttr(nodeLabel, "onmouseup", "return false;");
        //},
        //}), 500);
      }
    };
    In.unSelected = function (bookmark) {
      if (bookmark.itemNode && bookmark.itemNode) {
        var itemNode = bookmark.itemNode;

        html.removeClass(itemNode.domNode, 'selected');
        itemNode.isSelected = false;
      }
    };

    In.show = function (bookmark) {
      if (bookmark && bookmark.itemNode) {
        var itemNode = bookmark.itemNode;

        html.removeClass(itemNode.domNode, 'hide');
        itemNode.isShow = true;
      }
    };
    In.hide = function (bookmark) {
      if (bookmark && bookmark.itemNode) {
        var itemNode = bookmark.itemNode;

        html.addClass(itemNode.domNode, 'hide');
        itemNode.isShow = false;
      }
    };

    return In;
  });