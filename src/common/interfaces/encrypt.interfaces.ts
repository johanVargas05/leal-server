export interface Encrypt {
    hash(password:string|Buffer, saltOrRounds:string|number): string;

    compare(password:string|Buffer, encrypted:string ): boolean;
}