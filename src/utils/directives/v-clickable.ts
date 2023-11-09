import { Directive } from 'vue';

const vClickable: Directive = {
  mounted(el, binding) {
    if (binding.value === false) return;

    el.className += ' relative-position cursor-pointer q-hoverable ';

    const focusHelper = document.createElement('div');
    focusHelper.className = 'q-focus-helper';

    el.prepend(focusHelper);
  },
};

export default vClickable;
