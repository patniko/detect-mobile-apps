export interface IPullRequestChange {
  path: string,
  baseFile: any,
  sourceFile: any,
  changeType: "add" | "edit" | "delete"
}