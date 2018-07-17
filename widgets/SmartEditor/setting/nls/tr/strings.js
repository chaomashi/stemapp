define({
  "layersPage": {
    "allLayers": "Tüm Katmanlar",
    "title": "Detay oluşturmak için şablon seç",
    "generalSettings": "Genel Ayarlar",
    "layerSettings": "Katman Ayarları",
    "presetValueText": "Ön Ayar Değerlerini Tanımla",
    "geocoderSettingsText": "Coğrafi Kodlayıcı Ayarları",
    "editDescription": "Düzenleme paneli için ekran metni girin",
    "editDescriptionTip": "Bu metin, Şablon seçicinin üzerinde görüntülenir, boş bırakmak için metin girmeyin.",
    "promptOnSave": "Form kapalıyken veya bir sonraki kayda geçildiğinde kaydedilmemiş düzenlemeleri kaydetmek için uyar.",
    "promptOnSaveTip": "Kullanıcı kapat öğesine tıkladığında veya geçerli detayda kaydedilmemiş düzeltmeler varken bir sonraki düzenlenebilir kayda geçtiğinde bir bildirim görüntülensin.",
    "promptOnDelete": "Kayıt silinirken onaylama zorunlu olsun.",
    "promptOnDeleteTip": "Kullanıcı eylemi onaylamak için sil öğesine tıkladığında bir bildirim görüntülensin.",
    "removeOnSave": "Kaydedilirken detay seçimden kaldırılsın.",
    "removeOnSaveTip": "Kayıt kaydedildiğinde detayın seçim kümesinden kaldırılması seçeneği. Bu, seçilen tek kayıt ise panel yeniden şablon sayfasına döndürülür.",
    "useFilterEditor": "Detay şablonu filtresini kullan",
    "useFilterEditorTip": "Bir katmanın şablonunu görüntüleme veya şablonları ada göre arama özelliğini sağlayan Filtre Şablonu seçiciyi kullanma seçeneği.",
    "displayShapeSelector": "Çizim seçeneklerini göster",
    "displayShapeSelectorTip": "Seçilen şablon için geçerli çizim seçeneklerinin listesini gösterme seçeneği.",
    "displayPresetTop": "Önceden ayarlanmış değer listesini yukarıda göster",
    "displayPresetTopTip": "Şablon seçicinin üzerinde önceden ayarlanmış değer listesini gösterme seçeneği.",
    "listenToGroupFilter": "Grup Filtresi aracından alınan filtre değerlerini Ön Ayarlı alanlara uygulama",
    "listenToGroupFilterTip": "Grup Filtresi aracında bir filtre uygulandığında, değeri Ön Ayarlı değer listesindeki eşleşen bir alana uygulayın.",
    "keepTemplateActive": "Seçilen şablonu etkin tutma",
    "keepTemplateActiveTip": "Şablon seçici gösterildiğinde, daha önceden seçilmiş bir şablon varsa, bunu yeniden seçin.",
    "geometryEditDefault": "Geometri düzenlemesini varsayılan olarak etkinleştir",
    "autoSaveEdits": "Düzenlemeyi otomatik olarak kaydeder",
    "enableAttributeUpdates": "Geometri düzenleme etkin olduğunda Öznitelik İşlemleri güncelleme düğmesini göster",
    "layerSettingsTable": {
      "allowDelete": "Silmeye İzin Ver",
      "allowDeleteTip": "Kullanıcının bir detayı silmesine izin veren seçenektir; katman silmeyi desteklemiyorsa devre dışı bırakılır",
      "edit": "Düzenlenebilir",
      "editTip": "Katmanın araca eklenmesi seçeneğidir",
      "label": "Katman",
      "labelTip": "Haritada tanımlandığı biçimiyle katman adıdır",
      "update": "Geometri Düzenlemeyi Devre Dışı Bırak",
      "updateTip": "Yerleştirildikten sonra geometriyi taşıma veya geometriyi mevcut bir detaya taşıma özelliğini devre dışı bırakma seçeneğidir",
      "allowUpdateOnly": "Yalnızca Güncelle",
      "allowUpdateOnlyTip": "Yalnızca mevcut detayların değiştirilmesine izin verme seçeneğidir, varsayılan olarak işaretlidir ve katman yeni detay oluşturmayı desteklemiyorsa devre dışı bırakılır",
      "fieldsTip": "Düzenlenecek alanları değiştirin ve Akıllı Öznitelikleri tanımlayın",
      "actionsTip": "Alan düzenleme veya ilgili katmanlar/tablolara erişim seçeneği",
      "description": "Açıklama",
      "descriptionTip": "Öznitelik sayfasının en üstünde görüntülemek üzere metin girme seçeneği.",
      "relationTip": "İlgili katmanları/tabloları görüntüle"
    },
    "editFieldError": "Alan değişiklikleri ve Akıllı öznitelikler düzenlenemeyen katmanlarda kullanılamaz",
    "noConfigedLayersError": "Akıllı Düzenleyici için bir veya birkaç düzenlenebilir katman gerekir"
  },
  "editDescriptionPage": {
    "title": "<b>${layername}</b> için öznitelik genel görünüm metnini tanımlayın "
  },
  "fieldsPage": {
    "title": "<b>${layername}</b> için alanları yapılandırın",
    "copyActionTip": "Öznitelik İşlemleri",
    "description": "Bir katmanda Akıllı Öznitelikleri etkinleştirmek için İşlem düzenleme düğmesini kullanın. Akıllı Öznitelikler, diğer alanlardaki değerleri temel alarak bir alanı gerektirebilir, gizleyebilir veya devre dışı bırakabilir. Alan değeri kaynağını kesişim, adres, koordinatlar ve ön ayarlarla etkinleştirmek ve tanımlamak için İşlem kopyalama düğmesini kullanın.",
    "fieldsNotes": "* gerekli bir alandır. Bu alan için Görüntüle seçeneğinin işaretini kaldırırsanız ve düzenleme şablonu söz konusu alanı doldurmazsa, yeni bir kaydı kaydedemezsiniz.",
    "smartAttachmentText": "Akıllı Ekler işlemini yapılandır",
    "smartAttachmentPopupTitle": "<b>${layername}</b> için akıllı ekleri yapılandır",
    "fieldsSettingsTable": {
      "display": "Görünüm",
      "displayTip": "Alanın görünür olup olmadığını belirleyin",
      "edit": "Düzenlenebilir",
      "editTip": "Alan öznitelik formunda mevcutsa işaretleyin",
      "fieldName": "Adı",
      "fieldNameTip": "Veri tabanında tanımlanan alanın adı",
      "fieldAlias": "Takma Ad",
      "fieldAliasTip": "Haritada tanımlanan alanın adı",
      "canPresetValue": "Önayar",
      "canPresetValueTip": "Alanı ön ayarlı alan listesinde gösterme ve kullanıcıya düzenleme öncesinde değeri ayarlama izni verme seçeneği",
      "actions": "İşlemler",
      "actionsTip": "Alan sıralamasını değiştirin veya Akıllı Öznitelikleri ayarlayın"
    },
    "smartAttSupport": "Akıllı Öznitelikler gerekli veri tabanı alanlarında desteklenmiyor"
  },
  "actionPage": {
    "title": "<b>${fieldname}</b> için Öznitelik İşlemlerini yapılandır",
    "description": "Tetiklenme ölçütleri belirtilene kadar eylemler her zaman için kapalıdır. Eylemler sırayla işlenir ve her alan için yalnızca bir eylem tetiklenir. Ölçütleri tanımlamak için Ölçüt Düzenle düğmesini kullanın.",
    "actionsSettingsTable": {
      "rule": "İşlem",
      "ruleTip": "Kriter karşılandığında işlem gerçekleştirildi",
      "expression": "İfade",
      "expressionTip": "Tanımlı ölçütlerden gelen SQL biçimindeki sonuç ifadesi",
      "actions": "Kriterler",
      "actionsTip": "Kural sırasını değiştirin ve tetiklendiğinde kriteri tanımlayın"
    },
    "copyAction": {
      "description": "Alan değeri kaynağı, geçerli bir kriter tetiklenene veya liste tamamlanana kadar etkinleştirilirse işlenir. Kriterleri tanımlamak için Kriter Düzenleme düğmesini kullanın.",
      "intersection": "Kesişim",
      "coordinates": "Koordinatlar",
      "address": "Adres",
      "preset": "Ön ayar",
      "actionText": "İşlemler",
      "criteriaText": "Kriterler",
      "enableText": "Etkin"
    },
    "actions": {
      "hide": "Gizle",
      "required": "Gerekli",
      "disabled": "Pasifleştir"
    }
  },
  "filterPage": {
    "submitHidden": "Gizli olduğunda bile bu alan için öznitelik verileri gönderilsin mi?",
    "title": "${action} kuralı için ifade yapılandırma",
    "filterBuilder": "Kayıt aşağıdaki deyimlerin ${any_or_all} tanesiyle eşleştiğinde alan üzerinde eylemi gerçekleştir",
    "noFilterTip": "Aşağıdaki araçları kullanarak eylemin etkin olduğu deyimi tanımlayın."
  },
  "geocoderPage": {
    "setGeocoderURL": "Coğrafi Kodlayıcı URL’sini Düzenle",
    "hintMsg": "Not: Coğrafi kodlayıcı servisini değiştiriyorsunuz. Lütfen yapılandırdığınız coğrafi kodlayıcı alan eşleştirmelerini güncellediğinizden emin olun.",
    "invalidUrlTip": "${URL} URL'si geçersiz veya erişilemez durumda."
  },
  "addressPage": {
    "popupTitle": "Adres",
    "checkboxLabel": "Coğrafi kodlayıcıdan değer al",
    "selectFieldTitle": "Öznitelik:",
    "geocoderHint": "Coğrafi kodlayıcıyı değiştirmek için genel ayarlarda ‘Coğrafi Kodlayıcı Ayarları’ düğmesine gidin"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinatlar",
    "checkboxLabel": "Koordinatları al",
    "coordinatesSelectTitle": "Koordinat Sistemi:",
    "coordinatesAttributeTitle": "Öznitelik:",
    "mapSpatialReference": "Harita Mekansal Referansı",
    "latlong": "Enlem/Boylam"
  },
  "presetPage": {
    "popupTitle": "Ön ayar",
    "checkboxLabel": "Alan önceden ayarlanmış olacaktır",
    "presetValueLabel": "Mevcut ön ayar değeri:",
    "changePresetValueHint": "Bu ön ayar değerini değiştirmek için genel ayarlarda ‘Ön Ayar Değerlerini Tanımla’ düğmesine gidin"
  },
  "intersectionPage": {
    "checkboxLabel": "Kesişim katmanı alanından değer al",
    "layerText": "Katmanlar",
    "fieldText": "Alanlar",
    "actionsText": "İşlemler",
    "addLayerLinkText": "Katman Ekle"
  },
  "presetAll": {
    "popupTitle": "Varsayılan ön ayar değerlerini tanımla",
    "deleteTitle": "Ön ayar değerlerini sil",
    "hintMsg": "Tüm benzersiz ön ayar alanı adları burada listelenmiştir. Ön ayar alanını kaldırmak, ilgili alanı tüm katmanlar/ tablolarda önceden ayarlandığı şekilde devre dışı bırakır."
  }
});