/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Admin/Documents/red/User_Manual_Admin/vuetify-manual/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useTheme } from 'vuetify';
import { MANUAL_MODULES } from '@/data/manualData';
import ManualHeader from '@/components/ManualHeader.vue';
import ManualSidebar from '@/components/ManualSidebar.vue';
import IntroductionSection from '@/components/IntroductionSection.vue';
import ModuleSection from '@/components/ModuleSection.vue';
import ManualFooter from '@/components/ManualFooter.vue';
const theme = useTheme();
const drawer = ref(true);
const searchQuery = ref('');
const activeSection = ref('intro');
const viewMode = ref('paged');
const currentPage = ref(1);
const isDark = computed(() => theme.global.current.value.dark);
const toggleTheme = () => {
    theme.global.name.value = isDark.value ? 'light' : 'dark';
};
const toggleViewMode = () => {
    viewMode.value = viewMode.value === 'paged' ? 'all' : 'paged';
    if (viewMode.value === 'all') {
        nextTick(() => {
            scrollToSection(activeSection.value);
        });
    }
};
// Search and filter logic
const filteredModules = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query)
        return MANUAL_MODULES;
    return MANUAL_MODULES.filter((m) => {
        const textTarget = [
            m.title,
            m.route,
            m.description,
            m.overview,
            ...m.permissions,
            ...(m.fields?.map((f) => `${f.name} ${f.description}`) || []),
            ...(m.steps?.map((s) => `${s.title} ${s.description}`) || []),
        ].join(' ').toLowerCase();
        return textTarget.includes(query);
    });
});
const visibleModuleIds = computed(() => {
    return new Set(filteredModules.value.map((m) => m.id));
});
// Total pages: Page 1 is Introduction + each filtered module
const totalPages = computed(() => {
    return 1 + filteredModules.value.length;
});
// Determine which module is currently shown in paged mode
const currentPagedModule = computed(() => {
    if (currentPage.value <= 1)
        return undefined;
    return filteredModules.value[currentPage.value - 2];
});
// Synchronize activeSection whenever currentPage changes
watch(currentPage, (newPage) => {
    if (newPage === 1) {
        activeSection.value = 'intro';
    }
    else if (currentPagedModule.value) {
        activeSection.value = currentPagedModule.value.id;
    }
    // Smooth scroll back to top of main content when turning pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Reset to page 1 if current page exceeds total pages during searching
watch(totalPages, (newTotal) => {
    if (currentPage.value > newTotal) {
        currentPage.value = 1;
    }
});
// Titles for pagination navigation buttons
const currentPageTitle = computed(() => {
    if (currentPage.value === 1)
        return 'Chapter 1: Introduction & Architecture';
    return `${currentPagedModule.value?.num}. ${currentPagedModule.value?.title || 'Module'}`;
});
const prevPageTitle = computed(() => {
    if (currentPage.value <= 1)
        return 'None';
    if (currentPage.value === 2)
        return 'Introduction';
    const prevMod = filteredModules.value[currentPage.value - 3];
    return prevMod ? `${prevMod.num}. ${prevMod.title}` : 'Previous';
});
const nextPageTitle = computed(() => {
    if (currentPage.value >= totalPages.value)
        return 'End of Manual';
    const nextMod = filteredModules.value[currentPage.value - 1];
    return nextMod ? `${nextMod.num}. ${nextMod.title}` : 'Next';
});
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
// Sidebar or intro card navigation handler
const handleNavigation = (sectionId, pageNumber) => {
    activeSection.value = sectionId;
    if (viewMode.value === 'paged') {
        if (pageNumber !== undefined) {
            currentPage.value = pageNumber;
        }
        else if (sectionId === 'intro') {
            currentPage.value = 1;
        }
        else {
            const idx = filteredModules.value.findIndex((m) => m.id === sectionId);
            if (idx !== -1) {
                currentPage.value = idx + 2;
            }
        }
    }
    else {
        scrollToSection(sectionId);
    }
};
const onModuleSelectedFromIntro = (modId) => {
    handleNavigation(modId);
};
const scrollToSection = (id) => {
    activeSection.value = id;
    const target = document.getElementById(id);
    if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};
// Print handling: temporarily switch to continuous mode so all modules print
const handlePrint = () => {
    const previousMode = viewMode.value;
    viewMode.value = 'all';
    nextTick(() => {
        window.print();
        // Restore previous mode after print dialogue closes
        setTimeout(() => {
            viewMode.value = previousMode;
        }, 1000);
    });
};
// Keyboard arrow navigation
const handleKeyDown = (e) => {
    // Ignore arrow navigation if user is typing in an input or textarea
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
    }
    if (viewMode.value === 'paged') {
        if (e.key === 'ArrowLeft' && currentPage.value > 1) {
            goToPage(currentPage.value - 1);
        }
        else if (e.key === 'ArrowRight' && currentPage.value < totalPages.value) {
            goToPage(currentPage.value + 1);
        }
    }
};
// Scrollspy for active link tracking in continuous mode
const handleScroll = () => {
    if (viewMode.value !== 'all')
        return;
    const scrollPos = window.scrollY + 140;
    const sections = ['intro', ...MANUAL_MODULES.map((m) => m.id)];
    for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeSection.value = id;
                break;
            }
        }
    }
};
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
});
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('scroll', handleScroll);
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(drawer, {});
// @ts-ignore
__VLS_withDotValue(viewMode, {});
// @ts-ignore
__VLS_withDotValue(searchQuery, {});
// @ts-ignore
__VLS_withDotValue(filteredModules, {});
// @ts-ignore
__VLS_withDotValue(MANUAL_MODULES, {});
// @ts-ignore
__VLS_withDotValue(currentPage, {});
// @ts-ignore
__VLS_withDotValue(currentPagedModule, {});
void {};
/** @type {__VLS_StyleScopedClasses['max-content-width']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vApp | typeof __VLS_components.VApp | typeof __VLS_components['v-app'] | typeof __VLS_components.vApp | typeof __VLS_components.VApp | typeof __VLS_components['v-app']} */
vApp;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
// @ts-ignore
}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
const __VLS_6 = ManualHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    ...{ 'onToggleDrawer': {} }, ...{ 'onToggleTheme': {} }, ...{ 'onToggleViewMode': {} }, ...{ 'onTriggerPrint': {} }, searchQuery: (searchQuery.value), isDark: (__VLS_unwrap(isDark, {})), viewMode: (viewMode.value), currentPage: (currentPage.value), totalPages: (__VLS_unwrap(totalPages, {})),
}));
const __VLS_8 = __VLS_7({
    ...{ 'onToggleDrawer': {} },
    ...{ 'onToggleTheme': {} },
    ...{ 'onToggleViewMode': {} },
    ...{ 'onTriggerPrint': {} },
    searchQuery: (searchQuery.value),
    isDark: (__VLS_unwrap(isDark, {})),
    viewMode: (viewMode.value),
    currentPage: (currentPage.value),
    totalPages: (__VLS_unwrap(totalPages, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = {
    /** @type {typeof __VLS_11.toggleDrawer} */
    onToggleDrawer: // @ts-ignore
    (...[$event]) => {
        void $event;
        return (drawer.value = !drawer.value);
        // @ts-ignore
        [searchQuery, isDark, viewMode, currentPage, totalPages, drawer, drawer,];
    },
};
void __VLS_12;
const __VLS_13 = {
    /** @type {typeof __VLS_11.toggleTheme} */
    onToggleTheme: (__VLS_unwrap(toggleTheme, {})),
};
void __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_11.toggleViewMode} */
    onToggleViewMode: (__VLS_unwrap(toggleViewMode, {})),
};
void __VLS_14;
const __VLS_15 = {
    /** @type {typeof __VLS_11.triggerPrint} */
    onTriggerPrint: (__VLS_unwrap(handlePrint, {})),
};
void __VLS_15;
var __VLS_9;
var __VLS_10;
const __VLS_16 = ManualSidebar;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    // @ts-ignore
    ...{ 'onNavigate': {} }, modelValue: (drawer.value), modules: (MANUAL_MODULES.value), activeSection: (__VLS_unwrap(activeSection, {})), visibleModuleIds: (__VLS_unwrap(visibleModuleIds, {})),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onNavigate': {} },
    modelValue: (drawer.value),
    modules: (MANUAL_MODULES.value),
    activeSection: (__VLS_unwrap(activeSection, {})),
    visibleModuleIds: (__VLS_unwrap(visibleModuleIds, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = {
    /** @type {typeof __VLS_21.navigate} */
    onNavigate: (__VLS_unwrap(handleNavigation, {})),
};
void __VLS_22;
var __VLS_19;
var __VLS_20;
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.vMain | typeof __VLS_components.VMain | typeof __VLS_components['v-main'] | typeof __VLS_components.vMain | typeof __VLS_components.VMain | typeof __VLS_components['v-main']} */
vMain;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    // @ts-ignore
    ...{ class: "bg-background" },
}));
const __VLS_25 = __VLS_24({
    ...{ class: "bg-background" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
const { default: __VLS_28 } = __VLS_nonNull(__VLS_26.slots);
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    // @ts-ignore
    fluid: true, ...{ class: "max-content-width py-6 px-4 px-md-8" },
}));
const __VLS_31 = __VLS_30({
    fluid: true,
    ...{ class: "max-content-width py-6 px-4 px-md-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['max-content-width']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-md-8']} */ ;
const { default: __VLS_34 } = __VLS_nonNull(__VLS_32.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-wrap align-center justify-space-between ga-3 mb-6 no-print" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['no-print']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center ga-2 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    // @ts-ignore
    size: "small", color: "primary", variant: "tonal", ...{ class: "font-weight-medium" },
}));
const __VLS_37 = __VLS_36({
    size: "small",
    color: "primary",
    variant: "tonal",
    ...{ class: "font-weight-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
const { default: __VLS_40 } = __VLS_nonNull(__VLS_38.slots);
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    // @ts-ignore
    start: true, icon: (viewMode.value === 'paged' ? 'mdi-book-open-page-variant' : 'mdi-format-list-bulleted'), size: "16",
}));
const __VLS_43 = __VLS_42({
    start: true,
    icon: (viewMode.value === 'paged' ? 'mdi-book-open-page-variant' : 'mdi-format-list-bulleted'),
    size: "16",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
(viewMode.value === 'paged' ? 'Paged Reading' : 'Continuous Book View');
// @ts-ignore
[viewMode, viewMode, drawer, toggleTheme, toggleViewMode, handlePrint, MANUAL_MODULES, activeSection, visibleModuleIds, handleNavigation,];
var __VLS_38;
if (viewMode.value === 'paged') {
    let __VLS_46;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        // @ts-ignore
        size: "small", color: "info", variant: "flat", ...{ class: "font-weight-bold" },
    }));
    const __VLS_48 = __VLS_47({
        size: "small",
        color: "info",
        variant: "flat",
        ...{ class: "font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_51 } = __VLS_nonNull(__VLS_49.slots);
    (__VLS_unwrap(currentPageTitle, {}));
    // @ts-ignore
    [viewMode, currentPageTitle,];
    var __VLS_49;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center ga-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    // @ts-ignore
    ...{ 'onClick': {} }, size: "small", variant: "text", color: "primary", ...{ class: "text-none" }, prependIcon: "mdi-swap-horizontal",
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    size: "small",
    variant: "text",
    color: "primary",
    ...{ class: "text-none" },
    prependIcon: "mdi-swap-horizontal",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
const __VLS_58 = {
    /** @type {typeof __VLS_57.click} */
    onClick: (__VLS_unwrap(toggleViewMode, {})),
};
void __VLS_58;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_59 } = __VLS_nonNull(__VLS_55.slots);
(viewMode.value === 'paged' ? 'Continuous (All)' : 'Paged Mode');
// @ts-ignore
[viewMode, toggleViewMode,];
var __VLS_55;
var __VLS_56;
if (searchQuery.value.trim()) {
    let __VLS_60;
    /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
    vAlert;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
        // @ts-ignore
        ...{ 'onClick:close': {} }, color: "info", variant: "tonal", density: "compact", ...{ class: "mb-6 rounded-lg no-print" }, closable: true,
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick:close': {} },
        color: "info",
        variant: "tonal",
        density: "compact",
        ...{ class: "mb-6 rounded-lg no-print" },
        closable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_65;
    const __VLS_66 = {
        /** @type {typeof __VLS_65.'click:close'} */
        'onClick:close': // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(searchQuery.value.trim()))
                throw 0;
            return (searchQuery.value = '');
            // @ts-ignore
            [searchQuery, searchQuery,];
        },
    };
    void __VLS_66;
    /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['no-print']} */ ;
    const { default: __VLS_67 } = __VLS_nonNull(__VLS_63.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center justify-space-between flex-wrap ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (filteredModules.value.length);
    (MANUAL_MODULES.value.length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.em, __VLS_intrinsics.em)({});
    (searchQuery.value);
    let __VLS_68;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
        // @ts-ignore
        ...{ 'onClick': {} }, size: "small", variant: "text", color: "primary", ...{ class: "text-none" },
    }));
    const __VLS_70 = __VLS_69({
        ...{ 'onClick': {} },
        size: "small",
        variant: "text",
        color: "primary",
        ...{ class: "text-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    let __VLS_73;
    const __VLS_74 = {
        /** @type {typeof __VLS_73.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(searchQuery.value.trim()))
                throw 0;
            return (searchQuery.value = '');
            // @ts-ignore
            [searchQuery, searchQuery, MANUAL_MODULES, filteredModules,];
        },
    };
    void __VLS_74;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    const { default: __VLS_75 } = __VLS_nonNull(__VLS_71.slots);
    // @ts-ignore
    [];
    var __VLS_71;
    var __VLS_72;
    // @ts-ignore
    [];
    var __VLS_63;
    var __VLS_64;
}
if (filteredModules.value.length === 0) {
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        // @ts-ignore
        ...{ class: "pa-8 text-center rounded-xl border my-8" }, elevation: "0",
    }));
    const __VLS_78 = __VLS_77({
        ...{ class: "pa-8 text-center rounded-xl border my-8" },
        elevation: "0",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    /** @type {__VLS_StyleScopedClasses['pa-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['my-8']} */ ;
    const { default: __VLS_81 } = __VLS_nonNull(__VLS_79.slots);
    let __VLS_82;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
        // @ts-ignore
        icon: "mdi-file-search-outline", size: "64", color: "grey", ...{ class: "mb-4" },
    }));
    const __VLS_84 = __VLS_83({
        icon: "mdi-file-search-outline",
        size: "64",
        color: "grey",
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-h6 font-weight-bold mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-body-2 text-medium-emphasis mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    let __VLS_87;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
        // @ts-ignore
        ...{ 'onClick': {} }, color: "primary", variant: "flat", prependIcon: "mdi-refresh",
    }));
    const __VLS_89 = __VLS_88({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "flat",
        prependIcon: "mdi-refresh",
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    let __VLS_92;
    const __VLS_93 = {
        /** @type {typeof __VLS_92.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!(filteredModules.value.length === 0))
                throw 0;
            return (searchQuery.value = '');
            // @ts-ignore
            [searchQuery, filteredModules,];
        },
    };
    void __VLS_93;
    const { default: __VLS_94 } = __VLS_nonNull(__VLS_90.slots);
    // @ts-ignore
    [];
    var __VLS_90;
    var __VLS_91;
    // @ts-ignore
    [];
    var __VLS_79;
}
else if (viewMode.value === 'paged') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    if (currentPage.value === 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        const __VLS_95 = IntroductionSection;
        // @ts-ignore
        const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
            // @ts-ignore
            ...{ 'onStartTour': {} }, ...{ 'onSelectModule': {} }, modules: (MANUAL_MODULES.value),
        }));
        const __VLS_97 = __VLS_96({
            ...{ 'onStartTour': {} },
            ...{ 'onSelectModule': {} },
            modules: (MANUAL_MODULES.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_96));
        let __VLS_100;
        const __VLS_101 = {
            /** @type {typeof __VLS_100.startTour} */
            onStartTour: // @ts-ignore
            (...[$event]) => {
                void $event;
                if (!!(filteredModules.value.length === 0))
                    throw 0;
                if (!(viewMode.value === 'paged'))
                    throw 0;
                if (!(currentPage.value === 1))
                    throw 0;
                return (__VLS_unwrap(goToPage, {})(2));
                // @ts-ignore
                [viewMode, currentPage, MANUAL_MODULES, goToPage,];
            },
        };
        void __VLS_101;
        const __VLS_102 = {
            /** @type {typeof __VLS_100.selectModule} */
            onSelectModule: (__VLS_unwrap(onModuleSelectedFromIntro, {})),
        };
        void __VLS_102;
        var __VLS_98;
        var __VLS_99;
    }
    else if (currentPagedModule.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        const __VLS_103 = ModuleSection;
        // @ts-ignore
        const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
            // @ts-ignore
            key: (currentPagedModule.value.id), module: (currentPagedModule.value),
        }));
        const __VLS_105 = __VLS_104({
            key: (currentPagedModule.value.id),
            module: (currentPagedModule.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_104));
    }
    let __VLS_108;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
        // @ts-ignore
        ...{ class: "pa-4 pa-md-5 rounded-xl border mt-6 bg-surface elevation-1 no-print" },
    }));
    const __VLS_110 = __VLS_109({
        ...{ class: "pa-4 pa-md-5 rounded-xl border mt-6 bg-surface elevation-1 no-print" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    /** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['pa-md-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface']} */ ;
    /** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['no-print']} */ ;
    const { default: __VLS_113 } = __VLS_nonNull(__VLS_111.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex flex-wrap align-center justify-space-between ga-3" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
    let __VLS_114;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
        // @ts-ignore
        ...{ 'onClick': {} }, color: "primary", variant: "outlined", ...{ class: "text-none font-weight-medium" }, prependIcon: "mdi-chevron-left", disabled: (currentPage.value <= 1),
    }));
    const __VLS_116 = __VLS_115({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "outlined",
        ...{ class: "text-none font-weight-medium" },
        prependIcon: "mdi-chevron-left",
        disabled: (currentPage.value <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    let __VLS_119;
    const __VLS_120 = {
        /** @type {typeof __VLS_119.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!!(filteredModules.value.length === 0))
                throw 0;
            if (!(viewMode.value === 'paged'))
                throw 0;
            return (__VLS_unwrap(goToPage, {})(currentPage.value - 1));
            // @ts-ignore
            [currentPage, currentPage, goToPage, onModuleSelectedFromIntro, currentPagedModule, currentPagedModule, currentPagedModule,];
        },
    };
    void __VLS_120;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
    const { default: __VLS_121 } = __VLS_nonNull(__VLS_117.slots);
    (__VLS_unwrap(prevPageTitle, {}));
    // @ts-ignore
    [prevPageTitle,];
    var __VLS_117;
    var __VLS_118;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    let __VLS_122;
    /** @ts-ignore @type { | typeof __VLS_components.vPagination | typeof __VLS_components.VPagination | typeof __VLS_components['v-pagination']} */
    vPagination;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
        // @ts-ignore
        modelValue: (currentPage.value), length: (__VLS_unwrap(totalPages, {})), totalVisible: (5), density: "comfortable", activeColor: "primary", rounded: "circle",
    }));
    const __VLS_124 = __VLS_123({
        modelValue: (currentPage.value),
        length: (__VLS_unwrap(totalPages, {})),
        totalVisible: (5),
        density: "comfortable",
        activeColor: "primary",
        rounded: "circle",
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    let __VLS_127;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_128 = __VLS_asFunctionalComponent1(__VLS_127, new __VLS_127({
        // @ts-ignore
        ...{ 'onClick': {} }, color: "primary", variant: "flat", ...{ class: "text-none font-weight-bold" }, appendIcon: "mdi-chevron-right", disabled: (currentPage.value >= __VLS_unwrap(totalPages, {})),
    }));
    const __VLS_129 = __VLS_128({
        ...{ 'onClick': {} },
        color: "primary",
        variant: "flat",
        ...{ class: "text-none font-weight-bold" },
        appendIcon: "mdi-chevron-right",
        disabled: (currentPage.value >= __VLS_unwrap(totalPages, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_128));
    let __VLS_132;
    const __VLS_133 = {
        /** @type {typeof __VLS_132.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!!(filteredModules.value.length === 0))
                throw 0;
            if (!(viewMode.value === 'paged'))
                throw 0;
            return (__VLS_unwrap(goToPage, {})(currentPage.value + 1));
            // @ts-ignore
            [currentPage, currentPage, currentPage, totalPages, totalPages, goToPage,];
        },
    };
    void __VLS_133;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_134 } = __VLS_nonNull(__VLS_130.slots);
    (__VLS_unwrap(nextPageTitle, {}));
    // @ts-ignore
    [nextPageTitle,];
    var __VLS_130;
    var __VLS_131;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center justify-space-between mt-3 pt-3 border-t text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (currentPage.value);
    (__VLS_unwrap(totalPages, {}));
    // @ts-ignore
    [currentPage, totalPages,];
    var __VLS_111;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_135 = IntroductionSection;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
        // @ts-ignore
        ...{ 'onStartTour': {} }, ...{ 'onSelectModule': {} }, modules: (MANUAL_MODULES.value),
    }));
    const __VLS_137 = __VLS_136({
        ...{ 'onStartTour': {} },
        ...{ 'onSelectModule': {} },
        modules: (MANUAL_MODULES.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    let __VLS_140;
    const __VLS_141 = {
        /** @type {typeof __VLS_140.startTour} */
        onStartTour: // @ts-ignore
        (...[$event]) => {
            void $event;
            if (!!(filteredModules.value.length === 0))
                throw 0;
            if (!!(viewMode.value === 'paged'))
                throw 0;
            return (__VLS_unwrap(scrollToSection, {})('mod-user'));
            // @ts-ignore
            [MANUAL_MODULES, scrollToSection,];
        },
    };
    void __VLS_141;
    const __VLS_142 = {
        /** @type {typeof __VLS_140.selectModule} */
        onSelectModule: (__VLS_unwrap(scrollToSection, {})),
    };
    void __VLS_142;
    var __VLS_138;
    var __VLS_139;
    const __VLS_143 = __VLS_tryAsConstant((filteredModules.value));
    for (const [mod] of __VLS_vFor(__VLS_nonNull(__VLS_143))) {
        const __VLS_144 = ModuleSection;
        // @ts-ignore
        const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({
            // @ts-ignore
            key: (mod.id), module: (mod),
        }));
        const __VLS_146 = __VLS_145({
            key: (mod.id),
            module: (mod),
        }, ...__VLS_functionalComponentArgsRest(__VLS_145));
        // @ts-ignore
        [filteredModules, scrollToSection,];
    }
}
// @ts-ignore
[];
var __VLS_32;
// @ts-ignore
[];
var __VLS_26;
const __VLS_149 = ManualFooter;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({
// @ts-ignore
}));
const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
