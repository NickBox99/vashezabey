import { ValidateCallback } from "element-ui/types/form";

export namespace ElementUI {
  export namespace Form {

    export interface IRules {
      [key: string]: IRule[]
    }

    export interface IRule {
      required?: boolean,
      message?: string,
      trigger?: 'blur' | 'change'
    }

    export interface IValidate {
      validate(callback: ValidateCallback): void
    }
  }

  export interface IUpload {
    clearFiles(): void,
    uploadFiles: File[]
  }

  export interface ISelect {
    label: string,
    value: string
  }
}
