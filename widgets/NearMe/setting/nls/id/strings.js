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
      "displayText": "Kilometer",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Kaki",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Meter",
      "acronym": "m"
    }
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
    "allPlaceholderLabel": "Teks placehoder untuk mencari semua:",
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
    "locatorWarning": "Versi geocode service tidak didukung. Widget mendukung geocode service versi 10.0 dan lebih tinggi.",
    "locatorTips": "Saran tidak tersedia karena geocode service tidak mendukung kemampuan saran.",
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
    "radiusHint": "Menentukan radius dari area di sekitar pusat peta saat ini yang digunakan untuk mendorong peringkat calon geocoding sehingga calon terdekat dengan lokasi dimunculkan terlebih dahulu",
    "meters": "Meter",
    "setSearchFields": "Atur Kolom Pencarian",
    "set": "Atur",
    "fieldName": "Nama",
    "invalidUrlTip": "URL ${URL} tidak valid atau tidak dapat diakses."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Pengaturan Pencarian",
    "defaultBufferDistanceLabel": "Atur jarak buffer default",
    "maxResultCountLabel": "Batasi jumlah hasil",
    "maxResultCountHintLabel": "Petunjuk: Tetapkan jumlah maksimal hasil yang terlihat. Nilai 1 akan menghasilkan fitur terdekat",
    "maxBufferDistanceLabel": "Atur jarak buffer maksimal",
    "bufferDistanceUnitLabel": "Unit jarak Buffer",
    "defaultBufferHintLabel": "Petunjuk: Atur nilai default untuk slider buffer",
    "maxBufferHintLabel": "Petunjuk: Atur nilai default untuk slider buffer",
    "bufferUnitLabel": "Petunjuk: Tentukan unit untuk membuat buffer",
    "selectGraphicLocationSymbol": "Simbol alamat atau lokasi",
    "graphicLocationSymbolHintText": "Petunjuk: Simbol untuk alamat yang dicari atau lokasi yang diklik",
    "addressLocationPolygonHintText": "Petunjuk: Simbol untuk layer poligon yang dicari",
    "popupTitleForPolygon": "Pilih poligon untuk lokasi alamat yang dipilih",
    "popupTitleForPolyline": "Pilih garis untuk lokasi alamat",
    "addressLocationPolylineHintText": "Petunjuk: Simbol untuk mencari layer polyline",
    "fontColorLabel": "Pilih warna font untuk hasil pencarian",
    "fontColorHintText": "Petunjuk: Warna font hasil pencarian",
    "zoomToSelectedFeature": "Perbesar pada fitur terpilih",
    "zoomToSelectedFeatureHintText": "Petunjuk: Perbesar ke fitur terpilih fitur, bukan buffer",
    "intersectSearchLocation": "Kembalikan poligon persimpangan",
    "intersectSearchLocationHintText": "Petunjuk: Poligon yang kembali berisi lokasi yang dicari, bukannya poligon dalam buffer",
    "enableProximitySearch": "Aktifkan pencarian kedekatan jarak",
    "enableProximitySearchHintText": "Petunjuk: Aktifkan kemampuan untuk mencari lokasi di dekat hasil terpilih",
    "bufferVisibilityLabel": "Atur keterlihatan buffer",
    "bufferVisibilityHintText": "Petunjuk: Buffer akan ditampilkan di peta",
    "bufferColorLabel": "Atur simbol buffer",
    "bufferColorHintText": "Petunjuk: Pilih warna dan transparansi buffer",
    "searchLayerResultLabel": "Gambar hanya hasil layer terpilih",
    "searchLayerResultHint": "Petunjuk: Hanya layer terpilih pada hasil pencarian akan digambar pada peta",
    "showToolToSelectLabel": "Atur tombol lokasi",
    "showToolToSelectHintText": "Petunjuk: Berikan tombol untuk menetapkan lokasi pada peta alih-alih selalu mengatur lokasi ketika peta diklik",
    "geoDesicParamLabel": "Gunakan geodesic buffer",
    "geoDesicParamHintText": "Petunjuk: Gunakan geodesic buffer alih-alih Euclidean buffer (planar)"
  },
  "layerSelector": {
    "selectLayerLabel": "Pilih layer pencarian",
    "layerSelectionHint": "Petunjuk: Gunakan tombol pengatur untuk memilih layer",
    "addLayerButton": "Atur"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Pengaturan Arah",
    "routeServiceUrl": "Routing Service",
    "buttonSet": "Atur",
    "routeServiceUrlHintText": "Petunjuk: Klik â€˜Setâ€™ untuk menelusuri dan memilih routing service",
    "directionLengthUnit": "Unit panjang arah",
    "unitsForRouteHintText": "Petunjuk: Digunakan untuk menampilkan unit untuk rute",
    "selectRouteSymbol": "Pilih simbol untuk menampilkan rute",
    "routeSymbolHintText": "Petunjuk: Digunakan untuk menampilkan simbol garis rute",
    "routingDisabledMsg": "Untuk mengaktifkan petunjuk arah pastikan bahwa perutean diaktifkan pada item di pengaturan aplikasi."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Pengaturan Simbologi",
    "addSymbologyBtnLabel": "Tambahkan Simbol Baru",
    "layerNameTitle": "Nama Layer",
    "fieldTitle": "Kolom",
    "valuesTitle": "Nilai",
    "symbolTitle": "Simbol",
    "actionsTitle": "Tindakan",
    "invalidConfigMsg": "Kolom duplikat: ${fieldName} untuk layer: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Pengaturan Filter",
    "addTaskTip": "Tambahkan satu filter atau lebih pada layer pencarian yang dipilih dan konfigurasikan parameter untuk masing-masing filter tersebut.",
    "enableMapFilter": "Hapus filter layer prasetel dari peta.",
    "newFilter": "Filter baru",
    "filterExpression": "Ekspresi filter",
    "layerDefaultSymbolTip": "Gunakan simbol default layer",
    "uploadImage": "Unggah gambar",
    "selectLayerTip": "Pilih layer.",
    "setTitleTip": "Atur judul.",
    "noTasksTip": "Tidak ada filter yang dikonfigurasi. Klik \"${newFilter}\" untuk menambahkan yang baru.",
    "collapseFiltersTip": "Tutup ekspresi filter (jika ada) ketika widget dibuka",
    "groupFiltersTip": "Filter kelompok menurut layer"
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
  "errorStrings": {
    "bufferErrorString": "Silahkan masukkan nilai numerik yang valid",
    "selectLayerErrorString": "Pilih layer untuk dicari.",
    "invalidDefaultValue": "Jarak buffer default tidak boleh kosong. Tentukan jarak buffer",
    "invalidMaximumValue": "Jarak buffer maksimal tidak boleh kosong. Tentukan jarak buffer",
    "defaultValueLessThanMax": "Tentukan jarak buffer default dalam batas maksimal",
    "defaultBufferValueGreaterThanOne": "Jarak buffer default tidak boleh kurang dari 0",
    "maximumBufferValueGreaterThanOne": "Harap tentukan jarak buffer maksimum lebih besar dari 0",
    "invalidMaximumResultCountValue": "Harap tentukan nilai valid untuk jumlah hasil maksimum",
    "invalidSearchSources": "Pengaturan sumber pencarian tidak valid"
  },
  "symbolPickerPreviewText": "Pratinjau:"
});