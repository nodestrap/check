// react:
import { default as React, useRef, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, vars, children, 
// rules:
variants, states, rule, isNotLastChild, 
// utilities:
escapeSvg, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesPrefixedProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { 
// styles:
fillTextLineHeightLayout, } from '@nodestrap/layouts';
import { 
// utilities:
setRef, } from '@nodestrap/utilities';
import { 
// hooks:
usePropEnabled, usePropReadOnly, } from '@nodestrap/accessibilities';
// nodestrap components:
import { 
// hooks:
useTestSemantic, } from '@nodestrap/element';
import { 
// hooks:
usesSizeVariant, notNude, isNude, usesNudeVariant, useNudeVariant, usesMildVariant, usesForeg, usesBorder, usesBorderStroke, usesBorderRadius, usesPadding, convertRefToDecl, usesAnim, isRef, filterRef, fallbackNoneFilter, fallbackNoneTransf, fallbackNoneAnim, } from '@nodestrap/basic';
import { 
// hooks:
isActived, isActivating, isPassivating, isPassived, useTogglerActive, } from '@nodestrap/indicator';
import { 
// hooks:
usesFocusBlurState, } from '@nodestrap/control';
import { 
// styles:
usesEditableActionControlLayout, usesEditableActionControlVariants, usesEditableActionControlStates, EditableActionControl, } from '@nodestrap/editable-action-control';
import { 
// styles:
usesIconImage, } from '@nodestrap/icon';
import { 
// styles:
usesButtonLayout, } from '@nodestrap/button';
const [checkAnimRefs, checkAnimDecls] = createCssVar();
const setsCheckFilter = new Set(['brightness(100%)']);
const setsCheckTransf = new Set(['translate(0)']);
const setsCheckAnim = new Set(['0']);
const checkPropsManager = {
    filters: () => Array.from(setsCheckFilter),
    registerFilter: (item) => setsCheckFilter.add(item),
    unregisterFilter: (item) => setsCheckFilter.delete(item),
    transfs: () => Array.from(setsCheckTransf),
    registerTransf: (item) => setsCheckTransf.add(item),
    unregisterTransf: (item) => setsCheckTransf.delete(item),
    anims: () => Array.from(setsCheckAnim),
    registerAnim: (item) => setsCheckAnim.add(item),
    unregisterAnim: (item) => setsCheckAnim.delete(item),
};
export const usesCheckAnim = () => {
    // dependencies:
    // animations:
    const [anim, animRefs] = usesAnim();
    return [
        () => composition([
            imports([
                // animations:
                anim(),
            ]),
            vars({
                [checkAnimDecls.filter]: [[
                        // combining: filter1 * filter2 * filter3 ...
                        // layers:
                        ...checkPropsManager.filters().map(fallbackNoneFilter),
                    ]],
                [checkAnimDecls.transf]: [[
                        // combining: transf1 * transf2 * transf3 ...
                        // layers:
                        ...checkPropsManager.transfs().map(fallbackNoneTransf),
                    ]],
                [checkAnimDecls.anim]: [
                    // layering: anim1 | anim2 | anim3 ...
                    // layers:
                    ...checkPropsManager.anims().map(fallbackNoneAnim),
                ],
            }),
            vars(Object.fromEntries([
                ...checkPropsManager.filters().filter(filterRef).map(convertRefToDecl).map((decl) => [decl, animRefs.filterNone]),
                ...checkPropsManager.transfs().filter(filterRef).map(convertRefToDecl).map((decl) => [decl, animRefs.transfNone]),
                ...checkPropsManager.anims().filter(filterRef).map(convertRefToDecl).map((decl) => [decl, animRefs.animNone]),
            ])),
        ]),
        checkAnimRefs,
        checkAnimDecls,
        checkPropsManager,
    ];
};
const [checkClearRefs, checkClearDecls] = createCssVar();
{
    const [, , , checkPropsManager] = usesCheckAnim();
    checkPropsManager.registerFilter(checkClearRefs.filterIn);
    checkPropsManager.registerFilter(checkClearRefs.filterOut);
    checkPropsManager.registerTransf(checkClearRefs.transfIn);
    checkPropsManager.registerTransf(checkClearRefs.transfOut);
    checkPropsManager.registerAnim(checkClearRefs.anim);
}
/**
 * Uses check & clear states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents check & clear state definitions.
 */
export const usesCheckClearState = () => {
    return [
        () => composition([
            states([
                isActived([
                    vars({
                        [checkClearDecls.filterIn]: cssProps.filterCheck,
                        [checkClearDecls.transfIn]: cssProps.transfCheck,
                    }),
                ]),
                isActivating([
                    vars({
                        [checkClearDecls.filterIn]: cssProps.filterCheck,
                        [checkClearDecls.filterOut]: cssProps.filterClear,
                        [checkClearDecls.transfIn]: cssProps.transfCheck,
                        [checkClearDecls.transfOut]: cssProps.transfClear,
                        [checkClearDecls.anim]: cssProps.animCheck,
                    }),
                ]),
                isPassivating([
                    vars({
                        [checkClearDecls.filterIn]: cssProps.filterCheck,
                        [checkClearDecls.filterOut]: cssProps.filterClear,
                        [checkClearDecls.transfIn]: cssProps.transfCheck,
                        [checkClearDecls.transfOut]: cssProps.transfClear,
                        [checkClearDecls.anim]: cssProps.animClear,
                    }),
                ]),
                isPassived([
                    vars({
                        [checkClearDecls.filterOut]: cssProps.filterClear,
                        [checkClearDecls.transfOut]: cssProps.transfClear,
                    }),
                ]),
            ]),
        ]),
        checkClearRefs,
        checkClearDecls,
    ];
};
export const useCheckVariant = (props) => {
    return {
        class: props.checkStyle ? props.checkStyle : null,
    };
};
// styles:
export const inputElm = ':first-child';
export const checkElm = '::before';
export const labelElm = ':nth-child(1n+2)';
export const usesCheckLayout = () => {
    // dependencies:
    // colors:
    const [, foregRefs] = usesForeg();
    // spacings:
    const [, , paddingDecls] = usesPadding();
    // animations:
    const [checkAnim, checkAnimRefs] = usesCheckAnim();
    return composition([
        imports([
            // layouts:
            usesEditableActionControlLayout(),
            // animations:
            checkAnim(),
        ]),
        layout({
            // layouts:
            display: 'inline-flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            // positions:
            verticalAlign: 'baseline',
            // children:
            ...children('::before', [
                imports([
                    fillTextLineHeightLayout(),
                ]),
            ]),
            ...children(inputElm, [
                imports([
                    // layouts:
                    usesEditableActionControlLayout(),
                ]),
                layout({
                    // layouts:
                    display: 'inline-block',
                    // sizes:
                    flex: [[0, 0, 'auto']],
                    boxSizing: 'border-box',
                    // the size is exactly the same as current font size:
                    inlineSize: '1em',
                    blockSize: '1em',
                    // spacings:
                    [paddingDecls.paddingInline]: '0px',
                    [paddingDecls.paddingBlock]: '0px',
                    // borders:
                    overflow: 'hidden',
                    // accessibilities:
                    pointerEvents: 'none',
                    // animations:
                    filter: 'initial !important',
                    // children:
                    ...children(checkElm, [
                        imports([
                            // check indicator:
                            usesIconImage(
                            /*iconImage: */ cssProps.img, 
                            /*iconColor: */ foregRefs.foreg),
                        ]),
                        layout({
                            // layouts:
                            content: '""',
                            display: 'block',
                            // sizes:
                            // fills the entire parent:
                            boxSizing: 'border-box',
                            blockSize: '100%',
                            // animations:
                            filter: checkAnimRefs.filter,
                            transf: checkAnimRefs.transf,
                            anim: checkAnimRefs.anim,
                        }),
                    ]),
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
                variants([
                    isNotLastChild([
                        layout({
                            // spacing between input & label:
                            marginInlineEnd: cssProps.spacing,
                        }),
                    ]),
                ]),
            ]),
            ...children(labelElm, [
                layout({
                    // layouts:
                    display: 'inline',
                    // sizes:
                    flex: [[1, 1, 0]],
                    // positions:
                    verticalAlign: 'baseline',
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'label')), // apply general cssProps starting with label***
                }),
            ]),
        }),
    ]);
};
export const usesCheckVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    // colors:
    const [, mildRefs] = usesMildVariant();
    // borders:
    const [, , borderDecls] = usesBorder();
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    // spacings:
    const [, , paddingDecls] = usesPadding();
    return composition([
        imports([
            // variants:
            usesEditableActionControlVariants(),
            // layouts:
            sizes(),
            usesNudeVariant(),
        ]),
        variants([
            rule(['.btn', '.togglerBtn'], [
                imports([
                    // layouts:
                    usesButtonLayout(),
                ]),
                layout({
                    // layouts:
                    flexWrap: 'nowrap',
                    // children:
                    ...children(['::before', inputElm], [
                        layout({
                            // layouts:
                            display: 'none',
                        }),
                    ]),
                    ...children(labelElm, [
                        layout({
                            // layouts:
                            display: 'inherit',
                            flexDirection: 'inherit',
                            justifyContent: 'inherit',
                            alignItems: 'inherit',
                            flexWrap: 'inherit',
                            // sizes:
                            flex: [[1, 1, '100%']],
                            alignSelf: 'stretch',
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'btn')), // apply general cssProps starting with btn***
                        }),
                    ]),
                    // overwrites propName = {btn}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'btn')),
                }),
            ]),
            rule('.togglerBtn', [
                layout({
                    ...children(labelElm, [
                        layout({
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'togglerBtn')), // apply general cssProps starting with togglerBtn***
                        }),
                    ]),
                    // overwrites propName = {togglerBtn}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'togglerBtn')),
                }),
            ]),
            rule('.switch', [
                layout({
                    // children:
                    ...children(inputElm, [
                        layout({
                            // sizes:
                            inlineSize: '2em',
                            // borders:
                            // circle corners on top:
                            [borderRadiusDecls.borderStartStartRadius]: '0.5em',
                            [borderRadiusDecls.borderStartEndRadius]: '0.5em',
                            // circle corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius]: '0.5em',
                            [borderRadiusDecls.borderEndEndRadius]: '0.5em',
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'switch')), // apply general cssProps starting with switch***
                        }),
                    ]),
                    // overwrites propName = {switch}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'switch')),
                }),
            ]),
        ]),
        variants([
            notNude([
                layout({
                    // children:
                    ...children(inputElm, [
                        layout({
                            // borders:
                            [borderDecls.borderCol]: 'currentColor', // make a contrast border between indicator & filler
                        }),
                    ]),
                }),
            ]),
            isNude([
                layout({
                    // foregrounds:
                    foreg: [[mildRefs.foregFn], '!important'],
                    // backgrounds:
                    backg: 'none !important',
                    // borders:
                    [borderStrokeDecls.borderWidth]: '0px',
                    // remove rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius]: '0px',
                    [borderRadiusDecls.borderStartEndRadius]: '0px',
                    // remove rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius]: '0px',
                    [borderRadiusDecls.borderEndEndRadius]: '0px',
                    // spacings:
                    [paddingDecls.paddingInline]: '0px',
                    [paddingDecls.paddingBlock]: '0px',
                    // animations:
                    boxShadow: 'initial !important', // no focus animation
                }),
            ]),
        ], { minSpecificityWeight: 2 }),
    ]);
};
export const usesCheckStates = () => {
    // dependencies:
    // states:
    const [, , focusBlurDecls] = usesFocusBlurState();
    const [checkClear] = usesCheckClearState();
    return composition([
        imports([
            // states:
            usesEditableActionControlStates(),
            checkClear(),
        ]),
        layout({
            // children:
            ...children(inputElm, [
                vars({
                    [focusBlurDecls.boxShadow]: 'inherit',
                    [focusBlurDecls.anim]: 'inherit',
                }),
            ]),
        }),
    ]);
};
export const useCheckSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesCheckLayout(),
            // variants:
            usesCheckVariants(),
            // states:
            usesCheckStates(),
        ]),
    ]),
]);
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , checkPropsManager] = usesCheckAnim();
    const filters = checkPropsManager.filters();
    const transfs = checkPropsManager.transfs();
    const [, { filterIn: filterCheckClearIn, filterOut: filterCheckClearOut, transfIn: transfCheckClearIn, transfOut: transfCheckClearOut }] = usesCheckClearState();
    //#region keyframes
    const keyframesCheck = {
        from: {
            filter: [[
                    ...filters.filter((f) => !isRef(f) || ![filterCheckClearIn, filterCheckClearOut].includes(f)),
                    filterCheckClearOut,
                ].map(fallbackNoneFilter)],
            transform: [[
                    ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                    transfCheckClearOut,
                ].map(fallbackNoneTransf)],
        },
        to: {
            filter: [[
                    ...filters.filter((f) => !isRef(f) || ![filterCheckClearIn, filterCheckClearOut].includes(f)),
                    filterCheckClearIn,
                ].map(fallbackNoneFilter)],
            transform: [[
                    ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                    transfCheckClearIn,
                ].map(fallbackNoneTransf)],
        },
    };
    const keyframesClear = {
        from: keyframesCheck.to,
        to: keyframesCheck.from,
    };
    const keyframesSwitchCheck = {
        from: keyframesCheck.from,
        '75%': {
            transformOrigin: 'left',
            transform: [[
                    ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                    transfCheckClearIn,
                    'scaleX(1.2)', // add a bumpy effect
                ].map(fallbackNoneTransf)],
        },
        to: keyframesCheck.to,
    };
    const keyframesSwitchClear = {
        from: keyframesSwitchCheck.to,
        '75%': {
            transformOrigin: 'right',
            transform: [[
                    ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                    transfCheckClearOut,
                    'scaleX(1.2)', // add a bumpy effect
                ].map(fallbackNoneTransf)],
        },
        to: keyframesSwitchCheck.from,
    };
    //#endregion keyframes
    return {
        // spacings:
        spacing: '0.3em',
        //#region indicators
        // forked from Bootstrap 5:
        img: `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")`,
        // forked from Bootstrap 5:
        switchImg: `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")`,
        //#endregion indicators
        //#region animations
        filterCheck: [['opacity(100%)']],
        filterClear: [['opacity(0%)']],
        transfCheck: 'initial',
        transfClear: 'initial',
        '@keyframes check': keyframesCheck,
        '@keyframes clear': keyframesClear,
        animCheck: [['150ms', 'ease-out', 'both', keyframesCheck]],
        animClear: [['150ms', 'ease-out', 'both', keyframesClear]],
        switchFilterCheck: [['opacity(100%)']],
        switchFilterClear: [['opacity(50%)']],
        switchTransfCheck: [['translateX(0.5em)']],
        switchTransfClear: [['translateX(-0.5em)']],
        '@keyframes switchCheck': keyframesSwitchCheck,
        '@keyframes switchClear': keyframesSwitchClear,
        switchAnimCheck: [['200ms', 'ease-out', 'both', keyframesSwitchCheck]],
        switchAnimClear: [['200ms', 'ease-out', 'both', keyframesSwitchClear]],
        //#endregion animations
    };
}, { prefix: 'chk' });
export function Check(props) {
    // styles:
    const sheet = useCheckSheet();
    // variants:
    const nudeVariant = useNudeVariant({ nude: (props.nude ?? true) });
    const checkVariant = useCheckVariant(props);
    // states:
    const inputRef = useRef(null);
    const [isActive, setActive] = useTogglerActive({
        ...props,
        defaultActive: props.defaultActive ?? props.defaultChecked,
        active: props.active ?? props.checked, // forwards `checked`        to `active`
    }, /*changeEventTarget :*/ inputRef);
    // rest props:
    const { 
    // essentials:
    elmRef, 
    // accessibilities:
    autoFocus, label, defaultActive, // delete, already handled by `useTogglerActive`
    active, // delete, already handled by `useTogglerActive`
    onActiveChange, // delete, already handled by `useTogglerActive`
    defaultChecked, // delete, already forwarded to `defaultActive`
    checked, // delete, already forwarded to `active`
    onChange, // forwards to `input[type='checkbox']`
    // values:
    name, form, defaultValue, value, 
    // validations:
    required, 
    // formats:
    type = 'checkbox', ...restProps } = props;
    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    };
    // fn props:
    const propEnabled = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    const isButton = !!props.checkStyle && ['btn', 'togglerBtn'].includes(props.checkStyle);
    const isToggler = (props.checkStyle === 'togglerBtn');
    const pressFn = props.press ?? ((isActive && isToggler) || undefined); // supports for togglerBtn
    const tag = props.tag ?? (isButton ? undefined : 'span');
    const semanticTag = props.semanticTag ?? (isButton ? 'button' : [null]);
    const semanticRole = props.semanticRole ?? (isButton ? 'button' : 'checkbox');
    const [, , isCheckable] = useTestSemantic({ tag, role: props.role, semanticTag, semanticRole }, { semanticTag: null, semanticRole: ['checkbox', 'radio'] });
    const [, , isPressable] = useTestSemantic({ tag, role: props.role, semanticTag, semanticRole }, { semanticTag: null, semanticRole: 'button' });
    const ariaChecked = props['aria-checked'] ?? (isCheckable ? isActive : undefined);
    const ariaPressed = props['aria-pressed'] ?? ((isPressable && isToggler) ? isActive : undefined);
    // jsx:
    return (React.createElement(EditableActionControl, { ...restProps, 
        // semantics:
        tag: tag, semanticTag: semanticTag, semanticRole: semanticRole, "aria-checked": ariaChecked, "aria-pressed": ariaPressed, "aria-label": props['aria-label'] ?? label, 
        // accessibilities:
        active: isActive, press: pressFn, 
        // variants:
        mild: props.mild ?? false, 
        // classes:
        mainClass: props.mainClass ?? sheet.main, variantClasses: [...(props.variantClasses ?? []),
            nudeVariant.class,
            checkVariant.class,
        ], 
        // events:
        onClick: (e) => {
            props.onClick?.(e);
            if (!e.defaultPrevented) {
                handleToggleActive();
                e.preventDefault();
            } // if
        }, onKeyDown: (e) => {
            props.onKeyDown?.(e);
            if (!e.defaultPrevented) {
                if ((e.key === ' ') || (e.code === 'Space')) {
                    // prevents pressing space for scrolling page
                    e.preventDefault();
                } // if
            } // if
        }, onKeyUp: (e) => {
            props.onKeyUp?.(e);
            if (!e.defaultPrevented) {
                if ((e.key === ' ') || (e.code === 'Space')) {
                    handleToggleActive();
                    e.preventDefault();
                } // if
            } // if
        } },
        React.createElement("input", { 
            // essentials:
            ref: (elm) => {
                setRef(elmRef, elm);
                setRef(inputRef, elm);
            }, "aria-hidden": true, ...{
                autoFocus,
                tabIndex: -1, // non focusable
            }, disabled: !propEnabled, readOnly: propReadOnly, checked: isActive, ...{
                name,
                form,
                defaultValue,
                value,
            }, ...{
                required,
            }, ...{
                type,
            }, 
            // events:
            onChange: (e) => {
                onChange?.(e);
                // then do nothing here, just for satisfying React for controllable readonly input
                // passing `onChange={undefined}` causing React unhappy
            }, onClick: (e) => e.stopPropagation() }),
        props.children && React.createElement("span", null, props.children)));
}
export { Check as default };
