import { XY, XYZ } from '../generalTypes';
declare const Utils: {
    getIn: (obj: any, keyArray: any, notSetValue?: any) => any;
    mod: (n: number, m: number) => number;
    findHighestMaxZoom: (tileLayers: any) => number;
    findLowestMinZoom: (tileLayers: any) => number;
    isInExtent: (xyz: XYZ, bb: any, projection: any) => boolean;
    clone: (obj: any) => any;
    capitalizeFirstLetter: (string: string) => string;
    getExtension: (string: string) => string;
    getRadiansPerPixel: (zoom: number) => number;
    lastTileContains: any[];
    tileContains: (xyz: any, z: number, useLast?: boolean) => any;
    tileIsContained(xyzContainer: any, xyzContained: any, useLast?: boolean): boolean;
    arrayAverage(array: any, key: string): number;
    hexToRGB(hex: string): any;
    rotatePoint(pt: any, center: any, angle: any): XY;
    rotateAroundArbAxis(object: any, axis: any, radians: any, noPremultiply?: boolean): void;
    getParamString(params: any, baseUrl: string, isUppercase?: boolean): string;
    isArray(object: any): boolean;
    setChildrenMaterialOpacity(model: any, opacity: number, recurse?: Function): void;
    setAllMaterialOpacity(model: any, opacity: any): void;
};
export default Utils;
