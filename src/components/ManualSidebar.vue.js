/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
const { defineProps, defineEmits, } = {};
const props = defineProps();
const emit = defineEmits();
const accountModules = computed(() => props.modules.filter((m) => m.category === 'Account & Access'));
const orgModules = computed(() => props.modules.filter((m) => m.category === 'Organizational Setup'));
const isFilteredOut = (mod) => {
    return !props.visibleModuleIds.has(mod.id);
};
const scrollTo = (id, pageNumber) => {
    emit('navigate', id, pageNumber);
};
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
/** @ts-ignore @type { | typeof __VLS_components.vNavigationDrawer | typeof __VLS_components.VNavigationDrawer | typeof __VLS_components['v-navigation-drawer'] | typeof __VLS_components.vNavigationDrawer | typeof __VLS_components.VNavigationDrawer | typeof __VLS_components['v-navigation-drawer']} */
vNavigationDrawer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ 'onUpdate:modelValue': {} }, modelValue: (__VLS_ctx.modelValue), width: "320", ...{ class: "manual-drawer border-e" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.modelValue),
    width: "320",
    ...{ class: "manual-drawer border-e" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.'update:modelValue'} */
    'onUpdate:modelValue': // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('update:modelValue', $event));
        // @ts-ignore
        [modelValue, $emit,];
    },
};
void __VLS_6;
/** @type {__VLS_StyleScopedClasses['manual-drawer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-e']} */ ;
const { default: __VLS_7 } = __VLS_nonNull(__VLS_3.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pa-4 border-b" },
});
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-overline text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-overline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-body-2 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    // @ts-ignore
    density: "compact", nav: true, ...{ class: "pa-2" },
}));
const __VLS_10 = __VLS_9({
    density: "compact",
    nav: true,
    ...{ class: "pa-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['pa-2']} */ ;
const { default: __VLS_13 } = __VLS_nonNull(__VLS_11.slots);
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader'] | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader']} */
vListSubheader;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    // @ts-ignore
    ...{ class: "font-weight-bold text-uppercase text-caption text-primary" },
}));
const __VLS_16 = __VLS_15({
    ...{ class: "font-weight-bold text-uppercase text-caption text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
const { default: __VLS_19 } = __VLS_nonNull(__VLS_17.slots);
// @ts-ignore
[];
var __VLS_17;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item'] | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    // @ts-ignore
    ...{ 'onClick': {} }, prependIcon: "mdi-book-open-page-variant", title: "Introduction & Architecture", active: (__VLS_ctx.activeSection === 'intro'), color: "primary", rounded: "lg",
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    prependIcon: "mdi-book-open-page-variant",
    title: "Introduction & Architecture",
    active: (__VLS_ctx.activeSection === 'intro'),
    color: "primary",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_25;
const __VLS_26 = {
    /** @type {typeof __VLS_25.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(scrollTo, {})('intro', 1));
        // @ts-ignore
        [activeSection, scrollTo,];
    },
};
void __VLS_26;
const { default: __VLS_27 } = __VLS_nonNull(__VLS_23.slots);
{
    const { append: __VLS_28 } = __VLS_nonNull(__VLS_23.slots);
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        // @ts-ignore
        size: "x-small", variant: "flat", color: "primary", ...{ class: "font-weight-bold" },
    }));
    const __VLS_31 = __VLS_30({
        size: "x-small",
        variant: "flat",
        color: "primary",
        ...{ class: "font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_34 } = __VLS_nonNull(__VLS_32.slots);
    // @ts-ignore
    [];
    var __VLS_32;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_23;
var __VLS_24;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
vDivider;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    // @ts-ignore
    ...{ class: "my-2" },
}));
const __VLS_37 = __VLS_36({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader'] | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader']} */
vListSubheader;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    // @ts-ignore
    ...{ class: "font-weight-bold text-uppercase text-caption text-primary" },
}));
const __VLS_42 = __VLS_41({
    ...{ class: "font-weight-bold text-uppercase text-caption text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
const { default: __VLS_45 } = __VLS_nonNull(__VLS_43.slots);
// @ts-ignore
[];
var __VLS_43;
const __VLS_46 = __VLS_tryAsConstant((__VLS_unwrap(accountModules, {})));
for (const [mod] of __VLS_vFor(__VLS_nonNull(__VLS_46))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
        key: (mod.id),
    });
    let __VLS_47;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item'] | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        // @ts-ignore
        ...{ 'onClick': {} }, prependIcon: (mod.icon), title: (`${mod.num}. ${mod.title}`), active: (__VLS_ctx.activeSection === mod.id), disabled: (__VLS_unwrap(isFilteredOut, {})(mod)), color: "primary", rounded: "lg",
    }));
    const __VLS_49 = __VLS_48({
        ...{ 'onClick': {} },
        prependIcon: (mod.icon),
        title: (`${mod.num}. ${mod.title}`),
        active: (__VLS_ctx.activeSection === mod.id),
        disabled: (__VLS_unwrap(isFilteredOut, {})(mod)),
        color: "primary",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    let __VLS_52;
    const __VLS_53 = {
        /** @type {typeof __VLS_52.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_unwrap(scrollTo, {})(mod.id, mod.num + 1));
            // @ts-ignore
            [activeSection, scrollTo, accountModules, isFilteredOut,];
        },
    };
    void __VLS_53;
    const { default: __VLS_54 } = __VLS_nonNull(__VLS_50.slots);
    {
        const { append: __VLS_55 } = __VLS_nonNull(__VLS_50.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_56;
        /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
        vChip;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
            // @ts-ignore
            size: "x-small", variant: "flat", color: "info", ...{ class: "font-weight-bold" },
        }));
        const __VLS_58 = __VLS_57({
            size: "x-small",
            variant: "flat",
            color: "info",
            ...{ class: "font-weight-bold" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        const { default: __VLS_61 } = __VLS_nonNull(__VLS_59.slots);
        (mod.num + 1);
        // @ts-ignore
        [];
        var __VLS_59;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_50;
    var __VLS_51;
    // @ts-ignore
    [];
}
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
vDivider;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    // @ts-ignore
    ...{ class: "my-2" },
}));
const __VLS_64 = __VLS_63({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
let __VLS_67;
/** @ts-ignore @type { | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader'] | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader']} */
vListSubheader;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
    // @ts-ignore
    ...{ class: "font-weight-bold text-uppercase text-caption text-primary" },
}));
const __VLS_69 = __VLS_68({
    ...{ class: "font-weight-bold text-uppercase text-caption text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
const { default: __VLS_72 } = __VLS_nonNull(__VLS_70.slots);
// @ts-ignore
[];
var __VLS_70;
const __VLS_73 = __VLS_tryAsConstant((__VLS_unwrap(orgModules, {})));
for (const [mod] of __VLS_vFor(__VLS_nonNull(__VLS_73))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
        key: (mod.id),
    });
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item'] | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
        // @ts-ignore
        ...{ 'onClick': {} }, prependIcon: (mod.icon), title: (`${mod.num}. ${mod.title}`), active: (__VLS_ctx.activeSection === mod.id), disabled: (__VLS_unwrap(isFilteredOut, {})(mod)), color: "primary", rounded: "lg",
    }));
    const __VLS_76 = __VLS_75({
        ...{ 'onClick': {} },
        prependIcon: (mod.icon),
        title: (`${mod.num}. ${mod.title}`),
        active: (__VLS_ctx.activeSection === mod.id),
        disabled: (__VLS_unwrap(isFilteredOut, {})(mod)),
        color: "primary",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    let __VLS_79;
    const __VLS_80 = {
        /** @type {typeof __VLS_79.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_unwrap(scrollTo, {})(mod.id, mod.num + 1));
            // @ts-ignore
            [activeSection, scrollTo, isFilteredOut, orgModules,];
        },
    };
    void __VLS_80;
    const { default: __VLS_81 } = __VLS_nonNull(__VLS_77.slots);
    {
        const { append: __VLS_82 } = __VLS_nonNull(__VLS_77.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_83;
        /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
        vChip;
        // @ts-ignore
        const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
            // @ts-ignore
            size: "x-small", variant: "flat", color: "info", ...{ class: "font-weight-bold" },
        }));
        const __VLS_85 = __VLS_84({
            size: "x-small",
            variant: "flat",
            color: "info",
            ...{ class: "font-weight-bold" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_84));
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        const { default: __VLS_88 } = __VLS_nonNull(__VLS_86.slots);
        (mod.num + 1);
        // @ts-ignore
        [];
        var __VLS_86;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_77;
    var __VLS_78;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
