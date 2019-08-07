export class FormValidations {
  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      mismatch: `${fieldName} precisa ter a mesma senha.`
    };

    return config[validatorName];
  }
}
