export function modalPopupContainer(triggerNode: HTMLElement): HTMLElement {
  return (triggerNode.closest('.ant-modal-content') as HTMLElement) ?? document.body
}
