export class DiplomaManager {
    openAlgebra: boolean = false;
    openGeometrie: boolean = false;
    openRomana: boolean = false;

    setOpenAlgebra: ((a: boolean) => void) = () => {};
    setOpenGeometrie: ((a: boolean) => void) = () => {};
    setOpenRomana: ((a: boolean) => void) = () => {};

    constructor() {
    }
}