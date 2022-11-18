import { ValidateCallback } from "element-ui/types/form";

namespace ElementUI {
  export namespace Form {
    export interface IRule {
      required?: boolean,
      message?: string,
      trigger?: 'blur' | 'change'
    }

    export interface IValidate {
      validate(callback: ValidateCallback): void
    }
  }

  export interface ISelect {
    label: string,
    value: string
  }
}

export { ElementUI }
