(() => {
  const shopApiBase = `https://${location.hostname}/s/SiteGenesis/dw/shop/v19_3/`;
  const clientId = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

  const fetchOcapiGET = async () => {
    const response = await fetch(`${shopApiBase}product_search?q=shoes&count=5&client_id=${clientId}`);
    return response.json();
  };

  const obtainTemplate = ({ placeholder, description, group1, group2, group3 }) => {
    const template = document.createElement('template');
    template.innerHTML = `
<div style="display: flex; justify-content: space-between; align-items: center;">
  <div class="slds-select_container" title="${description}">
    <select class="slds-select">
      <option value="">-- ${placeholder} --</option>
      <optgroup label="${group1}"></optgroup>
      <optgroup label="${group2}"></optgroup>
      <optgroup label="${group3}" disabled></optgroup>
    </select>
  </div>
</div>`;
    return template;
  };

  subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
    console.log('sfcc:ready', dataLocale, displayLocale, value, config);

    const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;
    const productsResponse = await fetchOcapiGET();
    const productLabels = productsResponse.hits.map(hit => `${hit.product_id} - ${hit.product_name}`);
    const { options = {}, localization = {} } = config;
    let isValid = true;

    // Append basic DOM
    const template = obtainTemplate(localization);
    const clone = document.importNode(template.content, true);
    document.body.appendChild(clone);

    // Set props
    const selectEl = document.querySelector('select');
    selectEl.required = isRequired;
    selectEl.disabled = isDisabled;

    // Set <options> from JSON config
    const optgroupEls = selectEl.querySelectorAll('optgroup');
    setOptions(options.config || [], optgroupEls[0], selectedValue);

    // Set <options> from init()
    setOptions(options.init || [], optgroupEls[1], selectedValue);

    // Set <options> from OCAPI response
    setOptions(productLabels, optgroupEls[2], selectedValue);

    // Apply change listener
    selectEl.addEventListener('change', event => {
      const val = event.target.value;
      emit({
        type: 'sfcc:value',
        payload: val ? { value: val } : null
      });
    });
  });

  function setOptions(options, optgroupEl, selectedValue) {
    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.text = option;
      optionEl.value = option;
      optionEl.selected = option === selectedValue;

      optgroupEl.appendChild(optionEl);
    });
  }
})();
