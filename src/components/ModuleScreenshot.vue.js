/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
const { defineProps, } = {};
const props = defineProps();
const lightboxOpen = ref(false);
const imageError = ref(false);
const expectedFileName = computed(() => `${props.module.id}.png`);
const imageSrc = computed(() => {
    return props.module.screenshot?.src || `/screenshots/${props.module.id}.png`;
});
const handleImageError = () => {
    imageError.value = true;
};
// Generate realistic mockup preview headers and sample data based on module fields
const previewHeaders = computed(() => {
    if (props.module.fields && props.module.fields.length > 0) {
        return props.module.fields.slice(0, 3).map((f) => f.name);
    }
    return ['Name', 'Code / Identifier', 'Category'];
});
const previewRows = computed(() => {
    const modId = props.module.id;
    if (modId === 'mod-user') {
        return [
            { values: ['jdelacruz', 'Juan', 'dela Cruz'] },
            { values: ['msantos', 'Maria', 'Santos'] },
            { values: ['rreyes', 'Robert', 'Reyes'] },
        ];
    }
    if (modId === 'mod-entity') {
        return [
            { values: ['GGC Corporate Holdings Corp.', 'GGC-CORP'] },
            { values: ['GGC Retail Solutions Inc.', 'GGC-RETL'] },
            { values: ['GGC Logistics & Transport', 'GGC-LOG'] },
        ];
    }
    if (modId === 'mod-branch') {
        return [
            { values: ['Main Head Office', 'BR-001', 'GGC-CORP'] },
            { values: ['Cebu Regional Hub', 'BR-002', 'GGC-CORP'] },
            { values: ['Davao Operations Center', 'BR-003', 'GGC-RETL'] },
        ];
    }
    if (modId === 'mod-departments') {
        return [
            { values: ['Human Resources Department', 'HRD'] },
            { values: ['Information Technology', 'ITD'] },
            { values: ['Finance & Accounting', 'FIN'] },
        ];
    }
    if (modId === 'mod-division') {
        return [
            { values: ['Talent Acquisition & Staffing', 'Human Resources Department'] },
            { values: ['Compensation & Benefits', 'Human Resources Department'] },
            { values: ['Core Infrastructure & DevOps', 'Information Technology'] },
        ];
    }
    if (modId === 'mod-position') {
        return [
            { values: ['Executive Director', '1'] },
            { values: ['Department Manager', '3'] },
            { values: ['Senior Technical Lead', '5'] },
        ];
    }
    if (modId === 'mod-job-title') {
        return [
            { values: ['Lead Software Engineer', 'Senior Technical Lead', 'Core platform development'] },
            { values: ['Senior HR Specialist', 'Senior Technical Lead', 'Labor relations & audits'] },
            { values: ['Payroll Accountant', 'Associate Specialist', 'Payroll verification'] },
        ];
    }
    if (modId === 'mod-user-access') {
        return [
            { values: ['Juan dela Cruz (Admin)', 'Direct Grants: 12 capabilities', 'HR Operations'] },
            { values: ['Maria Santos (HR Specialist)', 'Direct Grants: 5 capabilities', 'Employee Management'] },
            { values: ['Robert Reyes (Auditor)', 'Direct Grants: 3 capabilities', 'Audit Logs Read'] },
        ];
    }
    return [
        { values: ['Super Admin', 'Full Access Matrix', '9 Groups Enabled'] },
        { values: ['HR Administrator', 'Standard HR Matrix', '7 Groups Enabled'] },
        { values: ['Department Approver', 'Approval Pipeline Matrix', '3 Groups Enabled'] },
    ];
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(lightboxOpen, {});
// @ts-ignore
__VLS_withDotValue(imageError, {});
// @ts-ignore
__VLS_withDotValue(previewRows, {});
void {};
/** @type {__VLS_StyleScopedClasses['screenshot-frame']} */ ;
/** @type {__VLS_StyleScopedClasses['screenshot-frame']} */ ;
/** @type {__VLS_StyleScopedClasses['screenshot-hover-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['mockup-table']} */ ;
if (__VLS_ctx.module.screenshot) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "module-screenshot-section mb-6" },
    });
    /** @type {__VLS_StyleScopedClasses['module-screenshot-section']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center justify-space-between mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-subtitle-1 font-weight-bold text-uppercase text-caption text-primary" },
    });
    /** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        size: "x-small", variant: "tonal", color: "primary", ...{ class: "font-weight-medium" },
    }));
    const __VLS_2 = __VLS_1({
        size: "x-small",
        variant: "tonal",
        color: "primary",
        ...{ class: "font-weight-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        // @ts-ignore
        start: true, icon: "mdi-magnify-plus-outline", size: "14",
    }));
    const __VLS_8 = __VLS_7({
        start: true,
        icon: "mdi-magnify-plus-outline",
        size: "14",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [module,];
    var __VLS_3;
    let __VLS_11;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        // @ts-ignore
        ...{ 'onClick': {} }, ...{ class: "screenshot-frame rounded-xl border overflow-hidden cursor-pointer position-relative elevation-1" },
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        ...{ class: "screenshot-frame rounded-xl border overflow-hidden cursor-pointer position-relative elevation-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_16;
    const __VLS_17 = {
        /** @type {typeof __VLS_16.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.module.screenshot))
                throw 0;
            return (lightboxOpen.value = true);
            // @ts-ignore
            [lightboxOpen,];
        },
    };
    void __VLS_17;
    /** @type {__VLS_StyleScopedClasses['screenshot-frame']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
    const { default: __VLS_18 } = __VLS_nonNull(__VLS_14.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "window-bar px-4 py-2 bg-surface-variant d-flex align-center justify-space-between border-b" },
    });
    /** @type {__VLS_StyleScopedClasses['window-bar']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface-variant']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "window-dot bg-error" },
    });
    /** @type {__VLS_StyleScopedClasses['window-dot']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-error']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "window-dot bg-warning" },
    });
    /** @type {__VLS_StyleScopedClasses['window-dot']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-warning']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "window-dot bg-success" },
    });
    /** @type {__VLS_StyleScopedClasses['window-dot']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-success']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-caption font-weight-medium ml-2 text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.module.route);
    (__VLS_ctx.module.screenshot.viewTitle);
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        // @ts-ignore
        size: "x-small", variant: "text", color: "medium-emphasis",
    }));
    const __VLS_21 = __VLS_20({
        size: "x-small",
        variant: "text",
        color: "medium-emphasis",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_nonNull(__VLS_22.slots);
    // @ts-ignore
    [module, module,];
    var __VLS_22;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "screenshot-content bg-background position-relative" },
    });
    /** @type {__VLS_StyleScopedClasses['screenshot-content']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
    /** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
    if (!imageError.value) {
        let __VLS_25;
        /** @ts-ignore @type { | typeof __VLS_components.vImg | typeof __VLS_components.VImg | typeof __VLS_components['v-img'] | typeof __VLS_components.vImg | typeof __VLS_components.VImg | typeof __VLS_components['v-img']} */
        vImg;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
            // @ts-ignore
            ...{ 'onError': {} }, src: (__VLS_unwrap(imageSrc, {})), alt: (__VLS_ctx.module.screenshot.alt), cover: true, maxHeight: "420", ...{ class: "screenshot-image" },
        }));
        const __VLS_27 = __VLS_26({
            ...{ 'onError': {} },
            src: (__VLS_unwrap(imageSrc, {})),
            alt: (__VLS_ctx.module.screenshot.alt),
            cover: true,
            maxHeight: "420",
            ...{ class: "screenshot-image" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        let __VLS_30;
        const __VLS_31 = {
            /** @type {typeof __VLS_30.error} */
            onError: (__VLS_unwrap(handleImageError, {})),
        };
        void __VLS_31;
        /** @type {__VLS_StyleScopedClasses['screenshot-image']} */ ;
        const { default: __VLS_32 } = __VLS_nonNull(__VLS_28.slots);
        {
            const { placeholder: __VLS_33 } = __VLS_nonNull(__VLS_28.slots);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "d-flex align-center justify-center fill-height bg-surface-variant" },
            });
            /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['fill-height']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-surface-variant']} */ ;
            let __VLS_34;
            /** @ts-ignore @type { | typeof __VLS_components.vProgressCircular | typeof __VLS_components.VProgressCircular | typeof __VLS_components['v-progress-circular']} */
            vProgressCircular;
            // @ts-ignore
            const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
                // @ts-ignore
                indeterminate: true, color: "primary", size: "32",
            }));
            const __VLS_36 = __VLS_35({
                indeterminate: true,
                color: "primary",
                size: "32",
            }, ...__VLS_functionalComponentArgsRest(__VLS_35));
            // @ts-ignore
            [module, imageError, imageSrc, handleImageError,];
        }
        // @ts-ignore
        [];
        var __VLS_28;
        var __VLS_29;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mockup-container pa-4 pa-md-6" },
        });
        /** @type {__VLS_StyleScopedClasses['mockup-container']} */ ;
        /** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['pa-md-6']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mockup-header d-flex flex-wrap align-center justify-space-between ga-3 mb-4" },
        });
        /** @type {__VLS_StyleScopedClasses['mockup-header']} */ ;
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-3" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
        let __VLS_39;
        /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
        vIcon;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
            // @ts-ignore
            icon: (__VLS_ctx.module.icon), color: "primary", size: "28",
        }));
        const __VLS_41 = __VLS_40({
            icon: (__VLS_ctx.module.icon),
            color: "primary",
            size: "28",
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-subtitle-1 font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.module.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-caption text-medium-emphasis" },
        });
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
        (__VLS_ctx.module.route);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-2 flex-wrap" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
        let __VLS_44;
        /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
        vTextField;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
            // @ts-ignore
            density: "compact", variant: "outlined", placeholder: "Filter records...", prependInnerIcon: "mdi-magnify", hideDetails: true, readonly: true, ...{ style: {} },
        }));
        const __VLS_46 = __VLS_45({
            density: "compact",
            variant: "outlined",
            placeholder: "Filter records...",
            prependInnerIcon: "mdi-magnify",
            hideDetails: true,
            readonly: true,
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        let __VLS_49;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
            // @ts-ignore
            size: "small", color: "primary", variant: "flat", prependIcon: "mdi-plus", ...{ class: "text-none" },
        }));
        const __VLS_51 = __VLS_50({
            size: "small",
            color: "primary",
            variant: "flat",
            prependIcon: "mdi-plus",
            ...{ class: "text-none" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_50));
        /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
        const { default: __VLS_54 } = __VLS_nonNull(__VLS_52.slots);
        // @ts-ignore
        [module, module, module,];
        var __VLS_52;
        let __VLS_55;
        /** @ts-ignore @type { | typeof __VLS_components.vTable | typeof __VLS_components.VTable | typeof __VLS_components['v-table'] | typeof __VLS_components.vTable | typeof __VLS_components.VTable | typeof __VLS_components['v-table']} */
        vTable;
        // @ts-ignore
        const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
            // @ts-ignore
            density: "compact", ...{ class: "mockup-table rounded-lg border bg-surface" },
        }));
        const __VLS_57 = __VLS_56({
            density: "compact",
            ...{ class: "mockup-table rounded-lg border bg-surface" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_56));
        /** @type {__VLS_StyleScopedClasses['mockup-table']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
        const { default: __VLS_60 } = __VLS_nonNull(__VLS_58.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            ...{ class: "bg-surface-variant" },
        });
        /** @type {__VLS_StyleScopedClasses['bg-surface-variant']} */ ;
        const __VLS_61 = __VLS_tryAsConstant((__VLS_unwrap(previewHeaders, {})));
        for (const [field] of __VLS_vFor(__VLS_nonNull(__VLS_61))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
                key: (field),
                ...{ class: "text-caption font-weight-bold" },
            });
            /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
            (field);
            // @ts-ignore
            [previewHeaders,];
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
            ...{ class: "text-caption font-weight-bold text-center" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
            ...{ class: "text-caption font-weight-bold text-end" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-end']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
        const __VLS_62 = __VLS_tryAsConstant((previewRows.value));
        for (const [row, idx] of __VLS_vFor(__VLS_nonNull(__VLS_62))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
                key: (idx),
            });
            const __VLS_63 = __VLS_tryAsConstant((row.values));
            for (const [val, vIdx] of __VLS_vFor(__VLS_nonNull(__VLS_63))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                    key: (vIdx),
                    ...{ class: "text-caption" },
                });
                /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
                (val);
                // @ts-ignore
                [previewRows,];
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                ...{ class: "text-center" },
            });
            /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
            let __VLS_64;
            /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
            vChip;
            // @ts-ignore
            const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
                // @ts-ignore
                size: "x-small", color: "success", variant: "flat",
            }));
            const __VLS_66 = __VLS_65({
                size: "x-small",
                color: "success",
                variant: "flat",
            }, ...__VLS_functionalComponentArgsRest(__VLS_65));
            const { default: __VLS_69 } = __VLS_nonNull(__VLS_67.slots);
            // @ts-ignore
            [];
            var __VLS_67;
            __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                ...{ class: "text-end" },
            });
            /** @type {__VLS_StyleScopedClasses['text-end']} */ ;
            let __VLS_70;
            /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
            vIcon;
            // @ts-ignore
            const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
                // @ts-ignore
                icon: "mdi-pencil-outline", size: "16", ...{ class: "mr-2 text-primary" },
            }));
            const __VLS_72 = __VLS_71({
                icon: "mdi-pencil-outline",
                size: "16",
                ...{ class: "mr-2 text-primary" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_71));
            /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
            let __VLS_75;
            /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
            vIcon;
            // @ts-ignore
            const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
                // @ts-ignore
                icon: "mdi-dots-vertical", size: "16", ...{ class: "text-medium-emphasis" },
            }));
            const __VLS_77 = __VLS_76({
                icon: "mdi-dots-vertical",
                size: "16",
                ...{ class: "text-medium-emphasis" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_76));
            /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_58;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center justify-space-between mt-3 text-caption text-medium-emphasis" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (previewRows.value.length);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_80;
        /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
        vChip;
        // @ts-ignore
        const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
            // @ts-ignore
            size: "x-small", variant: "tonal",
        }));
        const __VLS_82 = __VLS_81({
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_81));
        const { default: __VLS_85 } = __VLS_nonNull(__VLS_83.slots);
        // @ts-ignore
        [previewRows,];
        var __VLS_83;
        let __VLS_86;
        /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
        vChip;
        // @ts-ignore
        const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
            // @ts-ignore
            size: "x-small", variant: "text",
        }));
        const __VLS_88 = __VLS_87({
            size: "x-small",
            variant: "text",
        }, ...__VLS_functionalComponentArgsRest(__VLS_87));
        const { default: __VLS_91 } = __VLS_nonNull(__VLS_89.slots);
        // @ts-ignore
        [];
        var __VLS_89;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "screenshot-hover-overlay d-flex align-center justify-center" },
    });
    /** @type {__VLS_StyleScopedClasses['screenshot-hover-overlay']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    let __VLS_92;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
        // @ts-ignore
        color: "white", variant: "flat", ...{ class: "text-primary font-weight-bold" },
    }));
    const __VLS_94 = __VLS_93({
        color: "white",
        variant: "flat",
        ...{ class: "text-primary font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_97 } = __VLS_nonNull(__VLS_95.slots);
    let __VLS_98;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
        // @ts-ignore
        start: true, icon: "mdi-arrow-expand",
    }));
    const __VLS_100 = __VLS_99({
        start: true,
        icon: "mdi-arrow-expand",
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    // @ts-ignore
    [];
    var __VLS_95;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "px-4 py-3 bg-surface border-t d-flex align-start justify-space-between ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2 text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    let __VLS_103;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
        // @ts-ignore
        icon: "mdi-image-outline", size: "16", color: "primary",
    }));
    const __VLS_105 = __VLS_104({
        icon: "mdi-image-outline",
        size: "16",
        color: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_104));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.module.screenshot.caption);
    if (imageError.value) {
        let __VLS_108;
        /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
        vChip;
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
            // @ts-ignore
            size: "x-small", variant: "outlined", color: "info",
        }));
        const __VLS_110 = __VLS_109({
            size: "x-small",
            variant: "outlined",
            color: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_109));
        const { default: __VLS_113 } = __VLS_nonNull(__VLS_111.slots);
        (__VLS_unwrap(expectedFileName, {}));
        // @ts-ignore
        [module, imageError, expectedFileName,];
        var __VLS_111;
    }
    // @ts-ignore
    [];
    var __VLS_14;
    var __VLS_15;
    let __VLS_114;
    /** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
    vDialog;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
        // @ts-ignore
        modelValue: (lightboxOpen.value), maxWidth: "1100", scrollable: true,
    }));
    const __VLS_116 = __VLS_115({
        modelValue: (lightboxOpen.value),
        maxWidth: "1100",
        scrollable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    const { default: __VLS_119 } = __VLS_nonNull(__VLS_117.slots);
    let __VLS_120;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
        // @ts-ignore
        ...{ class: "rounded-xl overflow-hidden" },
    }));
    const __VLS_122 = __VLS_121({
        ...{ class: "rounded-xl overflow-hidden" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_121));
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    const { default: __VLS_125 } = __VLS_nonNull(__VLS_123.slots);
    let __VLS_126;
    /** @ts-ignore @type { | typeof __VLS_components.vToolbar | typeof __VLS_components.VToolbar | typeof __VLS_components['v-toolbar'] | typeof __VLS_components.vToolbar | typeof __VLS_components.VToolbar | typeof __VLS_components['v-toolbar']} */
    vToolbar;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
        // @ts-ignore
        color: "primary", density: "comfortable", ...{ class: "text-white" },
    }));
    const __VLS_128 = __VLS_127({
        color: "primary",
        density: "comfortable",
        ...{ class: "text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    const { default: __VLS_131 } = __VLS_nonNull(__VLS_129.slots);
    let __VLS_132;
    /** @ts-ignore @type { | typeof __VLS_components.vToolbarTitle | typeof __VLS_components.VToolbarTitle | typeof __VLS_components['v-toolbar-title'] | typeof __VLS_components.vToolbarTitle | typeof __VLS_components.VToolbarTitle | typeof __VLS_components['v-toolbar-title']} */
    vToolbarTitle;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
        // @ts-ignore
        ...{ class: "text-subtitle-1 font-weight-bold" },
    }));
    const __VLS_134 = __VLS_133({
        ...{ class: "text-subtitle-1 font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    /** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_137 } = __VLS_nonNull(__VLS_135.slots);
    (__VLS_ctx.module.num);
    (__VLS_ctx.module.title);
    // @ts-ignore
    [module, module, lightboxOpen,];
    var __VLS_135;
    let __VLS_138;
    /** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
    vSpacer;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
    // @ts-ignore
    }));
    const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
    let __VLS_143;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({
        // @ts-ignore
        ...{ 'onClick': {} }, icon: "mdi-close", variant: "text",
    }));
    const __VLS_145 = __VLS_144({
        ...{ 'onClick': {} },
        icon: "mdi-close",
        variant: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_144));
    let __VLS_148;
    const __VLS_149 = {
        /** @type {typeof __VLS_148.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.module.screenshot))
                throw 0;
            return (lightboxOpen.value = false);
            // @ts-ignore
            [lightboxOpen,];
        },
    };
    void __VLS_149;
    var __VLS_146;
    var __VLS_147;
    // @ts-ignore
    [];
    var __VLS_129;
    let __VLS_150;
    /** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
    vCardText;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
        // @ts-ignore
        ...{ class: "pa-4 bg-background" },
    }));
    const __VLS_152 = __VLS_151({
        ...{ class: "pa-4 bg-background" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    /** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
    const { default: __VLS_155 } = __VLS_nonNull(__VLS_153.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-3 text-body-2 text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.module.screenshot.caption);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-lg border overflow-hidden bg-surface" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    if (!imageError.value) {
        let __VLS_156;
        /** @ts-ignore @type { | typeof __VLS_components.vImg | typeof __VLS_components.VImg | typeof __VLS_components['v-img']} */
        vImg;
        // @ts-ignore
        const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
            // @ts-ignore
            src: (__VLS_unwrap(imageSrc, {})), alt: (__VLS_ctx.module.screenshot.alt), ...{ class: "w-100" },
        }));
        const __VLS_158 = __VLS_157({
            src: (__VLS_unwrap(imageSrc, {})),
            alt: (__VLS_ctx.module.screenshot.alt),
            ...{ class: "w-100" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_157));
        /** @type {__VLS_StyleScopedClasses['w-100']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "pa-6" },
        });
        /** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center justify-space-between mb-4" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-3" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
        let __VLS_161;
        /** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
        vAvatar;
        // @ts-ignore
        const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({
            // @ts-ignore
            color: "primary", size: "36", ...{ class: "text-white font-weight-bold" },
        }));
        const __VLS_163 = __VLS_162({
            color: "primary",
            size: "36",
            ...{ class: "text-white font-weight-bold" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_162));
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        const { default: __VLS_166 } = __VLS_nonNull(__VLS_164.slots);
        (__VLS_ctx.module.num);
        // @ts-ignore
        [module, module, module, imageError, imageSrc,];
        var __VLS_164;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "text-h6 font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.module.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-caption text-medium-emphasis" },
        });
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
        (__VLS_ctx.module.route);
        let __VLS_167;
        /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
        vChip;
        // @ts-ignore
        const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({
            // @ts-ignore
            color: "success", size: "small", variant: "flat",
        }));
        const __VLS_169 = __VLS_168({
            color: "success",
            size: "small",
            variant: "flat",
        }, ...__VLS_functionalComponentArgsRest(__VLS_168));
        const { default: __VLS_172 } = __VLS_nonNull(__VLS_170.slots);
        // @ts-ignore
        [module, module,];
        var __VLS_170;
        let __VLS_173;
        /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
        vAlert;
        // @ts-ignore
        const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
            // @ts-ignore
            color: "info", variant: "tonal", density: "compact", ...{ class: "mb-4" },
        }));
        const __VLS_175 = __VLS_174({
            color: "info",
            variant: "tonal",
            density: "compact",
            ...{ class: "mb-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_174));
        /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
        const { default: __VLS_178 } = __VLS_nonNull(__VLS_176.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_unwrap(expectedFileName, {}));
        __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
        // @ts-ignore
        [expectedFileName,];
        var __VLS_176;
        let __VLS_179;
        /** @ts-ignore @type { | typeof __VLS_components.vTable | typeof __VLS_components.VTable | typeof __VLS_components['v-table'] | typeof __VLS_components.vTable | typeof __VLS_components.VTable | typeof __VLS_components['v-table']} */
        vTable;
        // @ts-ignore
        const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({
            // @ts-ignore
            density: "comfortable", ...{ class: "border rounded-lg" },
        }));
        const __VLS_181 = __VLS_180({
            density: "comfortable",
            ...{ class: "border rounded-lg" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_180));
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        const { default: __VLS_184 } = __VLS_nonNull(__VLS_182.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            ...{ class: "bg-surface-variant" },
        });
        /** @type {__VLS_StyleScopedClasses['bg-surface-variant']} */ ;
        const __VLS_185 = __VLS_tryAsConstant((__VLS_unwrap(previewHeaders, {})));
        for (const [field] of __VLS_vFor(__VLS_nonNull(__VLS_185))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
                key: (field),
                ...{ class: "font-weight-bold" },
            });
            /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
            (field);
            // @ts-ignore
            [previewHeaders,];
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
            ...{ class: "font-weight-bold text-center" },
        });
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
            ...{ class: "font-weight-bold text-end" },
        });
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-end']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
        const __VLS_186 = __VLS_tryAsConstant((previewRows.value));
        for (const [row, idx] of __VLS_vFor(__VLS_nonNull(__VLS_186))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
                key: (idx),
            });
            const __VLS_187 = __VLS_tryAsConstant((row.values));
            for (const [val, vIdx] of __VLS_vFor(__VLS_nonNull(__VLS_187))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                    key: (vIdx),
                });
                (val);
                // @ts-ignore
                [previewRows,];
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                ...{ class: "text-center" },
            });
            /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
            let __VLS_188;
            /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
            vChip;
            // @ts-ignore
            const __VLS_189 = __VLS_asFunctionalComponent1(__VLS_188, new __VLS_188({
                // @ts-ignore
                size: "x-small", color: "success",
            }));
            const __VLS_190 = __VLS_189({
                size: "x-small",
                color: "success",
            }, ...__VLS_functionalComponentArgsRest(__VLS_189));
            const { default: __VLS_193 } = __VLS_nonNull(__VLS_191.slots);
            // @ts-ignore
            [];
            var __VLS_191;
            __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                ...{ class: "text-end" },
            });
            /** @type {__VLS_StyleScopedClasses['text-end']} */ ;
            let __VLS_194;
            /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
            vBtn;
            // @ts-ignore
            const __VLS_195 = __VLS_asFunctionalComponent1(__VLS_194, new __VLS_194({
                // @ts-ignore
                size: "x-small", variant: "text", color: "primary",
            }));
            const __VLS_196 = __VLS_195({
                size: "x-small",
                variant: "text",
                color: "primary",
            }, ...__VLS_functionalComponentArgsRest(__VLS_195));
            const { default: __VLS_199 } = __VLS_nonNull(__VLS_197.slots);
            // @ts-ignore
            [];
            var __VLS_197;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_182;
    }
    // @ts-ignore
    [];
    var __VLS_153;
    let __VLS_200;
    /** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
    vCardActions;
    // @ts-ignore
    const __VLS_201 = __VLS_asFunctionalComponent1(__VLS_200, new __VLS_200({
        // @ts-ignore
        ...{ class: "px-4 py-3 bg-surface border-t" },
    }));
    const __VLS_202 = __VLS_201({
        ...{ class: "px-4 py-3 bg-surface border-t" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_201));
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    const { default: __VLS_205 } = __VLS_nonNull(__VLS_203.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
    (__VLS_ctx.module.route);
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
    (__VLS_ctx.module.permissions.join(', '));
    let __VLS_206;
    /** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
    vSpacer;
    // @ts-ignore
    const __VLS_207 = __VLS_asFunctionalComponent1(__VLS_206, new __VLS_206({
    // @ts-ignore
    }));
    const __VLS_208 = __VLS_207({}, ...__VLS_functionalComponentArgsRest(__VLS_207));
    let __VLS_211;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
        // @ts-ignore
        ...{ 'onClick': {} }, color: "primary", variant: "flat", ...{ class: "text-none" },
    }));
    const __VLS_213 = __VLS_212({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "flat",
        ...{ class: "text-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_212));
    let __VLS_216;
    const __VLS_217 = {
        /** @type {typeof __VLS_216.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(__VLS_ctx.module.screenshot))
                throw 0;
            return (lightboxOpen.value = false);
            // @ts-ignore
            [module, module, lightboxOpen,];
        },
    };
    void __VLS_217;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    const { default: __VLS_218 } = __VLS_nonNull(__VLS_214.slots);
    // @ts-ignore
    [];
    var __VLS_214;
    var __VLS_215;
    // @ts-ignore
    [];
    var __VLS_203;
    // @ts-ignore
    [];
    var __VLS_123;
    // @ts-ignore
    [];
    var __VLS_117;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
