import type { ModuleDoc } from '@/data/manualData';
type __VLS_Props = {
    modelValue: boolean;
    modules: ModuleDoc[];
    activeSection: string;
    visibleModuleIds: Set<string>;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (val: boolean) => any;
    navigate: (sectionId: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((val: boolean) => any) | undefined;
    onNavigate?: ((sectionId: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
