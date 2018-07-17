define([
    'dojo/_base/lang',
    '../utils'
  ],
  function(lang, utils) {
    var mo = {
      stringFieldType: 'esriFieldTypeString',
      oidFieldType: 'esriFieldTypeOID',
      dateFieldType: 'esriFieldTypeDate',
      numberFieldTypes: [
        'esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ],
      geometryFieldType: 'esriFieldTypeGeometry',

      getFieldInfo: function(fieldName, definition) {
        var fieldInfo = null;
        var fieldInfos = definition.fields;
        for (var i = 0; i < fieldInfos.length; i++) {
          if (fieldInfos[i].name === fieldName) {
            fieldInfo = fieldInfos[i];
          }
        }
        return fieldInfo;
      },

      isGeometryType: function(fieldName, definition) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        if (fieldInfo) {
          return fieldInfo.type === mo.geometryFieldType;
        }
        return false;
      },

      isStringType: function(fieldName, definition) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        if (fieldInfo) {
          return fieldInfo.type === mo.stringFieldType;
        }
        return false;
      },

      isNumberType: function(fieldName, definition, containOID) {
        var numberFieldTypes = lang.clone(mo.numberFieldTypes);
        if (containOID) {
          numberFieldTypes.push(mo.oidFieldType);
        }
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        if (fieldInfo) {
          return numberFieldTypes.indexOf(fieldInfo.type) > -1;
        }
        return false;
      },

      isSubtypeField: function(fieldName, definition) {
        return definition && definition.typeIdField === fieldName;
      },

      isContainSubtypeField: function(fieldName, definition) {
        if (mo.isSubtypeField(fieldName, definition)) {
          return definition.types && definition.types.length;
        }
        return false;
      },

      isCodedValueField: function(fieldName, definition) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        return fieldInfo && fieldInfo.domain && fieldInfo.domain.type === 'codedValue';
      },

      isContainCodedValuesField: function(fieldName, definition) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        if (mo.isCodedValueField(fieldName, definition)) {
          return fieldInfo.domain.codedValues && fieldInfo.domain.codedValues.length > 0;
        }
        return false;
      },

      isDateField: function(fieldName, definition) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        if (fieldInfo) {
          return fieldInfo.type === mo.dateFieldType;
        }
        return false;
      },

      getNotGeometryFields: function(fields) {
        if (fields && fields.length) {
          return fields.filter(function(field) {
            return field.type !== mo.geometryFieldType;
          });
        }
      },

      getFieldAlias: function(fieldName, definition, popupInfo) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        var alias = this.getFieldAliasByFieldInfo(fieldInfo, popupInfo);
        return alias;
      },

      getFieldAliasByFieldInfo: function(fieldInfo, popupInfo) {
        var alias = '';
        if (!fieldInfo) {
          return alias;
        }
        var name = fieldInfo.name;
        alias = fieldInfo.alias || name;
        if (popupInfo) {
          alias = this.getAliasFromPopupInfo(name, popupInfo);
        }
        return alias;
      },

      getAliasFromPopupInfo: function(fieldName, popupInfo) {
        var alias = fieldName;
        if (!popupInfo) {
          return alias;
        }
        var fieldInfos = popupInfo.fieldInfos;
        if (fieldInfos && fieldInfos.length > 0) {
          fieldInfos.forEach(function(item) {
            if (item.fieldName === fieldName) {
              alias = item.label;
            }
          });
        }
        return alias;
      },

      getFieldInfosByFieldName: function(fieldNames, definition) {
        return fieldNames.map(function(fieldName) {
          var field = mo.getFieldInfo(fieldName, definition);
          return lang.clone(field);
        }.bind(this));
      },

      getDominOrSubTypeDisplayValue: function(fieldName, attributes, layerDefinition) {
        var fieldValue = attributes[fieldName];
        var displayValue = fieldValue;

        var domin = this.getDomain(fieldName, attributes, layerDefinition);
        if (domin && domin.codedValues && domin.codedValues.length) {
          domin.codedValues.some(function(item) {
            if (item.code === fieldValue) {
              displayValue = item.name;
              return true;
            } else {
              return false;
            }
          });
        }
        return displayValue;
      },

      getDomain: function(fieldName, attributes, layerDefinition) {
        var typeId;
        var typeIdField = layerDefinition.typeIdField;
        if (attributes.hasOwnProperty(typeIdField)) {
          typeId = attributes[typeIdField];
        }
        var domain, stop;

        // Look for domain defined by sub-type if typeId is given.
        if (typeof typeId !== 'undefined') {
          var types = layerDefinition.types;
          if (types && types.length) {
            types.some(function(typeInfo) {
              if (typeInfo.id === typeId) {
                domain = typeInfo.domains && typeInfo.domains[fieldName];

                if (domain && domain.type === "inherited") {
                  // let's check if the field has a domain defined
                  // in the layer's fields list.
                  domain = this.getDomainByLayerDefinition(fieldName);

                  stop = true; // indicates that layer.fields has been searched.
                }
                return true;
              }
              return false;
            }, this);
          }

        }

        if (!stop && !domain) {
          domain = this.getDomainByLayerDefinition(fieldName);
        }

        return domain;
      },

      getDomainByLayerDefinition: function(fieldName, definition) {
        var fieldInfo = mo.getFieldInfo(fieldName, definition);
        var domain;
        if (fieldInfo && fieldInfo.domain) {
          domain = fieldInfo.domain;
        }
        return domain;
      },

      updateOptions: function(select, options, value) {
        if (options) {
          options = lang.clone(options);
          select.removeOption(select.getOptions());
          select.addOption(options);
        } else {
          options = [];
        }
        if (!value && options.length > 0) {
          value = options[0].value;
        }
        if (value) {
          select.set('value', value);
        }
      }
    };
    lang.mixin(utils, mo);
    return utils;
  });