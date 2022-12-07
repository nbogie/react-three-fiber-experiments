import { Group, Object3D } from 'three';

//not crucial.  generates textual report of the model structure 




export function dumpObjectToConsoleAsString(root: Group) {
    console.log(dumpObjectToTextLines(root).join("\n"));
}
//types might not be quite right...

export function dumpObjectToTextLines(obj: Object3D, lines = [], isLast = true, prefix = '') {
    if (!obj || !obj.children) {
        return lines;
    }
    const localPrefix = isLast ? '└─' : '├─';
    //@ts-ignore
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child: Object3D, ndx: number) => {
        const isLast = ndx === lastNdx;
        dumpObjectToTextLines(child, lines, isLast, newPrefix);
    });
    return lines;
}
