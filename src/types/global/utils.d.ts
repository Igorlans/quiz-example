export {};

declare global {
    type Maybe<T> = T | null;   
    
    type NoID<T> = Omit<T, 'id'>;
    type OptionalNoID<T> = Omit<T, 'id'> | T;
}