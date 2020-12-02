export function dispatchInputEvent(inputElement: HTMLInputElement, text: string): void {
  inputElement.value = text;
  inputElement.dispatchEvent(new Event('input'));
}
