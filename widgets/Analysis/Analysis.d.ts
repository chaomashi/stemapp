declare namespace Analysis {
  interface LayerSetting {
    name: string;
    isArray?: boolean;
    geomTypes: string[];
  }

  interface ToolSetting {
    id: number;
    dijitID: string;
    name: string;
    title: string;
    imgDisplay?: string;
    usage?: string;
    analysisLayer?: LayerSetting;
    requiredParam?: LayerSetting;
    optionalParams?: LayerSetting[];
    icon?: string;
    cannotCancel?: boolean;
    privileges?: string[];
  }

  interface UserInfo {
    role: string;
    roleId?: string;
    orgId?: string;
    privileges?: string[];
  }

  interface LayerLike {
    id: string;
    geometryType: string;
    declaredClass?: string;
    type?: string;
    url?: string;
    capabilities?: string;
    itemInfo?: any;
  }

  interface PrivilegeUtilLike {
    isAdmin: () => boolean;
    getUser: () => UserInfo;
  }

  interface SingleToolConfig {
    toolLabel?: string;
    showHelp: boolean;
    showCredits?: boolean;
    showChooseExtent: boolean;
    showReadyToUseLayers?: boolean;
    allowToExport: boolean;
    returnFeatureCollection: boolean;
  }

  interface AnalysisConfig {
    analysisTools: SingleToolConfig[];
  }
}

declare module 'widgets/Analysis/toolSettings' {
  class ToolSettings {
    /**
     * Get all tool settings.
     */
    static getAllSettings(): Analysis.ToolSetting[];

    /**
     * Find target tool setting using the name provided.
     * @param name
     */
    static findToolSetting(name: string): Analysis.ToolSetting;
  }

  export = ToolSettings;
}

declare module 'widgets/Analysis/VersionManager' {
  import BaseVersionManager = require('jimu/shared/BaseVersionManager');

  class VersionManager extends BaseVersionManager {

  }

  export = VersionManager;
}

declare module 'widgets/Analysis/PortalAnalysis' {
  import Role = require('jimu/Role');

  class PortalAnalysis {
    constructor(userRole: Role, portalSelf: any);

    canPerformAnalysis(): boolean;

    hasPrivileges(privileges: string[]): boolean;
  }

  export = PortalAnalysis;
}

declare module 'widgets/Analysis/PrivilegeUtil' {
  class PrivilegeUtil {
    constructor(portalUrl: string);

    loadPrivileges(portalUrl?: string): dojo.Deferred<boolean>;

    getUser(): Analysis.UserInfo;

    isAdmin(): boolean;

    getUserPortal(): string;

    isPortal(): boolean;

    canPerformAnalysis(): boolean;

    hasPrivileges(privileges: string[]): boolean;
  }
  export = PrivilegeUtil;
}

declare module 'widgets/Analysis/toolValidate' {
  class ToolValidate {
    /**
     * Check whether a specific analysis tool is valid to use based on its required layers
     * and layers existed in the map.
     * @param layerObjects
     * @param toolConfig
     * @param privilegeUtil
     */
    static isValid(layerObjects: Analysis.LayerLike[],
            toolConfig: Analysis.ToolSetting,
            privilegeUtil?: Analysis.PrivilegeUtilLike): boolean;

    /**
     * Check whether merge tool is valid to use.
     * @param layers
     */
    static mergeAvailable(layers: Analysis.LayerLike[]): boolean;

    /**
     * Check whether extract data is valid to use.
     * @param res
     * @param privilegeUtil
     */
    static extractAvailable(layerObjects: Analysis.LayerLike[],
                            privilegeUtil: Analysis.PrivilegeUtilLike): boolean;

    /**
     * Check whether current layers contain the specified layers.
     * @param layerObjects
     * @param analysisLayer
     * @param requiredParam
     */
    static paramAvailable(layerObjects: Analysis.LayerLike[],
                   analysisLayer: Analysis.LayerSetting,
                   requiredParam?: Analysis.LayerSetting): boolean;

    /**
     * Find the layer fulfil the requirements and return its id.
     * @param layerObjects
     * @param geomTypes
     * @param excludeLayerId
     */
    static findMatchedFeatureLayers(layerObjects: Analysis.LayerLike[],
                            geomTypes: string[]): string[];
  }

  export = ToolValidate;
}
