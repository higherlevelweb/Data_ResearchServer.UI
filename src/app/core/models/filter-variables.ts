export interface FilterVariables {
    isPCA?: boolean; // checkbox
    environment?: string; // checkbox list - service
    agegroup?: string; // checkbox list
    gender?: string; // radio
    datavariable: any;
    isActive?: boolean; // checkbox
    SelectedVariables?: any;
    SexID?: string; // // radio
    AgeGroupID?: any; //  checkbox list
    ComponentID?: string; // text
    ServiceID?: any; // checkbox list
    MOSID?: string; // text
    TradeID?: string; // text
    PreferredHandwritingID?: string; // text
    PreferredHandsightingWeaponID?: string; // text
    VisionCorrected?: string; // radio
    LanguageID?: string; // // checkbox list
    PCAManikinOption?: any; // checkbox list
    ManikinDefinition?: any; // checkbox list
    AccomodationPercentage?: string;
    SurveyDatabase?: string; // dropdown list
  }

  export interface FilterExtendedVariables {
    datavariable: any;
    isOverlay?: boolean; // checkbox
    isPCA?: boolean; // checkbox
    SexID?: string; // // radio
    AgeGroupID?: any; //  checkbox list
    ComponentID?: string; // text
    ServiceID?: any; // checkbox list
    MOSID?: string; // text
    TradeID?: string; // text
    PreferredHandwritingID?: string; // text
    PreferredHandsightingWeaponID?: string; // text
    VisionCorrected?: string; // radio
    LanguageID?: string; // // checkbox list
    SexID2?: string; // // radio
    AgeGroupID2?: any; //  checkbox list
    ComponentID2?: string; // text
    ServiceID2?: any; // checkbox list
    MOSID2?: string; // text
    TradeID2?: string; // text
    PreferredHandwritingID2?: string; // text
    PreferredHandsightingWeaponID2?: string; // text
    VisionCorrected2?: string; // radio
    LanguageID2?: string; // // checkbox list
    PCAManikinOption?: any; // checkbox list
    ManikinDefinition?: any; // checkbox list
    AccomodationPercentage?: string;
    Unit?: string;
    BinNumber?: string;
    MissingDataHandlingWithDeletion?: string; // radio
    PCsToBeCalculated?: string; // radio
    NumberOfPCsToAssess?: string; // radio
    PCACalculateManekins?: string; // radio
    SurveyDatabase?: string; // dropdown list
  }
