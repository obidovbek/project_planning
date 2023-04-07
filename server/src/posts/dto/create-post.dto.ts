export class CreatePostDto {
    readonly goal: string[] | string;
    readonly projPass: string[] | string;
    readonly tasks: string[] | string; 
    readonly kafed: string[] | string; 
    readonly conDep: string[] | string; 
    readonly spinOf: string[] | string; 
    readonly title: string;
    readonly owner: string;
    readonly cost: string;
    readonly workplace: string;
    readonly review: object;
}
