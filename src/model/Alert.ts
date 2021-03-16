export default interface Alert {
    errorId: string, 
    errorSeverity: string,
    errorCategory: string, 
    errorMessage: string, 
    longMessage: string,
    errorTime: number,
    selected: boolean,
    new: boolean,
    expanded: boolean
}