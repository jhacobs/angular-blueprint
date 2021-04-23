import { FormGroup, ValidationErrors } from "@angular/forms";

export class RequiredIfValidator {
  public static match(controlName: string, expression: boolean): ValidationErrors | null {
    return (group: FormGroup) => {
      const controlValue = group.get(controlName)?.value;

      if (!expression) {
        return null;
      }

      if (expression && controlValue !== undefined && controlValue !== "" && controlValue !== []) {
        return null;
      }

      return { requiredIf: true };
    };
  }
}
