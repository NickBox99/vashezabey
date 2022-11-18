import { ElementUI } from "~/types";

function getResultFormValidate(form: ElementUI.Form.IValidate) {
  let isValid = false;

  form.validate((valid: boolean) => isValid = valid);

  return isValid;
}

export { getResultFormValidate }
