/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/props-fallback.d.ts" />
const { defineProps, defineEmits, } = {};
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
void {};
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vAppBar | typeof __VLS_components.VAppBar | typeof __VLS_components['v-app-bar'] | typeof __VLS_components.vAppBar | typeof __VLS_components.VAppBar | typeof __VLS_components['v-app-bar']} */
vAppBar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    elevation: "1", ...{ class: "border-b" }, color: "surface",
}));
const __VLS_2 = __VLS_1({
    elevation: "1",
    ...{ class: "border-b" },
    color: "surface",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.vAppBarNavIcon | typeof __VLS_components.VAppBarNavIcon | typeof __VLS_components['v-app-bar-nav-icon']} */
vAppBarNavIcon;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    ...{ 'onClick': {} }, ...{ class: "d-md-none" }, 'aria-label': "Toggle navigation",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    ...{ class: "d-md-none" },
    'aria-label': "Toggle navigation",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = {
    /** @type {typeof __VLS_11.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('toggle-drawer'));
        // @ts-ignore
        [$emit,];
    },
};
void __VLS_12;
/** @type {__VLS_StyleScopedClasses['d-md-none']} */ ;
var __VLS_9;
var __VLS_10;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    // @ts-ignore
    color: "primary", ...{ class: "mr-3 ml-2 text-white font-weight-bold" }, size: "38",
}));
const __VLS_15 = __VLS_14({
    color: "primary",
    ...{ class: "mr-3 ml-2 text-white font-weight-bold" },
    size: "38",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_18 } = __VLS_nonNull(__VLS_16.slots);
// @ts-ignore
[];
var __VLS_16;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-none d-sm-block" },
});
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-subtitle-1 font-weight-bold leading-tight" },
});
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
// @ts-ignore
}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    // @ts-ignore
    ...{ 'onUpdate:modelValue': {} }, modelValue: (__VLS_ctx.searchQuery), density: "compact", variant: "outlined", placeholder: "Search modules, fields, rules...", prependInnerIcon: "mdi-magnify", hideDetails: true, clearable: true, ...{ class: "search-bar mr-2" }, ...{ style: {} },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.searchQuery),
    density: "compact",
    variant: "outlined",
    placeholder: "Search modules, fields, rules...",
    prependInnerIcon: "mdi-magnify",
    hideDetails: true,
    clearable: true,
    ...{ class: "search-bar mr-2" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
const __VLS_30 = {
    /** @type {typeof __VLS_29.'update:modelValue'} */
    'onUpdate:modelValue': // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('update:searchQuery', $event || ''));
        // @ts-ignore
        [$emit, searchQuery,];
    },
};
void __VLS_30;
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_27;
var __VLS_28;
if (__VLS_ctx.viewMode === 'paged') {
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        // @ts-ignore
        size: "small", color: "primary", variant: "tonal", ...{ class: "font-weight-bold d-none d-md-flex mr-2" },
    }));
    const __VLS_33 = __VLS_32({
        size: "small",
        color: "primary",
        variant: "tonal",
        ...{ class: "font-weight-bold d-none d-md-flex mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-md-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    const { default: __VLS_36 } = __VLS_nonNull(__VLS_34.slots);
    (__VLS_ctx.currentPage);
    (__VLS_ctx.totalPages);
    // @ts-ignore
    [viewMode, currentPage, totalPages,];
    var __VLS_34;
}
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    // @ts-ignore
    ...{ 'onClick': {} }, size: "small", variant: "outlined", color: "primary", ...{ class: "text-none d-none d-sm-flex mr-2 font-weight-medium" }, prependIcon: (__VLS_ctx.viewMode === 'paged' ? 'mdi-format-list-bulleted' : 'mdi-book-open-page-variant'),
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
    color: "primary",
    ...{ class: "text-none d-none d-sm-flex mr-2 font-weight-medium" },
    prependIcon: (__VLS_ctx.viewMode === 'paged' ? 'mdi-format-list-bulleted' : 'mdi-book-open-page-variant'),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_42;
const __VLS_43 = {
    /** @type {typeof __VLS_42.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('toggle-view-mode'));
        // @ts-ignore
        [$emit, viewMode,];
    },
};
void __VLS_43;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
const { default: __VLS_44 } = __VLS_nonNull(__VLS_40.slots);
(__VLS_ctx.viewMode === 'paged' ? 'Continuous View' : 'Paged View');
// @ts-ignore
[viewMode,];
var __VLS_40;
var __VLS_41;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    // @ts-ignore
    ...{ 'onClick': {} }, icon: true, variant: "text", title: (__VLS_ctx.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'),
}));
const __VLS_47 = __VLS_46({
    ...{ 'onClick': {} },
    icon: true,
    variant: "text",
    title: (__VLS_ctx.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_50;
const __VLS_51 = {
    /** @type {typeof __VLS_50.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('toggle-theme'));
        // @ts-ignore
        [$emit, isDark,];
    },
};
void __VLS_51;
const { default: __VLS_52 } = __VLS_nonNull(__VLS_48.slots);
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
// @ts-ignore
}));
const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_58 } = __VLS_nonNull(__VLS_56.slots);
(__VLS_ctx.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night');
// @ts-ignore
[isDark,];
var __VLS_56;
// @ts-ignore
[];
var __VLS_48;
var __VLS_49;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    // @ts-ignore
    ...{ 'onClick': {} }, color: "primary", variant: "flat", prependIcon: "mdi-printer", ...{ class: "ml-1 d-none d-sm-flex text-none" },
}));
const __VLS_61 = __VLS_60({
    ...{ 'onClick': {} },
    color: "primary",
    variant: "flat",
    prependIcon: "mdi-printer",
    ...{ class: "ml-1 d-none d-sm-flex text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
let __VLS_64;
const __VLS_65 = {
    /** @type {typeof __VLS_64.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('trigger-print'));
        // @ts-ignore
        [$emit,];
    },
};
void __VLS_65;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_66 } = __VLS_nonNull(__VLS_62.slots);
// @ts-ignore
[];
var __VLS_62;
var __VLS_63;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
