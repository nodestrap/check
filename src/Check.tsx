// react:
import {
    default as React,
    useRef,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Cust,
    PropEx,
}                           from '@cssfn/css-types'   // ts defs support for cssfn
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    states,
    isNotLastChild,
    
    
    
    //combinators:
    children,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from '@cssfn/react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from '@cssfn/css-var'     // Declares & retrieves *css variables* (css custom properties).
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    // styles:
    fillTextLineHeightLayout,
}                           from '@nodestrap/layouts'
import {
    // utilities:
    setRef,
}                           from '@nodestrap/utilities'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@nodestrap/accessibilities'

// nodestrap components:
import {
    // hooks:
    useTestSemantic,
}                           from '@nodestrap/element'
import {
    // hooks:
    usesSizeVariant,
    notNude,
    isNude,
    usesMildVariant,
    usesForeg,
    usesBorder,
    usesBorderRadius,
    usesPadding,
    convertRefToDecl,
    usesAnim,
    isRef,
    filterRef,
    fallbackNoneFilter,
    fallbackNoneTransf,
    fallbackNoneAnim,
}                           from '@nodestrap/basic'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
    isPassived,
    TogglerActiveProps,
    useTogglerActive,
}                           from '@nodestrap/indicator'
import {
    // hooks:
    usesFocusBlurState,
}                           from '@nodestrap/control'
import {
    // styles:
    usesEditableActionControlLayout,
    usesEditableActionControlVariants,
    usesEditableActionControlStates,
    
    
    
    // react components:
    EditableActionControlProps,
    EditableActionControl,
}                           from '@nodestrap/editable-action-control'
import {
    // styles:
    usesIconImage,
}                           from '@nodestrap/icon'
import {
    // styles:
    usesButtonLayout,
}                           from '@nodestrap/button'



// hooks:

// animations:

//#region check animations
export interface CheckAnimVars {
    /**
     * final filter for the checkbox.
     */
    filter : any
    
    /**
     * final transform for the checkbox.
     */
    transf : any
    
    /**
     * final animation for the checkbox.
     */
    anim   : any
}
const [checkAnimRefs, checkAnimDecls] = createCssVar<CheckAnimVars>();

const setsCheckFilter = new Set<Cust.Ref|Cust.General>(['brightness(100%)' as Cust.General]);
const setsCheckTransf = new Set<Cust.Ref|Cust.General>(['translate(0)'     as Cust.General]);
const setsCheckAnim   = new Set<Cust.Ref|Cust.General>(['0'                as Cust.General]);
const checkPropsManager  = {
    filters             : () => Array.from(setsCheckFilter),
    registerFilter      : (item: Cust.Ref) => setsCheckFilter.add(item),
    unregisterFilter    : (item: Cust.Ref) => setsCheckFilter.delete(item),
    
    transfs             : () => Array.from(setsCheckTransf),
    registerTransf      : (item: Cust.Ref) => setsCheckTransf.add(item),
    unregisterTransf    : (item: Cust.Ref) => setsCheckTransf.delete(item),
    
    anims               : () => Array.from(setsCheckAnim),
    registerAnim        : (item: Cust.Ref) => setsCheckAnim.add(item),
    unregisterAnim      : (item: Cust.Ref) => setsCheckAnim.delete(item),
} as const;

export const usesCheckAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    return [
        () => style({
            ...imports([
                // animations:
                anim(),
            ]),
            ...vars({
                [checkAnimDecls.filter] : [[ // double array => makes the JSS treat as space separated values
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...checkPropsManager.filters().map(fallbackNoneFilter),
                ]],
                
                [checkAnimDecls.transf] : [[ // double array => makes the JSS treat as space separated values
                    // combining: transf1 * transf2 * transf3 ...
                    
                    // layers:
                    ...checkPropsManager.transfs().map(fallbackNoneTransf),
                ]],
                
                [checkAnimDecls.anim  ] : [ // single array => makes the JSS treat as comma separated values
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...checkPropsManager.anims().map(fallbackNoneAnim),
                ],
            }),
            ...vars(Object.fromEntries([
                ...checkPropsManager.filters().filter(filterRef).map(convertRefToDecl).map((decl) => [ decl, animRefs.filterNone ]),
                ...checkPropsManager.transfs().filter(filterRef).map(convertRefToDecl).map((decl) => [ decl, animRefs.transfNone ]),
                ...checkPropsManager.anims().filter(filterRef).map(convertRefToDecl).map((decl) => [ decl, animRefs.animNone ]),
            ])),
        }),
        checkAnimRefs,
        checkAnimDecls,
        checkPropsManager,
    ] as const;
};
//#endregion check animations


// states:

//#region checkClear
export interface CheckClearVars {
    filterIn  : any
    filterOut : any
    transfIn  : any
    transfOut : any
    anim      : any
}
const [checkClearRefs, checkClearDecls] = createCssVar<CheckClearVars>();

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
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents check & clear state definitions.
 */
export const usesCheckClearState = () => {
    return [
        () => style({
            ...states([
                isActived({
                    ...vars({
                        [checkClearDecls.filterIn ] : cssProps.filterCheck,
                        
                        [checkClearDecls.transfIn ] : cssProps.transfCheck,
                    }),
                }),
                isActivating({
                    ...vars({
                        [checkClearDecls.filterIn ] : cssProps.filterCheck,
                        [checkClearDecls.filterOut] : cssProps.filterClear,
                        
                        [checkClearDecls.transfIn ] : cssProps.transfCheck,
                        [checkClearDecls.transfOut] : cssProps.transfClear,
                        
                        [checkClearDecls.anim     ] : cssProps.animCheck,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [checkClearDecls.filterIn ] : cssProps.filterCheck,
                        [checkClearDecls.filterOut] : cssProps.filterClear,
                        
                        [checkClearDecls.transfIn ] : cssProps.transfCheck,
                        [checkClearDecls.transfOut] : cssProps.transfClear,
                        
                        [checkClearDecls.anim     ] : cssProps.animClear,
                    }),
                }),
                isPassived({
                    ...vars({
                        [checkClearDecls.filterOut] : cssProps.filterClear,
                        
                        [checkClearDecls.transfOut] : cssProps.transfClear,
                    }),
                }),
            ]),
        }),
        checkClearRefs,
        checkClearDecls,
    ] as const;
};
//#endregion checkClear


// appearances:

export type CheckStyle = 'btn'|'togglerBtn'|'switch' // might be added more styles in the future
export interface CheckVariant {
    checkStyle?: CheckStyle
}
export const useCheckVariant = (props: CheckVariant) => {
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
    const [, foregRefs             ] = usesForeg();
    
    // spacings:
    const [, , paddingDecls        ] = usesPadding();
    
    // animations:
    const [checkAnim, checkAnimRefs] = usesCheckAnim();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableActionControlLayout(),
            
            // animations:
            checkAnim(),
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // items are placed starting from the center (in case of input & label are wrapped, each placed at the center)
            alignItems     : 'center',      // center items vertically (indicator & label are always at center no matter how tall is the wrapper)
            flexWrap       : 'wrap',        // allows the label to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline', // check's text should be aligned with sibling text, so the check behave like <span> wrapper
            
            
            
            // children:
            ...children('::before', {
                ...imports([
                    fillTextLineHeightLayout(),
                ]),
            }),
            ...children(inputElm, {
                ...imports([
                    // layouts:
                    usesEditableActionControlLayout(),
                ]),
                ...style({
                    // layouts:
                    display       : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // sizes:
                    flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                    boxSizing     : 'border-box', // the final size is including borders & paddings
                    // the size is exactly the same as current font size:
                    inlineSize    : '1em',
                    blockSize     : '1em',
                    
                    
                    
                    // spacings:
                    [paddingDecls.paddingInline] : '0px', // discard padding
                    [paddingDecls.paddingBlock ] : '0px', // discard padding
                    ...isNotLastChild({
                        // spacing between input & label:
                        marginInlineEnd : cssProps.spacing,
                    }),
                    
                    
                    
                    // borders:
                    overflow      : 'hidden', // clip the icon at borderRadius
                    
                    
                    
                    // accessibilities:
                    pointerEvents : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // animations:
                    filter        : [['initial'], '!important'], // uses parent filter
                    
                    
                    
                    // children:
                    ...children(checkElm, {
                        ...imports([
                            // check indicator:
                            usesIconImage(
                                /*iconImage: */cssProps.img,
                                /*iconColor: */foregRefs.foreg,
                            ),
                        ]),
                        ...style({
                            // layouts:
                            content   : '""',
                            display   : 'block', // fills the entire parent's width
                            
                            
                            
                            // sizes:
                            // fills the entire parent:
                            boxSizing : 'border-box', // the final size is including borders & paddings
                            blockSize : '100%', // fills the entire parent's height
                            
                            
                            
                            // animations:
                            filter    : checkAnimRefs.filter,
                            transf    : checkAnimRefs.transf,
                            anim      : checkAnimRefs.anim,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
            }),
            ...children(labelElm, {
                // layouts:
                display       : 'inline', // use inline, so it takes the width & height automatically
                
                
                
                // sizes:
                flex          : [[1, 1, 0]], // growable, shrinkable, initial from 0 width (setting initial to `auto`, when wrapped to next line, causing the text is not centered)
                
                
                
                // positions:
                verticalAlign : 'baseline', // label's text should be aligned with sibling text, so the label behave like <span> wrapper
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'label')), // apply general cssProps starting with label***
            }),
        }),
    });
};
export const usesCheckVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    // colors:
    const [, mildRefs           ] = usesMildVariant();
    
    // borders:
    const [, , borderDecls      ] = usesBorder();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableActionControlVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule(['.btn', '.togglerBtn'], {
                ...imports([
                    // layouts:
                    usesButtonLayout(),
                ]),
                ...style({
                    // layouts:
                    flexWrap       : 'nowrap', // because the input is visually hidden => prevents the label from wrapping to the next row
                    
                    
                    
                    // children:
                    ...children(['::before', inputElm], {
                        // layouts:
                        display : 'none',
                    }),
                    ...children(labelElm, {
                        // layouts:
                        display        : 'inherit',
                        flexDirection  : 'inherit',
                        justifyContent : 'inherit',
                        alignItems     : 'inherit',
                        flexWrap       : 'inherit',
                        
                        
                        
                        // sizes:
                        flex      : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                        alignSelf : 'stretch',        // follows parent's height
                        
                        
                        
                        // customize:
                        ...usesGeneralProps(usesPrefixedProps(cssProps, 'btn')), // apply general cssProps starting with btn***
                    }),
                    
                    
                    
                    // overwrites propName = {btn}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'btn')),
                }),
            }),
            rule('.togglerBtn', {
                ...children(labelElm, {
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'togglerBtn')), // apply general cssProps starting with togglerBtn***
                }),
                
                
                
                // overwrites propName = {togglerBtn}propName:
                ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'togglerBtn')),
            }),
            
            rule('.switch', {
                // children:
                ...children(inputElm, {
                    // sizes:
                    inlineSize   : '2em',   // make the width twice the height
                    
                    
                    
                    // borders:
                    // circle corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : '0.5em',
                    [borderRadiusDecls.borderStartEndRadius  ] : '0.5em',
                    // circle corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius  ] : '0.5em',
                    [borderRadiusDecls.borderEndEndRadius    ] : '0.5em',
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'switch')), // apply general cssProps starting with switch***
                }),
                
                
                
                // overwrites propName = {switch}propName:
                ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'switch')),
            }),
        ], { specificityWeight: 1 }),
        ...variants([
            notNude({
                // children:
                ...children(inputElm, {
                    // borders:
                    [borderDecls.borderCol] : 'currentColor',   // make a contrast border between indicator & filler
                }),
            }),
            isNude({
                // foregrounds:
                foreg     : [[mildRefs.foregFn], '!important'], // no valid/invalid animation
                
                
                
                // animations:
                boxShadow : [['initial'], '!important'],        // no focus animation
            }),
        ], { specificityWeight: 2 }),
    });
};
export const usesCheckStates = () => {
    // dependencies:
    
    // states:
    const [, , focusBlurDecls] = usesFocusBlurState();
    const [checkClear        ] = usesCheckClearState();
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableActionControlStates(),
            checkClear(),
        ]),
        ...style({
            // children:
            ...children(inputElm, {
                ...vars({
                    // copy focus effect from parent:
                    [focusBlurDecls.boxShadow] : 'inherit',
                    [focusBlurDecls.anim     ] : 'inherit',
                }),
            }),
        }),
    });
};

export const useCheckSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesCheckLayout(),
            
            // variants:
            usesCheckVariants(),
            
            // states:
            usesCheckStates(),
        ]),
    ),
], /*sheetId :*/'nx58strmq2'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , checkPropsManager] = usesCheckAnim();
    const filters = checkPropsManager.filters();
    const transfs = checkPropsManager.transfs();
    
    const [, {filterIn: filterCheckClearIn, filterOut: filterCheckClearOut, transfIn: transfCheckClearIn, transfOut: transfCheckClearOut}] = usesCheckClearState();
    
    
    
    //#region keyframes
    const keyframesCheck         : PropEx.Keyframes = {
        from : {
            filter    : [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => !isRef(f) || ![filterCheckClearIn, filterCheckClearOut].includes(f)),
                
                filterCheckClearOut,
            ].map(fallbackNoneFilter)],
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearOut,
            ].map(fallbackNoneTransf)],
        },
        to   : {
            filter    : [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => !isRef(f) || ![filterCheckClearIn, filterCheckClearOut].includes(f)),
                
                filterCheckClearIn,
            ].map(fallbackNoneFilter)],
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearIn,
            ].map(fallbackNoneTransf)],
        },
    };
    const keyframesClear         : PropEx.Keyframes = {
        from : keyframesCheck.to,
        to   : keyframesCheck.from,
    };
    
    
    
    const keyframesSwitchCheck   : PropEx.Keyframes = {
        from : keyframesCheck.from,
        '75%': {
            transformOrigin: 'left', // todo: orientation aware transform => left will be top if the element rotated 90deg clockwise
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearIn,
                'scaleX(1.2)', // add a bumpy effect
            ].map(fallbackNoneTransf)],
        },
        to   : keyframesCheck.to,
    };
    const keyframesSwitchClear   : PropEx.Keyframes = {
        from : keyframesSwitchCheck.to,
        '75%': {
            transformOrigin: 'right', // todo: orientation aware transform => right will be bottom if the element rotated 90deg clockwise
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => !isRef(t) || ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearOut,
                'scaleX(1.2)', // add a bumpy effect
            ].map(fallbackNoneTransf)],
        },
        to   : keyframesSwitchCheck.from,
    };
    //#endregion keyframes
    
    
    
    return {
        // spacings:
        spacing                  : '0.3em',
        
        
        
        //#region indicators
        // forked from Bootstrap 5:
        img                      : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")`,
        
        // forked from Bootstrap 5:
        switchImg                : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")`,
        //#endregion indicators
        
        
        
        //#region animations
        filterCheck              : [['opacity(100%)']],
        filterClear              : [['opacity(0%)'  ]],
        transfCheck              : 'initial',
        transfClear              : 'initial',
        
        '@keyframes check'       : keyframesCheck,
        '@keyframes clear'       : keyframesClear,
        animCheck                : [['150ms', 'ease-out', 'both', keyframesCheck      ]],
        animClear                : [['150ms', 'ease-out', 'both', keyframesClear      ]],
        
        
        
        switchFilterCheck        : [['opacity(100%)'     ]],
        switchFilterClear        : [['opacity(50%)'      ]],
        switchTransfCheck        : [['translateX(0.5em)' ]],
        switchTransfClear        : [['translateX(-0.5em)']],
        
        '@keyframes switchCheck' : keyframesSwitchCheck,
        '@keyframes switchClear' : keyframesSwitchClear,
        switchAnimCheck          : [['200ms', 'ease-out', 'both', keyframesSwitchCheck]],
        switchAnimClear          : [['200ms', 'ease-out', 'both', keyframesSwitchClear]],
        //#endregion animations
    };
}, { prefix: 'chk' });



// react components:

export interface CheckProps
    extends
        EditableActionControlProps<HTMLInputElement>,
        TogglerActiveProps,
        
        // appearances:
        CheckVariant
{
    // values:
    defaultChecked? : boolean
    checked?        : boolean
    
    
    // formats:
    type?           : 'checkbox' | 'radio'
    
    
    // accessibilities:
    label?          : string
    
    
    // children:
    children?       : React.ReactNode
}
export function Check(props: CheckProps) {
    // styles:
    const sheet        = useCheckSheet();
    
    
    
    // variants:
    const checkVariant = useCheckVariant(props);
    
    
    
    // states:
    const inputRef  = useRef<HTMLInputElement|null>(null);
    const [isActive, setActive] = useTogglerActive({
        ...props,
        
        defaultActive : props.defaultActive ?? props.defaultChecked, // forwards `defaultChecked` to `defaultActive`
        active        : props.active        ?? props.checked,        // forwards `checked`        to `active`
    }, /*changeEventTarget :*/inputRef);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        autoFocus,
        label,
        
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        defaultChecked, // delete, already forwarded to `defaultActive`
        checked,        // delete, already forwarded to `active`
        onChange,       // forwards to `input[type='checkbox']`
        
        
        // values:
        name,
        form,
        defaultValue,
        value,
        
        
        // validations:
        required,
        
        
        // formats:
        type = 'checkbox',
    ...restProps}  = props;
    
    
    
    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    }
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    const propReadOnly      = usePropReadOnly(props);
    
    const isButton          = !!props.checkStyle && ['btn', 'togglerBtn'].includes(props.checkStyle);
    const isToggler         = (props.checkStyle === 'togglerBtn');
    const pressFn           = props.press ?? ((isActive && isToggler) || undefined); // supports for togglerBtn
    
    const tag               = props.tag          ?? (isButton ? undefined : 'span');
    const semanticTag       = props.semanticTag  ?? (isButton ? 'button'  : [null]);
    const semanticRole      = props.semanticRole ?? (isButton ? 'button'  : 'checkbox');
    const [, , isCheckable] = useTestSemantic({ tag, role: props.role, semanticTag, semanticRole }, { semanticTag: null, semanticRole: ['checkbox', 'radio'] });
    const [, , isPressable] = useTestSemantic({ tag, role: props.role, semanticTag, semanticRole }, { semanticTag: null, semanticRole: 'button' });
    const ariaChecked       = props['aria-checked'] ?? (isCheckable ? isActive : undefined);
    const ariaPressed       = props['aria-pressed'] ?? ((isPressable && isToggler) ? isActive : undefined);
    
    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            tag={tag}
            semanticTag ={semanticTag}
            semanticRole={semanticRole}
            
            aria-checked={ariaChecked}
            aria-pressed={ariaPressed}
            aria-label={props['aria-label'] ?? label}
            
            
            // accessibilities:
            active={isActive}
            press={pressFn}
            
            
            // variants:
            nude={props.nude ?? true}
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                checkVariant.class,
            ]}
            
            
            // events:
            onClick={(e) => {
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    handleToggleActive();
                    e.preventDefault();
                } // if
            }}
            onKeyDown={(e) => {
                props.onKeyDown?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        // prevents pressing space for scrolling page
                        e.preventDefault();
                    } // if
                } // if
            }}
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                } // if
            }}
        >
            <input
                // essentials:
                ref={(elm) => {
                    setRef(elmRef, elm);
                    setRef(inputRef, elm);
                }}
                
                
                // semantics:
                aria-hidden={true} // the input just for check indicator & storing value, no meaningful content here
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex : -1, // non focusable
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                checked={isActive}      // **controllable check**
                
                
                // values:
                {...{
                    name,
                    form,
                    defaultValue,
                    value,
                }}
                
                
                // validations:
                {...{
                    required,
                }}
                
                
                // formats:
                {...{
                    type,
                }}
                
                
                // events:
                onChange={(e) => {
                    onChange?.(e);
                    
                    
                    
                    // then do nothing here, just for satisfying React for controllable readonly input
                    // passing `onChange={undefined}` causing React unhappy
                }}
                onClick={(e) => e.stopPropagation()} // prevents firing `change` event triggering parent's `onClick`
            />
            { props.children && <span>
                { props.children }
            </span> }
        </EditableActionControl>
    );
}
export { Check as default }
