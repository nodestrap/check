import { default as React } from 'react';
import type { Cust, PropEx } from '@cssfn/css-types';
import { TogglerActiveProps } from '@nodestrap/indicator';
import { EditableActionControlProps } from '@nodestrap/editable-action-control';
export interface CheckAnimVars {
    /**
     * final filter for the checkbox.
     */
    filter: any;
    /**
     * final transform for the checkbox.
     */
    transf: any;
    /**
     * final animation for the checkbox.
     */
    anim: any;
}
export declare const usesCheckAnim: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<CheckAnimVars>, import("@cssfn/css-var").ReadonlyDecls<CheckAnimVars>, {
    readonly filters: () => (Cust.Ref | Cust.General)[];
    readonly registerFilter: (item: Cust.Ref) => Set<Cust.Ref | Cust.General>;
    readonly unregisterFilter: (item: Cust.Ref) => boolean;
    readonly transfs: () => (Cust.Ref | Cust.General)[];
    readonly registerTransf: (item: Cust.Ref) => Set<Cust.Ref | Cust.General>;
    readonly unregisterTransf: (item: Cust.Ref) => boolean;
    readonly anims: () => (Cust.Ref | Cust.General)[];
    readonly registerAnim: (item: Cust.Ref) => Set<Cust.Ref | Cust.General>;
    readonly unregisterAnim: (item: Cust.Ref) => boolean;
}];
export interface CheckClearVars {
    filterIn: any;
    filterOut: any;
    transfIn: any;
    transfOut: any;
    anim: any;
}
/**
 * Uses check & clear states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents check & clear state definitions.
 */
export declare const usesCheckClearState: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<CheckClearVars>, import("@cssfn/css-var").ReadonlyDecls<CheckClearVars>];
export declare type CheckStyle = 'btn' | 'togglerBtn' | 'switch';
export interface CheckVariant {
    checkStyle?: CheckStyle;
}
export declare const useCheckVariant: (props: CheckVariant) => {
    class: CheckStyle | null;
};
export declare const inputElm = ":first-child";
export declare const checkElm = "::before";
export declare const labelElm = ":nth-child(1n+2)";
export declare const usesCheckLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesCheckVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesCheckStates: () => import("@cssfn/cssfn").Rule;
export declare const useCheckSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    spacing: string;
    img: string;
    switchImg: string;
    filterCheck: string[][];
    filterClear: string[][];
    transfCheck: string;
    transfClear: string;
    '@keyframes check': PropEx.Keyframes;
    '@keyframes clear': PropEx.Keyframes;
    animCheck: (string | PropEx.Keyframes)[][];
    animClear: (string | PropEx.Keyframes)[][];
    switchFilterCheck: string[][];
    switchFilterClear: string[][];
    switchTransfCheck: string[][];
    switchTransfClear: string[][];
    '@keyframes switchCheck': PropEx.Keyframes;
    '@keyframes switchClear': PropEx.Keyframes;
    switchAnimCheck: (string | PropEx.Keyframes)[][];
    switchAnimClear: (string | PropEx.Keyframes)[][];
}>, cssDecls: import("@cssfn/css-config").Decls<{
    spacing: string;
    img: string;
    switchImg: string;
    filterCheck: string[][];
    filterClear: string[][];
    transfCheck: string;
    transfClear: string;
    '@keyframes check': PropEx.Keyframes;
    '@keyframes clear': PropEx.Keyframes;
    animCheck: (string | PropEx.Keyframes)[][];
    animClear: (string | PropEx.Keyframes)[][];
    switchFilterCheck: string[][];
    switchFilterClear: string[][];
    switchTransfCheck: string[][];
    switchTransfClear: string[][];
    '@keyframes switchCheck': PropEx.Keyframes;
    '@keyframes switchClear': PropEx.Keyframes;
    switchAnimCheck: (string | PropEx.Keyframes)[][];
    switchAnimClear: (string | PropEx.Keyframes)[][];
}>, cssVals: import("@cssfn/css-config").Vals<{
    spacing: string;
    img: string;
    switchImg: string;
    filterCheck: string[][];
    filterClear: string[][];
    transfCheck: string;
    transfClear: string;
    '@keyframes check': PropEx.Keyframes;
    '@keyframes clear': PropEx.Keyframes;
    animCheck: (string | PropEx.Keyframes)[][];
    animClear: (string | PropEx.Keyframes)[][];
    switchFilterCheck: string[][];
    switchFilterClear: string[][];
    switchTransfCheck: string[][];
    switchTransfClear: string[][];
    '@keyframes switchCheck': PropEx.Keyframes;
    '@keyframes switchClear': PropEx.Keyframes;
    switchAnimCheck: (string | PropEx.Keyframes)[][];
    switchAnimClear: (string | PropEx.Keyframes)[][];
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface CheckProps extends EditableActionControlProps<HTMLInputElement>, TogglerActiveProps, CheckVariant {
    defaultChecked?: boolean;
    checked?: boolean;
    type?: 'checkbox' | 'radio';
    label?: string;
    children?: React.ReactNode;
}
export declare function Check(props: CheckProps): JSX.Element;
export { Check as default };
