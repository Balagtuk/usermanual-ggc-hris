export interface FieldDefinition {
    name: string;
    requirement: 'Required' | 'Optional';
    dataType?: string;
    description: string;
}
export interface StepItem {
    number: number;
    title: string;
    description: string;
}
export interface CalloutItem {
    type: 'info' | 'warning' | 'success' | 'tip';
    title: string;
    text: string;
}
export interface ScreenshotInfo {
    src?: string;
    caption: string;
    alt: string;
    viewTitle: string;
    mockupType: 'table' | 'form' | 'split-permissions' | 'matrix';
}
export interface ModuleDoc {
    id: string;
    num: number;
    title: string;
    route: string;
    permissions: string[];
    category: 'Account & Access' | 'Organizational Setup';
    icon: string;
    description: string;
    overview: string;
    steps?: StepItem[];
    fields?: FieldDefinition[];
    callout?: CalloutItem;
    screenshot?: ScreenshotInfo;
    additionalTable?: {
        title: string;
        headers: string[];
        rows: {
            col1: string;
            col2: string;
            col3: string;
        }[];
    };
}
export interface IntroSection {
    title: string;
    description: string;
    points: {
        icon: string;
        title: string;
        text: string;
    }[];
}
export declare const INTRO_CONTENT: {
    title: string;
    subtitle: string;
    version: string;
    targetAudience: {
        role: string;
        icon: string;
        description: string;
    }[];
    hierarchyFlow: {
        step: number;
        name: string;
        icon: string;
        desc: string;
    }[];
    corePrinciples: {
        title: string;
        icon: string;
        text: string;
    }[];
    preflightChecklist: {
        number: number;
        title: string;
        detail: string;
    }[];
};
export declare const MANUAL_MODULES: ModuleDoc[];
