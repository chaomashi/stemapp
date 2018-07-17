/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//====================================================================================================================//
define([
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/dom-style',
  'dijit/form/CheckBox',
  'dijit/form/NumberTextBox',
  'dijit/form/Select',
  'dijit/form/TextBox',
  '../generalUtils',
  './SettingSimpleTable'
], function (
  array,
  domClass,
  domConstruct,
  domStyle,
  CheckBox,
  NumberTextBox,
  Select,
  TextBox,
  generalUtils,
  SimpleTable
) {
  var mo = {};
  /*------------------------------------------------------------------------------------------------------------------*/

  /**
   * Creates a container div with class(es) `classes` containing
   * `contents` divs each separated using the margin in
   * `gapClass`.
   * @param {string?} classes One or more classes to apply to
   *        created div
   * @param {string?} gapClass Class to be applied to each
   *        contained item but the last to provide trailing
   *        spacing; gaps for horizontal contents should define
   *        ltr/rtl gap class pairs
   * @param {array?} contents Divs to be added to the container
   * @return {object} The created div
   */
  mo.container = function (classes, gapClass, contents) {
    var lastIndex, div = mo._createDiv(classes || '');
    if (Array.isArray(contents) && contents.length > 0) {
      lastIndex = contents.length - 1;
      array.forEach(contents, function(subcomponent, i) {
        domConstruct.place(subcomponent, div);
        if (i < lastIndex && gapClass) {
          domClass.add(subcomponent, gapClass);
        }
      });
    }
    return div;
  };

  /**
   * Creates a fieldset container div with class(es) `classes`
   * containing `contents` divs each separated using the margin in
   * `gapClass`.
   * @param {string?} groupLabel Label to show in fieldset's
   *        border
   * @param {string?} groupClasses One or more classes to apply to
   *        created div
   * @param {string?} classes One or more classes to apply to the
   *        div inside the fieldset
   * @param {string?} gapClass Class to be applied to each
   *        contained item but the last to provide trailing
   *        spacing; gaps for horizontal contents should define
   *        ltr/rtl gap class pairs
   * @param {array?} contents Divs to be added to the container
   * @return {object} The created div
   */
  mo.fieldsetContainer = function (groupLabel, groupClasses, classes, gapClass, contents) {
    var fieldset, lastIndex, div = mo._createDiv(groupClasses || ''), innerContainer;

    fieldset = domConstruct.create('fieldset', {
      'class': 'fieldset'
    }, div);

    if (groupLabel) {
      domConstruct.create('legend', {
        'class': 'fieldsetLegend',
        innerHTML: groupLabel
      }, fieldset);
    }

    innerContainer = mo._createDiv(('fieldsetMainContainer ' + (classes || '')).trim(), fieldset);
    if (Array.isArray(contents) && contents.length > 0) {
      lastIndex = contents.length - 1;
      array.forEach(contents, function(subcomponent, i) {
        domConstruct.place(subcomponent, innerContainer);
        if (i < lastIndex && gapClass) {
          domClass.add(subcomponent, gapClass);
        }
      });
    }

    return div;
  };

  /**
   * Creates a WAB "Add..." dropdown div.
   * @param {string} classes One or more classes to apply to created div
   * @param {string} label Text to show in button
   * @param {array} menuItemLabels List of strings for dropdown
   *        menu items
   * @return {object} The created div
   */
  mo.addTextButtonDropdownCtl = function (classes, label, menuItemLabels) {
    var div, control, addButton, addButtonLabel, dropdownMenu;
    div = mo._createDiv(('addTextButton-button ' + (classes || '')).trim());

    addButton = mo._createDiv('button', div);
    addButtonLabel = mo._createSpan('button-text', addButton);
    addButtonLabel.innerHTML = label;

    control = dropdownMenu = domConstruct.create('ul', {
      'class': 'addTextButton-menu'
    }, div);

    array.forEach(menuItemLabels, function (menuItemLabel) {
      domConstruct.create('li', {
        'class': 'addTextButton-item',
        innerHTML: menuItemLabel
      }, dropdownMenu);
    });

    return {
      'div': div,
      'ctl': control
    };
  };

  /**
   * Creates a checkbox div.
   * @param {string} classes One or more classes to apply to created div
   * @param {boolean} initiallyChecked Indicates if the checkbox
   *        should be checked when created; default is false
   * @return {object} The created div
   */
  mo.checkboxCtl = function (classes, initiallyChecked) {
    var div, control;
    div = mo._createDiv(classes);
    control = new CheckBox({
      style: 'margin-top: 3px;',
      checked: initiallyChecked
    });
    domConstruct.place(control.domNode, div);
    control.startup();
    return {
      'div': div,
      'ctl': control
    };
  };

  /**
   * Creates a div containing a Select dropdown.
   * @param {string} divClasses One or more classes to apply to
   *        created div
   * @param {string} dropdownClasses One or more classes to apply
   *        to created dropdown dijit
   * @param {array} options List of objects containing `label` and
   *        'value'--one for each option in the dropdown; see example below
   * @return {object} The created div and dropdown control
   * @example
   *   'options': [
   *     {label: "Feet", value: "Feet"},
   *     {label: "Yards", value: "Yards"},
   *     {label: "Meters", value: "Meters", selected: true},
   *     {label: "Kilometers", value: "Kilometers"},
   *     {label: "Miles", value: "Miles"}
   *   ]
   */
  mo.dropdownCtl = function (divClasses, dropdownClasses, options) {
    var div = mo._createDiv(divClasses);
    return {
      'div': div,
      'ctl': mo.dropdown(div, dropdownClasses, options)
    };
  };

  /**
   * Creates a div containing a Select dropdown.
   * @param {string} divClasses One or more classes to apply to
   *        created div
   * @param {string} dropdownClasses One or more classes to apply
   *        to created dropdown dijit
   * @param {array} options List of objects containing `label` and
   *        `value`--one for each option in the dropdown
   * @return {object} The created div
   * @example `options`:
   * [
   *   {label: "Feet", value: "Feet"},
   *   {label: "Yards", value: "Yards"},
   *   {label: "Meters", value: "Meters", selected: true},
   *   {label: "Kilometers", value: "Kilometers"},
   *   {label: "Miles", value: "Miles"}
   * ]
   */
  mo.dropdown = function (div, dropdownClasses, options) {
    var control;
    control = new Select({
      options: options,
      'class': dropdownClasses
    });
    domConstruct.place(control.domNode, div);
    control.startup();
    return control;
  };

  /**
   * Creates a div button.
   * @param {string} classes One or more classes to apply to created div
   * @param {string} tooltip Button's tooltip
   * @return {object} The created div
   */
  mo.iconButton = function (classes, tooltip) {
    var div = mo._createDiv(classes);
    domStyle.set(div, 'display', 'inline-block');
    div.title = tooltip;
    return div;
  };

  /**
   * Creates a div containing a numeric text input box.
   * @param {string} classes One or more classes to apply to created div
   * @param {string} placeholder Hint to show in input box
   * @param {object?} constraints Dojo NumberTextBox constraints item,
   *        e.g., {min: -20000, max: 20000, places: 2}
   * @return {object} The created div
   */
  mo.numberInputCtl = function (classes, placeholder, constraints) {
    var div, options, control;
    div = mo._createDiv(classes);
    options = {
      style: 'width: 100%;',
      required: true,
      placeHolder: placeholder
    };
    if (constraints) {
      options.constraints = constraints;
    }
    control = new NumberTextBox(options);
    control.startup();
    domConstruct.place(control.domNode, div);
    return {
      'div': div,
      'ctl': control
    };
  };

  /**
   * Creates a div containing a WAB SimpleTable.
   * @param {string} classes One or more classes to apply to created div
   * @param {object} definition Defines table general parameters
   *        and the field information for each column; the field
   *        type 'actions' is a special column for re-ordering
   *        table rows
   * @param {array?} initialValues Array of rows; each row has
   *        tags corresponding to the names of the fields in the
   *        definition
   * @return {object} The created div
   * @example `definition`:
   * {
   *   autoHeight: true,
   *   selectable: false,
   *   fields: [{
   *     name: 'name',
   *     title: 'Name',
   *     width: 'auto',
   *     type: 'text',
   *     editable: false
   *   }, {
   *     name: 'actions',
   *     title: '',
   *     width: '70px',
   *     type: 'actions',
   *     actions: ['up', 'down', 'delete']
   *   }
   * }
   */
  mo.tableCtl = function (classes, definition, initialValues) {
    var div, control;
    div = mo._createDiv(classes);
    control = new SimpleTable(definition);
    control.placeAt(div);
    control.startup();

    if (Array.isArray(initialValues) && initialValues.length > 0) {
      control.addRows(initialValues);
    }

    return {
      'div': div,
      'ctl': control
    };
  };

  /**
   * Creates a div with text.
   * @param {string?} classes One or more classes to apply to
   *        created div
   * @param {string?} contents Text to put into div
   * @return {object} The created div
   */
  mo.text = function (classes, contents) {
    var div = mo._createDiv(classes || '');
    div.innerHTML = generalUtils.sanitizeNoTags(contents || '');
    return div;
  };

  /**
   * Creates a text button.
   * @param {string?} classes One or more classes to apply to
   *        created div
   * @param {string} label Text to put into button
   * @param {string?} tooltip Button's tooltip
   * @return {object} The created div
   */
  mo.textButton = function (classes, label, tooltip) {
    var div = mo._createDiv(('jimu-btn ' + (classes || '')).trim());
    div.innerHTML = label;
    if (tooltip) {
      div.title = tooltip;
    }
    return div;
  };

  /**
   * Creates a div containing a text input box.
   * @param {string?} classes One or more classes to apply to
   *        created div
   * @param {string?} placeholder Hint to show in input box
   * @return {object} The created div
   */
  mo.textInputCtl = function (classes, placeholder) {
    var div, props, control;
    div = mo._createDiv(classes || '');
    props = {
      style: 'width:100%;'
    };
    if (placeholder) {
      props.placeholder = placeholder;
    }
    control = new TextBox(props);
    control.startup();
    domConstruct.place(control.domNode, div);
    return {
      'div': div,
      'ctl': control
    };
  };

  /*------------------------------------------------------------------------------------------------------------------*/

  /**
   * Creates a span.
   * @param {string?} classes Class(es) to apply to span
   * @param {object?} parent Div to contain created span
   * @return {object} The created span
   */
  mo._createSpan = function (classes, parent) {
    return mo._createSpanDiv(true, classes, parent);
  };

  /**
   * Creates a div.
   * @param {string?} classes Class(es) to apply to div
   * @param {object?} parent Div to contain created div
   * @return {object} The created div
   */
  mo._createDiv = function (classes, parent) {
    return mo._createSpanDiv(false, classes, parent);
  };

  /**
   * Creates a span or a div.
   * @param {boolean} createSpan Choice of span (true) or div
   *        (false)
   * @param {string?} classes Class(es) to apply to div
   * @param {object?} parent Div to contain created div
   * @return {object} The created item
   */
  mo._createSpanDiv = function (createSpan, classes, parent) {
    var props = {}, item;
    if (classes) {
      props["class"] = classes;
    }
    item = domConstruct.create((createSpan ? 'span' : 'div'), props);
    if (parent) {
      domConstruct.place(item, parent);
    }
    return item;
  };

  /*------------------------------------------------------------------------------------------------------------------*/
  return mo;
});
