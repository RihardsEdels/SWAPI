
type IClassObject = {
    [key: string]: string;
};

export const mergeClasses: <T = IClassObject>(...classObjects: (IClassObject | undefined)[]) => T = (...classObjects) =>
    Object.assign({}, ...classObjects);
