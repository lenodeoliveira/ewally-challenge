
export interface CodeValidator {
  validate: (code: string) => Error
}
