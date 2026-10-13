type __VLS_Props = {
    searchQuery: string;
    isDark: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "toggle-drawer": () => any;
    "toggle-theme": () => any;
    "update:searchQuery": (val: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onToggle-drawer"?: (() => any) | undefined;
    "onToggle-theme"?: (() => any) | undefined;
    "onUpdate:searchQuery"?: ((val: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
