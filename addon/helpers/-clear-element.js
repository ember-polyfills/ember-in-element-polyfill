import { helper } from "@ember/component/helper";

export default helper(function clearElement([element] /*, hash*/) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  return element;
});
