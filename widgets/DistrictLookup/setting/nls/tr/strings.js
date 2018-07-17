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
    "miles": "Mil",
    "kilometers": "Kilometre",
    "feet": "Fit",
    "meters": "Metre"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Arama Ayarları",
    "buttonSet": "Ayarla",
    "selectLayersLabel": "Katman seç",
    "selectLayersHintText": "İpucu: Alan katmanını ve onunla ilişkili nokta katmanını seçmek için kullanılır.",
    "selectPrecinctSymbolLabel": "Alanı vurgulamak için simge seç",
    "selectGraphicLocationSymbol": "Adres veya konum simgesi",
    "graphicLocationSymbolHintText": "İpucu: Aranan adres veya tıklanan konum simgesi",
    "precinctSymbolHintText": "İpucu: Seçilen alanın simgesini görüntülemek için kullanılır",
    "selectColorForPoint": "Noktayı vurgulamak için renk seç",
    "selectColorForPointHintText": "İpucu: Seçilen noktanın vurgulama rengini görüntülemek için kullanılır"
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
    "invalidUrlTip": "${URL} URL'si geçersiz veya erişilemez durumda.",
    "invalidSearchSources": "Geçersiz arama kaynağı ayarları"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Alan katmanını seç",
    "selectPolygonLayerHintText": "İpucu: Alan katmanını seçmek için kullanılır",
    "selectRelatedPointLayerLabel": "Alan katmanı ile ilişkili nokta katmanını seçin",
    "selectRelatedPointLayerHintText": "İpucu: Alan katmanı ile ilişkili nokta katmanını seçmek için kullanılır",
    "polygonLayerNotHavingRelatedLayer": "İlişkili nokta katmanına sahip bir alan katmanı seçin.",
    "errorInSelectingPolygonLayer": "İlişkili nokta katmanına sahip bir alan katmanı seçin.",
    "errorInSelectingRelatedLayer": "Alan katmanı ile ilişkili nokta katmanını seçin."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Doğrultu Ayarları",
    "routeServiceUrl": "Rota oluşturma servisi",
    "buttonSet": "Ayarla",
    "routeServiceUrlHintText": "İpucu: Bir ağ analizi rota oluşturma servisini inceleyerek seçmek için ‘Ayarla’ düğmesine tıklayın",
    "directionLengthUnit": "Yol tarifi uzunluk birimi",
    "unitsForRouteHintText": "İpucu: Bildirilen rota birimini görüntülemek için kullanılır",
    "selectRouteSymbol": "Rotayı görüntülemek için simge seç",
    "routeSymbolHintText": "İpucu: Rotanın çizgi simgesini görüntülemek için kullanılır",
    "routingDisabledMsg": "Yol tarifi özelliğini etkinleştirmek için ArcGIS Online öğesinde rota oluşturmanın etkinleştirildiğinden emin olun."
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
  "symbolPickerPreviewText": "Önizleme:",
  "showToolToSelectLabel": "Konum düğmesini ayarla",
  "showToolToSelectHintText": "İpucu: Konumu harita her tıklandığında ayarlamak yerine, konumu harita üzerinde ayarlayan bir düğme sağlar"
});