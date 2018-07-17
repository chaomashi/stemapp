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
    "kilometers": "Kilometer",
    "feet": "Kaki",
    "meters": "Meter"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Pengaturan Pencarian",
    "buttonSet": "Atur",
    "selectLayersLabel": "Pilih layer",
    "selectLayersHintText": "Petunjuk: Digunakan untuk memilih layer poligon dan layer titik terkaitnya.",
    "selectPrecinctSymbolLabel": "Pilih simbol untuk menyorot poligon",
    "selectGraphicLocationSymbol": "Simbol alamat atau lokasi",
    "graphicLocationSymbolHintText": "Petunjuk: Simbol untuk alamat yang dicari atau lokasi yang diklik",
    "precinctSymbolHintText": "Petunjuk: Digunakan untuk menampilkan simbol untuk poligon terpilih",
    "selectColorForPoint": "Pilih warna untuk menyorot titik",
    "selectColorForPointHintText": "Petunjuk: Digunakan untuk menampilkan warna sorotan untuk titik terpilih"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Pengaturan Sumber Pencarian",
    "searchSourceSettingTitle": "Pengaturan Sumber Pencarian",
    "searchSourceSettingTitleHintText": "Tambah dan konfigurasikan layanan geocode atau feature layer sebagai sumber pencarian. Sumber yang ditentukan ini akan menentukan apa saja yang dapat dicari dalam kotak pencarian",
    "addSearchSourceLabel": "Tambah Sumber Pencarian",
    "featureLayerLabel": "Feature Layer",
    "geocoderLabel": "Geocoder",
    "nameTitle": "Nama",
    "generalSettingLabel": "Pengaturan Umum",
    "allPlaceholderLabel": "Teks placeholder untuk mencari semua:",
    "allPlaceholderHintText": "Petunjuk: Masukkan teks untuk ditampilkan sebagai placeholder ketika mencari semua layer dan geocoder",
    "generalSettingCheckboxLabel": "Tampilkan pop-up untuk fitur atau lokasi yang ditemukan",
    "countryCode": "Kode Negara atau Wilayah",
    "countryCodeEg": "mis. ",
    "countryCodeHint": "Membiarkan nilai ini kosong berarti akan mencari semua negara dan wilayah",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Cari hanya dalam jangkauan peta saat ini",
    "zoomScale": "Skala Zoom",
    "locatorUrl": "URL Geocoder",
    "locatorName": "Nama Geocoder",
    "locatorExample": "Contoh",
    "locatorWarning": "Versi layanan geocode tidak didukung. Widget mendukung layanan geocode versi 10.0 dan lebih tinggi.",
    "locatorTips": "Saran tidak tersedia karena layanan geocode tidak mendukung kemampuan saran.",
    "layerSource": "Sumber Layer",
    "setLayerSource": "Atur Sumber Layer",
    "setGeocoderURL": "Atur URL Geocoder",
    "searchLayerTips": "Saran tidak tersedia karena feature service tidak mendukung kemampuan penomoran halaman.",
    "placeholder": "Teks Placeholder",
    "searchFields": "Kolom Pencarian",
    "displayField": "Tampilkan Kolom",
    "exactMatch": "Persis",
    "maxSuggestions": "Saran Maksimum",
    "maxResults": "Hasil Maksimum",
    "enableLocalSearch": "Aktifkan pencarian lokal",
    "minScale": "Skala Min",
    "minScaleHint": "Apabila skala peta lebih besar daripada skala ini, pencarian lokal akan diterapkan",
    "radius": "Radius",
    "radiusHint": "Menentukan radius dari area di sekitar pusat peta saat ini yang digunakan untuk mendorong peringkat calon geocoding sehingga calon yang terdekat dengan lokasi akan dimunculkan terlebih dahulu",
    "meters": "Meter",
    "setSearchFields": "Atur Kolom Pencarian",
    "set": "Atur",
    "fieldName": "Nama",
    "invalidUrlTip": "URL ${URL} tidak valid atau tidak dapat diakses.",
    "invalidSearchSources": "Pengaturan sumber pencarian tidak valid"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Pilih layer poligon",
    "selectPolygonLayerHintText": "Petunjuk: Digunakan untuk memilih layer poligon.",
    "selectRelatedPointLayerLabel": "Pilih layer titik yang terkait dengan layer poligon",
    "selectRelatedPointLayerHintText": "Petunjuk: Digunakan untuk memilih layer titik yang terkait dengan layer poligon",
    "polygonLayerNotHavingRelatedLayer": "Pilihlah layer poligon yang memiliki layer titik terkait.",
    "errorInSelectingPolygonLayer": "Pilihlah layer poligon yang memiliki layer titik terkait.",
    "errorInSelectingRelatedLayer": "Pilihlah layer titik yang terkait dengan layer poligon."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Pengaturan Arah",
    "routeServiceUrl": "Routing service",
    "buttonSet": "Atur",
    "routeServiceUrlHintText": "Petunjuk: Klik ‘Set’ (Atur) untuk menelusuri dan memilih network analysis routing service",
    "directionLengthUnit": "Unit panjang arah",
    "unitsForRouteHintText": "Petunjuk: Digunakan untuk menampilkan unit yang dilaporkan untuk rute",
    "selectRouteSymbol": "Pilih simbol untuk menampilkan rute",
    "routeSymbolHintText": "Petunjuk: Digunakan untuk menampilkan simbol garis rute",
    "routingDisabledMsg": "Untuk mengaktifkan petunjuk arah pastikan bahwa perutean diaktifkan pada item ArcGIS Online."
  },
  "networkServiceChooser": {
    "arcgislabel": "Tambahkan dari ArcGIS Online",
    "serviceURLabel": "Tambahkan URL Service",
    "routeURL": "URL Rute",
    "validateRouteURL": "Validasi",
    "exampleText": "Contoh",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Tentukanlah Route service yang valid.",
    "rateLimitExceeded": "Batas peringkat terlampaui. Cobalah lagi nanti.",
    "errorInvokingService": "Nama pengguna atau kata sandi tidak benar."
  },
  "symbolPickerPreviewText": "Pratinjau:",
  "showToolToSelectLabel": "Atur tombol lokasi",
  "showToolToSelectHintText": "Petunjuk: Berikan tombol untuk menetapkan lokasi pada peta alih-alih selalu mengatur lokasi ketika peta diklik"
});