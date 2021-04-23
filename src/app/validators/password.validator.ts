import { FormGroup } from "@angular/forms";

export class PasswordValidator {
  public static Match(firstControlName: string, secondControlName: string) {
    return (group: FormGroup) => {
      const firstControlValue = group.get(firstControlName)?.value;
      const secondControlValue = group.get(secondControlName)?.value;

      if (firstControlValue !== secondControlValue) {
        group.get(secondControlName)?.setErrors({ matchFields: true });
        return { notSame: true };
      }

      return null;
    };
  }
}
