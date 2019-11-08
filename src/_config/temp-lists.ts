export const DATASETS = ['CFAS 2012', 'ANSUR 11', 'CAESAR', 'AWAS'];

export const SEXES = [
  { value: '0', display: 'All' },
  { value: '1', display: 'Male' },
  { value: '2', display: 'Female' }
];

export const AGEGROUPS = [
  { value: '1', display: '15-19' },
  { value: '2', display: '20-24' },
  { value: '3', display: '25-29' },
  { value: '4', display: '30-34' },
  { value: '5', display: '35-39' },
  { value: '6', display: '40-44' },
  { value: '7', display: '45-49' },
  { value: '8', display: '50-54' },
  { value: '9', display: '55-59' },
  { value: '10', display: '60-64' }
];

export const TRADES_BRANCHES = [
  { value: '1', display: 'Combat Arms' },
  { value: '2', display: 'Pilot' },
  { value: '3', display: 'Aircrew' },
  { value: '4', display: 'Support' }
];

export const COMPONENT_TYPES = [
  { value: '1', display: 'Canadian Rangers' },
  { value: '2', display: 'Regular Force' },
  { value: '3', display: 'Reserve' }
];

export const LANGUAGES = [
  { value: '0', display: 'All' },
  { value: '1', display: 'Anglophone' },
  { value: '2', display: 'Francophone' }
];

export const PREFERRED_HANDS = [
  { value: '0', display: 'All' },
  { value: '1', display: 'Right' },
  { value: '2', display: 'Left' }
];

export const SERVICES = [
  { value: '1', display: 'Army' },
  { value: '2', display: 'Air Force' },
  { value: '3', display: 'Navy' }
];

export const VISIONSCORRECTED = [
  { value: '0', display: 'All' },
  { value: '1', display: 'Yes' },
  { value: '2', display: 'No' }
];

export const BODY_MEASURES = [
  { id: '0', value: "AcromialHeight", display: "Acromial Height", type: "WholeBody" },
  { id: '1', value: "AcromialWallDepth", display: "Acromial-Wall Depth", type: "WholeBody" },
  { id: '2', value: "Age", display: "Age ", type: "WholeBody" },
  { id: '3', value: "AxillaHeightScan", display: "Axilla Height Scan", type: "WholeBody" },
  { id: '4', value: "BMI", display: "BMI ", type: "WholeBody" },
  { id: '5', value: "CervicaleHeightScan", display: "Cervicale Height Scan", type: "WholeBody" },
  { id: '6', value: "HipBreadth", display: "Hip Breadth", type: "WholeBody" },
  { id: '7', value: "IliocristaleHeightScan", display: "Iliocristale Height Scan", type: "WholeBody" },
  { id: '8', value: "Stature", display: "Stature ", type: "WholeBody" },
  { id: '9', value: "StatureScan", display: "Stature Scan", type: "WholeBody" },
  { id: '10', value: "StrapLengthScan", display: "Strap Length Scan", type: "WholeBody" },
  { id: '11', value: "SuprasternaleHeightScan", display: "Suprasternale Height Scan", type: "WholeBody" },
  { id: '12', value: "TenthRibHeightScan", display: "TenthRib Height Scan", type: "WholeBody" },
  { id: '13', value: "WaistCircumferenceOmphalion", display: "Waist Circumference Omphalion (o)", type: "WholeBody" },
  { id: '14', value: "WaistHeightOmphalion_Scan", display: "Waist Height Omphalion Scan", type: "WholeBody" },
  { id: '15', value: "Weight", display: "Weight ", type: "WholeBody" },
  { id: '16', value: "WaistHeight_NaturalIndentation", display: "Waist Height (Natural Indentation)", type: "WholeBody" },
  { id: '17', value: "BitragionBreadthScan", display: "Bitragion Breadth Scan", type: "HeadNeck" },
  { id: '18', value: "BitragionCoronalArc", display: "Bitragion Coronal Arc", type: "HeadNeck" },
  { id: '19', value: "BizygomaticBreadth", display: "Bizygomatic Breadth", type: "HeadNeck" },
  { id: '20', value: "EyeHeightStanding", display: "Eye Height, Standing", type: "HeadNeck" },
  { id: '21', value: "HeadBreadth", display: "Head Breadth", type: "HeadNeck" },
  { id: '22', value: "HeadLength", display: "Head Length", type: "HeadNeck" },
  { id: '23', value: "HeadLengthScan", display: "Head Length Scan", type: "HeadNeck" },
  { id: '24', value: "InterpupillaryBreadth", display: "Interpupillary Breadth", type: "HeadNeck" },
  { id: '25', value: "MentonSellionLength", display: "Menton Sellion Length", type: "HeadNeck" },
  { id: '26', value: "NeckCircumferenceScan", display: "Neck Circumference Scan", type: "HeadNeck" },
  { id: '27', value: "NeckCircumferenceBaseScan", display: "Neck Circumference Base Scan", type: "HeadNeck" },
  { id: '28', value: "SagittalArc", display: "Sagittal Arc", type: "HeadNeck" },
  { id: '29', value: "AcromialHeightSitting", display: "Acromial Height, Sitting", type: "Seated" },
  { id: '30', value: "ButtockKneeLength", display: "Buttock-Knee Length", type: "Seated" },
  { id: '31', value: "ButtockPoplitealLength", display: "Buttock-Popliteal Length", type: "Seated" },
  { id: '32', value: "ElbowRestHeightSitting", display: "Elbow Rest Height, Sitting", type: "Seated" },
  { id: '33', value: "EyeHeightSitting", display: "Eye Height, Sitting", type: "Seated" },
  { id: '34', value: "HipBreadthSitting", display: "Hip Breadth, Sitting", type: "Seated" },
  { id: '35', value: "KneeHeightSitting", display: "Knee Height, Sitting", type: "Seated" },
  { id: '36', value: "PoplitealHeight", display: "Popliteal Height", type: "Seated" },
  { id: '37', value: "SittingHeight", display: "Sitting Height", type: "Seated" },
  { id: '38', value: "ThighClearance", display: "Thigh Clearance", type: "Seated" },
  { id: '39', value: "TrochanterionHeight_Scan", display: "Trochanterion Height Scan", type: "Seated" },
  { id: '40', value: "BiacromialBreadth", display: "Biacromial Breadth", type: "Torso" },
  { id: '41', value: "BideltoidBreadth", display: "Bideltoid Breadth", type: "Torso" },
  { id: '42', value: "Bustpoint_Thelion_Bustpoint_ThelionBreadthScan", display: "Bustpoint_Thelion_Bustpoint_Thelion Breadth Scan", type: "Torso" },
  { id: '43', value: "ButtockCircumference", display: "Buttock Circumference", type: "Torso" },
  { id: '44', value: "ButtockDepthScan", display: "Buttock Depth Scan", type: "Torso" },
  { id: '45', value: "ButtockHeightScan", display: "Buttock Height Scan", type: "Torso" },
  { id: '46', value: "ChestBreadth", display: "Chest Breadth", type: "Torso" },
  { id: '47', value: "ChestCircumference", display: "Chest Circumference", type: "Torso" },
  { id: '48', value: "ChestDepthScan", display: "Chest Depth Scan", type: "Torso" },
  { id: '49', value: "ChestHeightScan", display: "Chest Height Scan", type: "Torso" },
  { id: '50', value: "InterscyeIScan", display: "Interscye I Scan", type: "Torso" },
  { id: '51', value: "NeckBustpoint_ThelionLengthScan", display: "Neck Bustpoint Thelion Length Scan", type: "Torso" },
  { id: '52', value: "ScyeCircumference", display: "Scye Circumference", type: "Torso" },
  { id: '53', value: "VerticalTrunkCircumference", display: "Vertical Trunk Circumference (ASCC)", type: "Torso" },
  { id: '53', value: "WaistBackLength_NaturalIndentation_Scan", display: "Waist Back Length Natural Indentation Scan", type: "Torso" },
  { id: '54', value: "WaistBackLength_Omphalion_Scan", display: "Waist Back Length Omphalion Scan", type: "Torso" },
  { id: '55', value: "WaistCircumference_Omphalion_Scan", display: "WaistCircumference Omphalion Scan", type: "Torso" },
  { id: '56', value: "WaistDepthScan", display: "Waist Depth Scan", type: "Torso" },
  { id: '57', value: "WaistFrontLength_NaturalIndentation_Scan", display: "Waist Front Length Natural Indentation Scan", type: "Torso" },
  { id: '58', value: "WaistFrontLength_Omphalion_Scan", display: "Waist Front Length Omphalion Scan", type: "Torso" },
  { id: '59', value: "WaistHipLengthScan", display: "Waist Hip Length Scan", type: "Torso" },
  { id: '60', value: "AcromionRadialeLengthScan", display: "Acromion Radiale Length Scan", type: "HandArm" },
  { id: '61', value: "ArmLength", display: "Arm Length", type: "HandArm" },
  { id: '62', value: "AxillaryArmCircumference", display: "Axillary Arm Circumference", type: "HandArm" },
  { id: '63', value: "CervicaleWristLength", display: "Cervicale-Wrist Length", type: "HandArm" },
  { id: '64', value: "ElbowCircumferenceScan", display: "Elbow Circumference Scan", type: "HandArm" },
  { id: '65', value: "ElbowGirth", display: "Elbow Girth", type: "HandArm" },
  { id: '66', value: "HandBreadth", display: "Hand Breadth", type: "HandArm" },
  { id: '67', value: "HandCircumference", display: "Hand Circumference", type: "HandArm" },
  { id: '68', value: "HandLength", display: "Hand Length", type: "HandArm" },
  { id: '69', value: "IndexFingerLength", display: "Index Finger Length", type: "HandArm" },
  { id: '70', value: "RadialeStylionLengthScan", display: "Radiale Stylion Length Scan", type: "HandArm" },
  { id: '71', value: "ShoulderLengthScan", display: "Shoulder Length Scan", type: "HandArm" },
  { id: '72', value: "SleeveOutseamScan", display: "Sleeve Outseam Scan", type: "HandArm" },
  { id: '73', value: "Span", display: "Span ", type: "HandArm" },
  { id: '74', value: "ThumbtipReach", display: "Thumbtip Reach", type: "HandArm" },
  { id: '75', value: "ThumbtipReachExtended", display: "Thumbtip Reach, extended", type: "HandArm" },
  { id: '76', value: "WristCircumferenceScan", display: "Wrist Circumference Scan", type: "HandArm" },
  { id: '77', value: "WristWallLength", display: "Wrist-Wall Length", type: "HandArm" },
  { id: '78', value: "Ankle_Bimaleaolar_BreadthScan", display: "Ankle Bimaleaolar Breadth Scan", type: "LegFoot" },
  { id: '79', value: "AnkleCircumferenceScan", display: "Ankle Circumference Scan", type: "LegFoot" },
  { id: '80', value: "Ankle_Malleolus_Height_Scan", display: "Ankle Height Scan", type: "LegFoot" },
  { id: '81', value: "CalfCircumferenceScan", display: "Calf Circumference Scan", type: "LegFoot" },
  { id: '82', value: "CalfHeightScan", display: "Calf Height Scan", type: "LegFoot" },
  { id: '83', value: "CrotchHeight", display: "Crotch Height", type: "LegFoot" },
  { id: '84', value: "FootBreadth", display: "Foot Breadth", type: "LegFoot" },
  { id: '85', value: "FootLength", display: "Foot Length", type: "LegFoot" },
  { id: '86', value: "KneeCircumferenceScan", display: "Knee Circumference Scan", type: "LegFoot" },
  { id: '87', value: "KneeHeightMidpatellaScan", display: "Knee Height Midpatella Scan", type: "LegFoot" },
  { id: '88', value: "LateralFemoralEpicondyleHeightScan", display: "Lateral Femoral Epicondyle Height Scan", type: "LegFoot" },
  { id: '89', value: "LateralMalleolusHeightScan", display: "Lateral Malleolus Height Scan", type: "LegFoot" },
  { id: '90', value: "OuterLegLength", display: "Outer Leg Length", type: "LegFoot" },
  { id: '91', value: "ThighCircumferenceScan", display: "Thigh Circumference Scan", type: "LegFoot" }
];

export const PCA_MANIKIN_OPTIONS = [
  { id: '0', value: 'Ellipse', display: 'Show Ellipse' },
  { id: '1', value: 'Manikins', display: 'Calculate Manikins' }
];

export const PCA_MANKIN_DEFINITIONS = [
  { id: '0',  value: 'AxesExtremes', display: 'Axes Extremes' },
  { id: '1',  value: 'BoundryMidpoints', display: 'Boundary Midpoints' },
  { id: '2',  value: 'Centroid1', display: 'Centroid' },
  { id: '3',  value: 'HalfAxes', display: 'Half Axes' },
  { id: '4',  value: 'MidQuadrants', display: 'Mid Quadrants' }
];

export const MISSING_DATA_HANDLING = [
  { value: '1', display: 'Listwise Deletion' },
  { value: '2', display: 'Imputation (replace with mean)' }
];


export const ACCOMODATIONS = ['100', '99', '98', '97', '96', '95', '94', '93', '92', '91', '90',
, '89', '88', '87', '86', '85', '84', '83', '82', '81', '80',
, '79', '78', '77', '76', '75', '74', '73', '72', '71', '70',
, '69', '68', '67', '66', '65', '64', '63', '62', '61', '60',
, '59', '58', '57', '56', '55', '54', '53', '52', '51', '50',
, '49', '48', '47', '46', '45', '44', '43', '42', '41', '40',
, '39', '38', '37', '36', '35', '34', '33', '32', '31', '30',
, '29', '28', '27', '26', '25', '24', '23', '22', '21', '20',
, '19', '18', '17', '16', '15', '14', '13', '12', '11', '10',
, '9', '8', '7', '6', '5', '4', '3', '2', '1'];
export const PCS_TO_BE_CALCULATED = ['3', '2', '1'];

//Chart Number Bins Selected
export const BIN_OPTIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const UNITS = ['Metric', 'Imperial'];

export const NUMBER_OF_PCS_TO_ASSESS = [
  { id: '0', value: '1', display: 'Initial Eigenvalue", "% of Variance", "Cumulative %"' }
];
