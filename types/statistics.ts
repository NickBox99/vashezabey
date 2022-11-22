export namespace Statistics {
  export interface IElement {
    label: string,
    value: number,
    dateTime: number
  }

  export interface IOptionsValues {
    labels: string[],
    data: number[]
  }
}
