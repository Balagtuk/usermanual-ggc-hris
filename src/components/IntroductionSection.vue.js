/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { INTRO_CONTENT } from '@/data/manualData';
const { defineProps, defineEmits, } = {};
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
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
// @ts-ignore
__VLS_withDotValue(INTRO_CONTENT, {});
void {};
/** @type {__VLS_StyleScopedClasses['hover-elevation']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "intro",
    ...{ class: "introduction-section mb-8" },
});
/** @type {__VLS_StyleScopedClasses['introduction-section']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ class: "hero-card pa-6 pa-md-8 mb-8 rounded-xl text-white" }, elevation: "2", color: "primary",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "hero-card pa-6 pa-md-8 mb-8 rounded-xl text-white" },
    elevation: "2",
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-md-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-wrap align-center justify-space-between ga-3 mb-4" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center ga-2 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    size: "small", color: "white", variant: "outlined", ...{ class: "font-weight-bold" },
}));
const __VLS_8 = __VLS_7({
    size: "small",
    color: "white",
    variant: "outlined",
    ...{ class: "font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_11 } = __VLS_nonNull(__VLS_9.slots);
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    // @ts-ignore
    size: "small", color: "white", variant: "tonal",
}));
const __VLS_14 = __VLS_13({
    size: "small",
    color: "white",
    variant: "tonal",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_nonNull(__VLS_15.slots);
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    // @ts-ignore
    size: "small", color: "amber-darken-1", variant: "flat", ...{ class: "font-weight-bold text-black" },
}));
const __VLS_20 = __VLS_19({
    size: "small",
    color: "amber-darken-1",
    variant: "flat",
    ...{ class: "font-weight-bold text-black" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
const { default: __VLS_23 } = __VLS_nonNull(__VLS_21.slots);
(INTRO_CONTENT.value.version);
// @ts-ignore
[INTRO_CONTENT,];
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-caption opacity-80" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-h4 text-md-h3 font-weight-bold mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-md-h3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
(INTRO_CONTENT.value.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-1 opacity-90 max-width-text mb-6" },
});
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-90']} */ ;
/** @type {__VLS_StyleScopedClasses['max-width-text']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
(INTRO_CONTENT.value.subtitle);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-wrap ga-3" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    // @ts-ignore
    ...{ 'onClick': {} }, color: "white", variant: "flat", ...{ class: "text-primary font-weight-bold text-none" }, prependIcon: "mdi-arrow-right-circle",
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    color: "white",
    variant: "flat",
    ...{ class: "text-primary font-weight-bold text-none" },
    prependIcon: "mdi-arrow-right-circle",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
const __VLS_30 = {
    /** @type {typeof __VLS_29.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_ctx.$emit('start-tour'));
        // @ts-ignore
        [INTRO_CONTENT, INTRO_CONTENT, $emit,];
    },
};
void __VLS_30;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_31 } = __VLS_nonNull(__VLS_27.slots);
// @ts-ignore
[];
var __VLS_27;
var __VLS_28;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    // @ts-ignore
    ...{ 'onClick': {} }, color: "white", variant: "outlined", ...{ class: "text-none font-weight-bold" }, prependIcon: "mdi-format-list-checks",
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    color: "white",
    variant: "outlined",
    ...{ class: "text-none font-weight-bold" },
    prependIcon: "mdi-format-list-checks",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
const __VLS_38 = {
    /** @type {typeof __VLS_37.click} */
    onClick: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (__VLS_unwrap(scrollTo, {})('sec-checklist'));
        // @ts-ignore
        [scrollTo,];
    },
};
void __VLS_38;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_39 } = __VLS_nonNull(__VLS_35.slots);
// @ts-ignore
[];
var __VLS_35;
var __VLS_36;
// @ts-ignore
[];
var __VLS_3;
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    // @ts-ignore
    ...{ class: "pa-6 rounded-xl border mb-8" }, elevation: "0",
}));
const __VLS_42 = __VLS_41({
    ...{ class: "pa-6 rounded-xl border mb-8" },
    elevation: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
const { default: __VLS_45 } = __VLS_nonNull(__VLS_43.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center mb-4" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    // @ts-ignore
    color: "primary", variant: "tonal", size: "40", ...{ class: "mr-3" },
}));
const __VLS_48 = __VLS_47({
    color: "primary",
    variant: "tonal",
    size: "40",
    ...{ class: "mr-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
const { default: __VLS_51 } = __VLS_nonNull(__VLS_49.slots);
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    // @ts-ignore
    icon: "mdi-account-group", size: "22",
}));
const __VLS_54 = __VLS_53({
    icon: "mdi-account-group",
    size: "22",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
// @ts-ignore
[];
var __VLS_49;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-2 text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
// @ts-ignore
}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_nonNull(__VLS_60.slots);
const __VLS_63 = __VLS_tryAsConstant((INTRO_CONTENT.value.targetAudience));
for (const [aud] of __VLS_vFor(__VLS_nonNull(__VLS_63))) {
    let __VLS_64;
    /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
    vCol;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
        // @ts-ignore
        key: (aud.role), cols: "12", md: "4",
    }));
    const __VLS_66 = __VLS_65({
        key: (aud.role),
        cols: "12",
        md: "4",
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    const { default: __VLS_69 } = __VLS_nonNull(__VLS_67.slots);
    let __VLS_70;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        // @ts-ignore
        ...{ class: "pa-4 h-100 rounded-lg border bg-surface-variant" }, elevation: "0",
    }));
    const __VLS_72 = __VLS_71({
        ...{ class: "pa-4 h-100 rounded-lg border bg-surface-variant" },
        elevation: "0",
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    /** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface-variant']} */ ;
    const { default: __VLS_75 } = __VLS_nonNull(__VLS_73.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-3 mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
    vAvatar;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        // @ts-ignore
        color: "primary", size: "32", ...{ class: "text-white" },
    }));
    const __VLS_78 = __VLS_77({
        color: "primary",
        size: "32",
        ...{ class: "text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    const { default: __VLS_81 } = __VLS_nonNull(__VLS_79.slots);
    let __VLS_82;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
        // @ts-ignore
        icon: (aud.icon), size: "18",
    }));
    const __VLS_84 = __VLS_83({
        icon: (aud.icon),
        size: "18",
    }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    // @ts-ignore
    [INTRO_CONTENT,];
    var __VLS_79;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-subtitle-2 font-weight-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    (aud.role);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-caption text-medium-emphasis mb-0 leading-relaxed" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    (aud.description);
    // @ts-ignore
    [];
    var __VLS_73;
    // @ts-ignore
    [];
    var __VLS_67;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_60;
// @ts-ignore
[];
var __VLS_43;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    // @ts-ignore
    ...{ class: "pa-6 rounded-xl border mb-8" }, elevation: "0",
}));
const __VLS_89 = __VLS_88({
    ...{ class: "pa-6 rounded-xl border mb-8" },
    elevation: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
const { default: __VLS_92 } = __VLS_nonNull(__VLS_90.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center mb-3" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    // @ts-ignore
    color: "info", variant: "tonal", size: "40", ...{ class: "mr-3" },
}));
const __VLS_95 = __VLS_94({
    color: "info",
    variant: "tonal",
    size: "40",
    ...{ class: "mr-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
const { default: __VLS_98 } = __VLS_nonNull(__VLS_96.slots);
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    // @ts-ignore
    icon: "mdi-sitemap", size: "22",
}));
const __VLS_101 = __VLS_100({
    icon: "mdi-sitemap",
    size: "22",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
// @ts-ignore
[];
var __VLS_96;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-2 text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pa-4 rounded-lg bg-surface-variant d-flex flex-wrap align-center ga-2 justify-center mb-6" },
});
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-variant']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
const __VLS_104 = __VLS_tryAsConstant((INTRO_CONTENT.value.hierarchyFlow));
for (const [step, sIdx] of __VLS_vFor(__VLS_nonNull(__VLS_104))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
        key: (step.step),
    });
    let __VLS_105;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
        // @ts-ignore
        color: (sIdx === 0 ? 'primary' : 'primary'), variant: (sIdx === 0 ? 'flat' : 'tonal'), ...{ class: "font-weight-medium" }, prependIcon: (step.icon),
    }));
    const __VLS_107 = __VLS_106({
        color: (sIdx === 0 ? 'primary' : 'primary'),
        variant: (sIdx === 0 ? 'flat' : 'tonal'),
        ...{ class: "font-weight-medium" },
        prependIcon: (step.icon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    /** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
    const { default: __VLS_110 } = __VLS_nonNull(__VLS_108.slots);
    (step.step);
    (step.name);
    // @ts-ignore
    [INTRO_CONTENT,];
    var __VLS_108;
    if (sIdx < INTRO_CONTENT.value.hierarchyFlow.length - 1) {
        let __VLS_111;
        /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
        vIcon;
        // @ts-ignore
        const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
            // @ts-ignore
            icon: "mdi-arrow-right", size: "16", ...{ class: "text-medium-emphasis" },
        }));
        const __VLS_113 = __VLS_112({
            icon: "mdi-arrow-right",
            size: "16",
            ...{ class: "text-medium-emphasis" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_112));
        /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    }
    // @ts-ignore
    [INTRO_CONTENT,];
}
let __VLS_116;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
// @ts-ignore
}));
const __VLS_118 = __VLS_117({}, ...__VLS_functionalComponentArgsRest(__VLS_117));
const { default: __VLS_121 } = __VLS_nonNull(__VLS_119.slots);
const __VLS_122 = __VLS_tryAsConstant((INTRO_CONTENT.value.hierarchyFlow));
for (const [step] of __VLS_vFor(__VLS_nonNull(__VLS_122))) {
    let __VLS_123;
    /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
    vCol;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
        // @ts-ignore
        key: (step.step), cols: "12", sm: "6", md: "3",
    }));
    const __VLS_125 = __VLS_124({
        key: (step.step),
        cols: "12",
        sm: "6",
        md: "3",
    }, ...__VLS_functionalComponentArgsRest(__VLS_124));
    const { default: __VLS_128 } = __VLS_nonNull(__VLS_126.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pa-3 rounded-lg border bg-surface h-100" },
    });
    /** @type {__VLS_StyleScopedClasses['pa-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-100']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2 mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
    vAvatar;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        // @ts-ignore
        color: "primary", size: "24", ...{ class: "text-caption font-weight-bold text-white" },
    }));
    const __VLS_131 = __VLS_130({
        color: "primary",
        size: "24",
        ...{ class: "text-caption font-weight-bold text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    const { default: __VLS_134 } = __VLS_nonNull(__VLS_132.slots);
    (step.step);
    // @ts-ignore
    [INTRO_CONTENT,];
    var __VLS_132;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-subtitle-2 font-weight-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    (step.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-caption text-medium-emphasis mb-0" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
    (step.desc);
    // @ts-ignore
    [];
    var __VLS_126;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_119;
// @ts-ignore
[];
var __VLS_90;
let __VLS_135;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
    // @ts-ignore
    ...{ class: "pa-6 rounded-xl border mb-8" }, elevation: "0",
}));
const __VLS_137 = __VLS_136({
    ...{ class: "pa-6 rounded-xl border mb-8" },
    elevation: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_136));
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
const { default: __VLS_140 } = __VLS_nonNull(__VLS_138.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center mb-4" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_141;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
    // @ts-ignore
    color: "success", variant: "tonal", size: "40", ...{ class: "mr-3" },
}));
const __VLS_143 = __VLS_142({
    color: "success",
    variant: "tonal",
    size: "40",
    ...{ class: "mr-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
const { default: __VLS_146 } = __VLS_nonNull(__VLS_144.slots);
let __VLS_147;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
    // @ts-ignore
    icon: "mdi-shield-check", size: "22",
}));
const __VLS_149 = __VLS_148({
    icon: "mdi-shield-check",
    size: "22",
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
// @ts-ignore
[];
var __VLS_144;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-2 text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
let __VLS_152;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_153 = __VLS_asFunctionalComponent1(__VLS_152, new __VLS_152({
// @ts-ignore
}));
const __VLS_154 = __VLS_153({}, ...__VLS_functionalComponentArgsRest(__VLS_153));
const { default: __VLS_157 } = __VLS_nonNull(__VLS_155.slots);
const __VLS_158 = __VLS_tryAsConstant((INTRO_CONTENT.value.corePrinciples));
for (const [rule] of __VLS_vFor(__VLS_nonNull(__VLS_158))) {
    let __VLS_159;
    /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
    vCol;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
        // @ts-ignore
        key: (rule.title), cols: "12", md: "6",
    }));
    const __VLS_161 = __VLS_160({
        key: (rule.title),
        cols: "12",
        md: "6",
    }, ...__VLS_functionalComponentArgsRest(__VLS_160));
    const { default: __VLS_164 } = __VLS_nonNull(__VLS_162.slots);
    let __VLS_165;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
        // @ts-ignore
        ...{ class: "pa-4 h-100 rounded-lg border bg-surface" }, elevation: "0",
    }));
    const __VLS_167 = __VLS_166({
        ...{ class: "pa-4 h-100 rounded-lg border bg-surface" },
        elevation: "0",
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    /** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    const { default: __VLS_170 } = __VLS_nonNull(__VLS_168.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-3 mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    let __VLS_171;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
        // @ts-ignore
        icon: (rule.icon), color: "primary", size: "22",
    }));
    const __VLS_173 = __VLS_172({
        icon: (rule.icon),
        color: "primary",
        size: "22",
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-subtitle-2 font-weight-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    (rule.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-caption text-medium-emphasis mb-0 leading-relaxed" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    (rule.text);
    // @ts-ignore
    [INTRO_CONTENT,];
    var __VLS_168;
    // @ts-ignore
    [];
    var __VLS_162;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_155;
// @ts-ignore
[];
var __VLS_138;
let __VLS_176;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent1(__VLS_176, new __VLS_176({
    // @ts-ignore
    id: "sec-checklist", ...{ class: "pa-6 rounded-xl border mb-8" }, elevation: "0",
}));
const __VLS_178 = __VLS_177({
    id: "sec-checklist",
    ...{ class: "pa-6 rounded-xl border mb-8" },
    elevation: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
const { default: __VLS_181 } = __VLS_nonNull(__VLS_179.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center mb-4" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_182;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent1(__VLS_182, new __VLS_182({
    // @ts-ignore
    color: "warning", variant: "tonal", size: "40", ...{ class: "mr-3" },
}));
const __VLS_184 = __VLS_183({
    color: "warning",
    variant: "tonal",
    size: "40",
    ...{ class: "mr-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
const { default: __VLS_187 } = __VLS_nonNull(__VLS_185.slots);
let __VLS_188;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_189 = __VLS_asFunctionalComponent1(__VLS_188, new __VLS_188({
    // @ts-ignore
    icon: "mdi-checkbox-marked-circle-outline", size: "22",
}));
const __VLS_190 = __VLS_189({
    icon: "mdi-checkbox-marked-circle-outline",
    size: "22",
}, ...__VLS_functionalComponentArgsRest(__VLS_189));
// @ts-ignore
[];
var __VLS_185;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-2 text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
let __VLS_193;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({
    // @ts-ignore
    density: "compact", ...{ class: "border rounded-lg bg-surface" },
}));
const __VLS_195 = __VLS_194({
    density: "compact",
    ...{ class: "border rounded-lg bg-surface" },
}, ...__VLS_functionalComponentArgsRest(__VLS_194));
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
const { default: __VLS_198 } = __VLS_nonNull(__VLS_196.slots);
const __VLS_199 = __VLS_tryAsConstant((INTRO_CONTENT.value.preflightChecklist));
for (const [item] of __VLS_vFor(__VLS_nonNull(__VLS_199))) {
    let __VLS_200;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item'] | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_201 = __VLS_asFunctionalComponent1(__VLS_200, new __VLS_200({
        // @ts-ignore
        key: (item.number), ...{ class: "border-b py-3" },
    }));
    const __VLS_202 = __VLS_201({
        key: (item.number),
        ...{ class: "border-b py-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_201));
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    const { default: __VLS_205 } = __VLS_nonNull(__VLS_203.slots);
    {
        const { prepend: __VLS_206 } = __VLS_nonNull(__VLS_203.slots);
        let __VLS_207;
        /** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
        vAvatar;
        // @ts-ignore
        const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
            // @ts-ignore
            color: "primary", size: "28", ...{ class: "text-caption font-weight-bold text-white mr-3" },
        }));
        const __VLS_209 = __VLS_208({
            color: "primary",
            size: "28",
            ...{ class: "text-caption font-weight-bold text-white mr-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_208));
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
        const { default: __VLS_212 } = __VLS_nonNull(__VLS_210.slots);
        (item.number);
        // @ts-ignore
        [INTRO_CONTENT,];
        var __VLS_210;
        // @ts-ignore
        [];
    }
    let __VLS_213;
    /** @ts-ignore @type { | typeof __VLS_components.vListItemTitle | typeof __VLS_components.VListItemTitle | typeof __VLS_components['v-list-item-title'] | typeof __VLS_components.vListItemTitle | typeof __VLS_components.VListItemTitle | typeof __VLS_components['v-list-item-title']} */
    vListItemTitle;
    // @ts-ignore
    const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
        // @ts-ignore
        ...{ class: "font-weight-bold text-subtitle-2" },
    }));
    const __VLS_215 = __VLS_214({
        ...{ class: "font-weight-bold text-subtitle-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_214));
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
    const { default: __VLS_218 } = __VLS_nonNull(__VLS_216.slots);
    (item.title);
    // @ts-ignore
    [];
    var __VLS_216;
    let __VLS_219;
    /** @ts-ignore @type { | typeof __VLS_components.vListItemSubtitle | typeof __VLS_components.VListItemSubtitle | typeof __VLS_components['v-list-item-subtitle'] | typeof __VLS_components.vListItemSubtitle | typeof __VLS_components.VListItemSubtitle | typeof __VLS_components['v-list-item-subtitle']} */
    vListItemSubtitle;
    // @ts-ignore
    const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
        // @ts-ignore
        ...{ class: "text-caption text-medium-emphasis mt-1" },
    }));
    const __VLS_221 = __VLS_220({
        ...{ class: "text-caption text-medium-emphasis mt-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_220));
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    const { default: __VLS_224 } = __VLS_nonNull(__VLS_222.slots);
    (item.detail);
    // @ts-ignore
    [];
    var __VLS_222;
    {
        const { append: __VLS_225 } = __VLS_nonNull(__VLS_203.slots);
        let __VLS_226;
        /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
        vIcon;
        // @ts-ignore
        const __VLS_227 = __VLS_asFunctionalComponent1(__VLS_226, new __VLS_226({
            // @ts-ignore
            icon: "mdi-check-circle-outline", color: "success", size: "20",
        }));
        const __VLS_228 = __VLS_227({
            icon: "mdi-check-circle-outline",
            color: "success",
            size: "20",
        }, ...__VLS_functionalComponentArgsRest(__VLS_227));
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_203;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_196;
// @ts-ignore
[];
var __VLS_179;
let __VLS_231;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
    // @ts-ignore
    ...{ class: "pa-6 rounded-xl border" }, elevation: "0",
}));
const __VLS_233 = __VLS_232({
    ...{ class: "pa-6 rounded-xl border" },
    elevation: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_232));
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
const { default: __VLS_236 } = __VLS_nonNull(__VLS_234.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center justify-space-between mb-4 flex-wrap ga-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-2 text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
let __VLS_237;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_238 = __VLS_asFunctionalComponent1(__VLS_237, new __VLS_237({
// @ts-ignore
}));
const __VLS_239 = __VLS_238({}, ...__VLS_functionalComponentArgsRest(__VLS_238));
const { default: __VLS_242 } = __VLS_nonNull(__VLS_240.slots);
const __VLS_243 = __VLS_tryAsConstant((__VLS_ctx.modules));
for (const [mod] of __VLS_vFor(__VLS_nonNull(__VLS_243))) {
    let __VLS_244;
    /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
    vCol;
    // @ts-ignore
    const __VLS_245 = __VLS_asFunctionalComponent1(__VLS_244, new __VLS_244({
        // @ts-ignore
        key: (mod.id), cols: "12", sm: "6", md: "4",
    }));
    const __VLS_246 = __VLS_245({
        key: (mod.id),
        cols: "12",
        sm: "6",
        md: "4",
    }, ...__VLS_functionalComponentArgsRest(__VLS_245));
    const { default: __VLS_249 } = __VLS_nonNull(__VLS_247.slots);
    let __VLS_250;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_251 = __VLS_asFunctionalComponent1(__VLS_250, new __VLS_250({
        // @ts-ignore
        ...{ 'onClick': {} }, ...{ class: "pa-4 h-100 rounded-lg border bg-surface hover-elevation cursor-pointer" }, elevation: "0",
    }));
    const __VLS_252 = __VLS_251({
        ...{ 'onClick': {} },
        ...{ class: "pa-4 h-100 rounded-lg border bg-surface hover-elevation cursor-pointer" },
        elevation: "0",
    }, ...__VLS_functionalComponentArgsRest(__VLS_251));
    let __VLS_255;
    const __VLS_256 = {
        /** @type {typeof __VLS_255.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_ctx.$emit('select-module', mod.id));
            // @ts-ignore
            [$emit, modules,];
        },
    };
    void __VLS_256;
    /** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover-elevation']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    const { default: __VLS_257 } = __VLS_nonNull(__VLS_253.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-start justify-space-between mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    let __VLS_258;
    /** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
    vAvatar;
    // @ts-ignore
    const __VLS_259 = __VLS_asFunctionalComponent1(__VLS_258, new __VLS_258({
        // @ts-ignore
        color: "primary", size: "32", ...{ class: "text-white text-caption font-weight-bold" },
    }));
    const __VLS_260 = __VLS_259({
        color: "primary",
        size: "32",
        ...{ class: "text-white text-caption font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_259));
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_263 } = __VLS_nonNull(__VLS_261.slots);
    (mod.num);
    // @ts-ignore
    [];
    var __VLS_261;
    let __VLS_264;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_265 = __VLS_asFunctionalComponent1(__VLS_264, new __VLS_264({
        // @ts-ignore
        size: "x-small", variant: "tonal", color: "primary",
    }));
    const __VLS_266 = __VLS_265({
        size: "x-small",
        variant: "tonal",
        color: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_265));
    const { default: __VLS_269 } = __VLS_nonNull(__VLS_267.slots);
    (mod.route);
    // @ts-ignore
    [];
    var __VLS_267;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-subtitle-2 font-weight-bold mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    (mod.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-caption text-medium-emphasis mb-3 line-clamp-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['line-clamp-2']} */ ;
    (mod.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center text-primary text-caption font-weight-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_270;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_271 = __VLS_asFunctionalComponent1(__VLS_270, new __VLS_270({
        // @ts-ignore
        icon: "mdi-chevron-right", size: "16", ...{ class: "ml-1" },
    }));
    const __VLS_272 = __VLS_271({
        icon: "mdi-chevron-right",
        size: "16",
        ...{ class: "ml-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_271));
    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
    // @ts-ignore
    [];
    var __VLS_253;
    var __VLS_254;
    // @ts-ignore
    [];
    var __VLS_247;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_240;
// @ts-ignore
[];
var __VLS_234;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
