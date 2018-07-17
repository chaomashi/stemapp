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

/*global define*/
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-style',
  'dojo/on',
  'dojo/dom-attr',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./EditOutputCoordinate.html',
  'dijit/form/Select',
  'jimu/dijit/CheckBox'
], function (
  dojoDeclare,
  dojoLang,
  dojoDomStyle,
  dojoOn,
  dojoDomAttr,
  dijitWidgetBase,
  dijitTemplatedMixin,
  dijitWidgetsInTemplate,
  edittemplate
) {
  'use strict';
  return dojoDeclare([dijitWidgetBase, dijitTemplatedMixin, dijitWidgetsInTemplate], {
    templateString: edittemplate,
    isCanceled: false,
    formats: {},

    setCt: function (v) {
      this.ct = v;
      dojoDomAttr.set(this.frmtSelect, 'value', this.ct);
    },

    /**
     *
     **/
    postCreate: function () {
      this.formats = {
        DD: {
          defaultFormat: 'YN XE',
          customFormat: null,
          useCustom: false
        },
        DDM: {
          defaultFormat: 'A° B\'N X° Y\'E',
          customFormat: null,
          useCustom: false
        },
        DMS: {
          defaultFormat: 'A° B\' C\"N X° Y\' Z\"E',
          customFormat: null,
          useCustom: false
        },
        GARS: {
          defaultFormat: 'XYQK',
          customFormat: null,
          useCustom: false
        },
        GEOREF: {
          defaultFormat: 'ABCDXY',
          customFormat: null,
          useCustom: false
        },
        MGRS: {
          defaultFormat: 'ZSXY',
          customFormat: null,
          useCustom: false
        },
        USNG: {
          defaultFormat: 'ZSXY',
          customFormat: null,
          useCustom: false
        },
        UTM: {
          defaultFormat: 'ZB X Y',
          customFormat: null,
          useCustom: false
        },
        'UTM (H)': {
          defaultFormat: 'ZH X Y',
          customFormat: null,
          useCustom: false
        }
      };

      dojoDomAttr.set(this.frmtVal, 'value', this.formats[this.ct].defaultFormat);

      this.own(
        dojoOn(this.frmtSelect, 'change',
          dojoLang.hitch(this, this.frmtSelectValueDidChange)
      ));

      this.own(dojoOn(
        this.frmtVal,
        'change',
        dojoLang.hitch(this, this.formatValDidChange)
      ));

      this.own(
        dojoOn(this.cancelButton,
          'click',
          dojoLang.hitch(this, function () {
            this.isCanceled = true;
          })
      ));

      this.own(
        dojoOn(this.applyButton,
          'click',
          dojoLang.hitch(this, function () {
            this.isCanceled = false;
          })
      ));

      this.displayPrefixContainer();
    },

    /**
     *
     **/
    formatValDidChange: function () {
      var newvalue = dojoDomAttr.get(this.frmtVal, 'value');
      var crdType = this.frmtSelect.options[this.frmtSelect.selectedIndex].value;
      this.formats[crdType].customFormat = newvalue;
      this.formats[crdType].useCustom = true;
    },

    /**
     *
     **/
    frmtSelectValueDidChange: function () {
      var curval = this.frmtSelect.options[this.frmtSelect.selectedIndex].value;
      var selval = this.formats[curval].useCustom ? this.formats[curval].customFormat
        : this.formats[curval].defaultFormat;
      this.ct = curval;
      dojoDomAttr.set(this.frmtVal, 'value', selval);
      this.displayPrefixContainer();
    },

    /**
     *
     **/
    displayPrefixContainer: function () {
      switch (this.ct) {
        case 'DD':
        case 'DDM':
        case 'DMS':
          dojoDomStyle.set(this.prefixContainer, { display: '' });
          break;
        default:
          dojoDomStyle.set(this.prefixContainer, { display: 'none' });
          break;
      }
    }

  });
});
