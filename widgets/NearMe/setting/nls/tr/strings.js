/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "units": {
    "miles": {
      "displayText": "Mil",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometre",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Fit",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Metre",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Kaynak Ayarlarını Ara",
    "searchSourceSettingTitle": "Kaynak Ayarlarını Ara",
    "searchSourceSettingTitleHintText": "Coğrafi kodlama hizmetlerini veya detay katmanlarını arama kaynağı olarak ekleyin ve yapılandırın. Belirtilen bu kaynaklar arama kutusunda neyin aranabileceğini belirler",
    "addSearchSourceLabel": "Arama Kaynağı Ekle",
    "featureLayerLabel": "Detay Katmanı",
    "geocoderLabel": "Coğrafi Kodlayıcı",
    "nameTitle": "Ad",
    "generalSettingLabel": "Genel Ayar",
    "allPlaceholderLabel": "Tümünü aramak için yer tutucu metin:",
    "allPlaceholderHintText": "İpucu: Tüm katmanları ve coğrafi kodlayıcıyı ararken yer tutucu olarak gösterilecek metni girin",
    "generalSettingCheckboxLabel": "Bulunan detay veya konum için açılır pencere göster",
    "countryCode": "Ülke veya Bölge Kodları",
    "countryCodeEg": "örneğin ",
    "countryCodeHint": "Bu değer boş bırakılırsa tüm ülkeler ve bölgeler aranır",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Yalnızca geçerli harita yayılımını ara",
    "zoomScale": "Yakınlaştırma Ölçeği",
    "locatorUrl": "Coğrafi Kodlayıcı URL'si",
    "locatorName": "Coğrafi Kodlayıcı Adı",
    "locatorExample": "Örnek",
    "locatorWarning": "Coğrafi kodlama servisinin bu sürümü desteklenmiyor. Araç, 10.0 veya üstü sürümdeki coğrafi kodlama servisini destekliyor.",
    "locatorTips": "Coğrafi kodlama hizmeti öneri özelliğini desteklemediğinden öneriler kullanılamıyor.",
    "layerSource": "Katman Kaynağı",
    "setLayerSource": "Kaynak Katmanı Ayarla",
    "setGeocoderURL": "Coğrafi Kodlayıcı URL'si Düzenle",
    "searchLayerTips": "Detay hizmeti sayfalama özelliğini desteklemediğinden öneriler kullanılamıyor.",
    "placeholder": "Yer Tutucu Metni",
    "searchFields": "Arama Alanları",
    "displayField": "Alan Görüntüle",
    "exactMatch": "Tam Eşleşme",
    "maxSuggestions": "Maksimum Öneri Sayısı",
    "maxResults": "Maksimum Sonuç Sayısı",
    "enableLocalSearch": "Yerel aramayı etkinleştir",
    "minScale": "Min Ölçek",
    "minScaleHint": "Harita ölçeği bu ölçekten daha büyük olduğunda yerel arama uygulanır",
    "radius": "Yarıçap",
    "radiusHint": "Coğrafi kodlama adaylarının sıralamasını yükseltmek için kullanılan geçerli harita merkezi etrafındaki bir alanın yarı çapını belirtir, böylelikle konuma en yakın olan adaylar öncelikli olarak döndürülür",
    "meters": "Metre",
    "setSearchFields": "Arama Alanlarını Ayarla",
    "set": "Ayarla",
    "fieldName": "Ad",
    "invalidUrlTip": "${URL} URL'si geçersiz veya erişilemez durumda."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Arama Ayarları",
    "defaultBufferDistanceLabel": "Varsayılan tampon mesafesini ayarla",
    "maxResultCountLabel": "Sonuç sayısını sınırla",
    "maxResultCountHintLabel": "İpucu: Görünür sonuçların maksimum sayısını ayarlayın. 1 değeri en yakın detayı döndürür",
    "maxBufferDistanceLabel": "Maksimum tampon mesafesini ayarla",
    "bufferDistanceUnitLabel": "Tampon mesafesi birimleri",
    "defaultBufferHintLabel": "İpucu: Tampon kaydırıcısı için varsayılan değeri ayarlayın",
    "maxBufferHintLabel": "İpucu: Tampon kaydırıcısı için maksimum değeri ayarlayın",
    "bufferUnitLabel": "İpucu: Tampon oluşturma birimi tanımlayın",
    "selectGraphicLocationSymbol": "Adres veya konum simgesi",
    "graphicLocationSymbolHintText": "İpucu: Aranan adres veya tıklanan konum simgesi",
    "addressLocationPolygonHintText": "İpucu: Aranan alan katmanı sembolü",
    "popupTitleForPolygon": "Seçili adres konumu için alan seçin",
    "popupTitleForPolyline": "Adres konumu için çizgi seçin",
    "addressLocationPolylineHintText": "İpucu: Aranan çok çizgili katman sembolü",
    "fontColorLabel": "Arama sonuçları için yazı tipi rengini belirle",
    "fontColorHintText": "İpucu: Arama sonuçlarının yazı tipi rengi",
    "zoomToSelectedFeature": "Seçili detaya yakınlaştır",
    "zoomToSelectedFeatureHintText": "İpucu: Tampon yerine seçili detaya yakınlaştırın",
    "intersectSearchLocation": "Kesişen alanları döndür",
    "intersectSearchLocationHintText": "İpucu: Tampon içindeki alanlar yerine aranan konumu içeren alanları döndürün",
    "enableProximitySearch": "Yakında aramayı etkinleştir",
    "enableProximitySearchHintText": "İpucu: Seçilen bir sonucun yakınındaki konumları aramayı etkinleştir",
    "bufferVisibilityLabel": "Tampon görünürlüğünü ayarlayın",
    "bufferVisibilityHintText": "İpucu: Tampon haritada görüntülenecek",
    "bufferColorLabel": "Tampon sembolünü ayarlayın",
    "bufferColorHintText": "İpucu: Tamponun rengini ve saydamlığını belirleyin",
    "searchLayerResultLabel": "Yalnızca seçili katman sonuçlarını çiz",
    "searchLayerResultHint": "İpucu: Haritada yalnızca atama sonuçlarında seçilen katman çizilir",
    "showToolToSelectLabel": "Konum düğmesini ayarla",
    "showToolToSelectHintText": "İpucu: Konumu harita her tıklandığında ayarlamak yerine, konumu harita üzerinde ayarlayan bir düğme sağlar",
    "geoDesicParamLabel": "Jeodezik tampon kullan",
    "geoDesicParamHintText": "İpucu: Öklidyen (düzlemsel) tampon yerine jeodezik tampon kullanın"
  },
  "layerSelector": {
    "selectLayerLabel": "Arama katmanlarını seç",
    "layerSelectionHint": "İpucu: Katman seçmek için ayarla düğmesini kullanın",
    "addLayerButton": "Ayarla"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Doğrultu Ayarları",
    "routeServiceUrl": "Rota Oluşturma Servisi",
    "buttonSet": "Ayarla",
    "routeServiceUrlHintText": "İpucu: Bir rota oluşturma servisini inceleyerek seçmek için â€˜Ayarlaâ€™ düğmesine tıklayın",
    "directionLengthUnit": "Yol tarifi uzunluk birimi",
    "unitsForRouteHintText": "İpucu: Rota birimini görüntülemek için kullanılır",
    "selectRouteSymbol": "Rotayı görüntülemek için simge seç",
    "routeSymbolHintText": "İpucu: Rotanın çizgi simgesini görüntülemek için kullanılır",
    "routingDisabledMsg": "Yol tarifi özelliğini etkinleştirmek için yönlendirmenin uygulama ayarlarındaki öğe üzerinde etkinleştirildiğinden emin olun."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Semboloji Ayarları",
    "addSymbologyBtnLabel": "Yeni Sembol Ekle",
    "layerNameTitle": "Katman Adı",
    "fieldTitle": "Alan",
    "valuesTitle": "Değerler",
    "symbolTitle": "Sembol",
    "actionsTitle": "İşlemler",
    "invalidConfigMsg": "Yinelenen alan: ${fieldName}, şu katman için: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filtre Ayarları",
    "addTaskTip": "Seçilen arama katmanına (katmanlarına) bir veya birkaç filtre ekleyin ve her biri için parametreleri yapılandırın.",
    "enableMapFilter": "Ön ayarlı katman filtresini haritadan kaldırın.",
    "newFilter": "Yeni filtre",
    "filterExpression": "Filtre ifadesi",
    "layerDefaultSymbolTip": "Katmanın varsayılan sembolünü kullan",
    "uploadImage": "Görüntü yükle",
    "selectLayerTip": "Katman seçin.",
    "setTitleTip": "Başlığı ayarlayın.",
    "noTasksTip": "Yapılandırılmış filtre yok. Yeni bir filtre eklemek için \"${newFilter}\" öğesine tıklayın.",
    "collapseFiltersTip": "Araç açıldığında filtre ifadelerini (varsa) daraltın",
    "groupFiltersTip": "Katmana göre grup filtreleri"
  },
  "networkServiceChooser": {
    "arcgislabel": "ArcGIS Online'dan Ekle",
    "serviceURLabel": "Servis URL'si ekle",
    "routeURL": "Rotalama URL'si",
    "validateRouteURL": "Doğrula",
    "exampleText": "Örnek",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Geçerli bir Rota servisi belirtin.",
    "rateLimitExceeded": "Hız sınırı aşıldı. Daha sonra tekrar deneyin.",
    "errorInvokingService": "Kullanıcı adı ya da parola hatalı."
  },
  "errorStrings": {
    "bufferErrorString": "Geçerli sayısal değer girin.",
    "selectLayerErrorString": "Aranacak katmanları seçin.",
    "invalidDefaultValue": "Varsayılan tampon mesafesi boş olamaz. Tampon mesafesini belirtin",
    "invalidMaximumValue": "Maksimum tampon mesafesi boş olamaz. Tampon mesafesini belirtin",
    "defaultValueLessThanMax": "Varsayılan tampon mesafesini maksimum sınır dahilinde belirtin",
    "defaultBufferValueGreaterThanOne": "Varsayılan tampon mesafesi 0'dan küçük olamaz",
    "maximumBufferValueGreaterThanOne": "0'dan büyük maksimum tampon mesafesi belirtin",
    "invalidMaximumResultCountValue": "Maksimum sonuç sayısı için geçerli bir değer belirtin",
    "invalidSearchSources": "Geçersiz arama kaynağı ayarları"
  },
  "symbolPickerPreviewText": "Önizleme:"
});