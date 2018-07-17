///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define({
  "setBtnLabel": "Ayarla",
  "selectLabel": "Seç",
  "selectLayerLabel": "Yapı katmanlarını seçin",
  "selectLayerHintText": "İpucu: Ayarla düğmesini kullanarak yapı alanını ve ilgili çizgi katmanını seçin",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Seçilen alan katmanının geçerli bir ilgili katmanı yok."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "İlgili çizgi katmanı seçin",
    "layerSettingTabLabel": "Yapı katmanları",
    "advancedSettingTabLabel": "Gelişmiş ayarlar",
    "selectLayerHintText": "İpucu: Yapı çizgisi katmanındaki COGO değerlerini saklamak için kullanın",
    "selectFieldLegendLabel": "Yapı çizgisi katmanındaki COGO değerlerinin saklanacağı alanları seçin",
    "bearingFieldLabel": "Yön",
    "chordLengthFieldLabel": "Kiriş Uzunluğu",
    "distanceFieldLabel": "Mesafe",
    "sequenceIdFieldLabel": "Sıra No",
    "radiusFieldLabel": "Yarıçap",
    "foreignKeyFieldLabel": "Yabancı Anahtar",
    "arcLengthFieldLabel": "Yay Uzunluğu",
    "lineTypeFieldLabel": "Çizgi Türü",
    "parcelPointSymbolLabel": "Yapı Noktası Sembolü",
    "parcelPointSymbolHintText": "İpucu: Çizginin başlangıç noktası için nokta sembolünü görüntülemek için kullanılır.",
    "symbolPickerPreviewText": "Önizleme",
    "selectLineLayerLabel": "Çizgi katmanı seçin"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Alan katmanı seçin",
    "selectPolygonLayerHintText": "İpucu: Yapı alanı katmanı seçme özelliğini kullanın",
    "selectFieldLegendLabel": "Yapı alanı özniteliklerinin saklanacağı alanları seçin",
    "parcelNameLabel": "Yapı İsmi",
    "rotationLabel": "Döndürme",
    "planNameLabel": "Plan İsmi",
    "scalingLabel": "Ölçeklendirme",
    "documentTypeLabel": "Belge Türü",
    "miscloseRatioLabel": "Kapanmama Oranı",
    "statedAreaLabel": "Belirtilen Alan",
    "miscloseDistanceLabel": "Kapanmama Mesafesi",
    "selectPolygonLayerLabelPopUp": "Bir alan katmanı seçin"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Çizgi Türü",
    "valueLabel": "Değer",
    "symbolLabel": "Sembol",
    "connectionLineLabel": "Bağlantı Çizgisi",
    "boundaryLineLabel": "Sınır Çizgisi"
  },
  "closureSetting": {
    "snappingLayerLabel": "Yerleşim Katmanları",
    "snappingBtnLabel": "Ayarla",
    "snappingLayerHintText": "İpucu: Yapı çizgilerinin yerleştirileceği katmanları seçin.",
    "miscloseDistanceLabel": "Kapanmama Mesafesi",
    "miscloseDistanceHintText": "İpucu: Kapanmama mesafesi ve birimini belirtin.",
    "miscloseRatioLabel": "Kapanmama Oranı",
    "miscloseRatioHintText": "İpucu: Kapanmama oranını belirtin.",
    "snappingToleranceLabel": "Yerleştirme Toleransı",
    "pixelLabel": "Piksel",
    "snappingToleranceHintText": "İpucu: Yerleştirme toleransını belirtin.",
    "selectLayerLabel": "Katman seçin"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Geçersiz Yön Alanı",
    "chordLengthErrMsg": "Geçersiz ChordLength Değeri",
    "distanceFieldErrMsg": "Geçersiz Mesafe",
    "sequenceIdFieldErrMsg": "Geçersiz sequenceId değeri",
    "radiusFieldErrMsg": "Geçersiz Yarıçap",
    "foreignKeyFieldErrMsg": "Geçersiz Yabancı Anahtar",
    "arcLengthFieldErrMsg": "Geçersiz Yay Uzunluğu",
    "lineTypeFieldErrMsg": "Geçersiz Çizgi Türü",
    "parcelNameFieldErrMsg": "Geçersiz Yapı Adı Alanı",
    "planNameFieldErrMsg": "Geçersiz Plan Adı Alanı",
    "scaleFieldErrMsg": "Geçersiz Ölçek Alanı",
    "documentTypeFieldErrMsg": "Geçersiz Belge Türü Alanı",
    "miscloseRatioFieldErrMsg": "Geçersiz Kapanmama Oranı Alanı",
    "statedAreaFieldErrMsg": "Geçersiz Belirtilen Saha Alanı",
    "miscloseDistanceFieldErrMsg": "Geçersiz Kapanmama Mesafesi Alanı",
    "globalIdFieldErrMsg": "Seçilen alan katmanının geçerli bir 'esriFieldTypeGlobalID’ alanı yok.",
    "invalidPolylineLayer": "Geçerli bir yapı çoklu çizgi katmanı seçin",
    "invalidPolygonLayer": "Geçerli bir yapı alanı katmanı seçin",
    "invalidMiscloseDistance": "Geçerli kapanmama mesafesi girin",
    "invalidSnappingTolerance": "Geçerli yerleştirme toleransı girin",
    "invalidMiscloseRatio": "Geçerli kapanmama oranı girin",
    "selectDistinctLineTypes": "Her çizgi türü için farklı değer girin",
    "invalidConnectionLineType": "Geçersiz bağlantı çizgisi değeri",
    "invalidBoundaryLineType": "Geçersiz sınır çizgisi değeri",
    "selectDistinctPolylineFields": "Her COGO değeri için farklı alan belirleyin.",
    "selectDistinctPolygonFields": "Her yapı alanı özniteliği için farklı alan belirleyin."
  }
});