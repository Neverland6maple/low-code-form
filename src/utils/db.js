const FORM_VERSION_KEY = 'FORM_VERSION';
const FORM_VERSION = '1.0';

function checkVersion() {
  const version = localStorage.getItem(FORM_VERSION_KEY);
  if (version !== FORM_VERSION) {
    localStorage.setItem(FORM_VERSION_KEY, FORM_VERSION);
    resetDB();
  }
}
function resetDB() {
  setDrawingList([]);
  setFormData(null);
  setValidateForm({})
}

export function getIdGlobal() {
  return 100;
}
export function getDrawingList() {
  checkVersion();
  const drawingList = localStorage.getItem('drawingList');
  if (drawingList) {
    return JSON.parse(drawingList);
  } else {
    return [];
  }
}
export function setDrawingList(list) {
  localStorage.setItem('drawingList', JSON.stringify(list))
}
export function getFormData(data) {
  checkVersion();
  const formData = localStorage.getItem('formData');
  if (formData) {
    return JSON.parse(formData);
  } else {
    return null;
  }
}
export function setFormData(data) {
  localStorage.setItem('formData', JSON.stringify(data))
}
export function setValidateForm(form) {
  localStorage.setItem('validateForm', JSON.stringify(form))
}
export function getValidateForm(form) {
  checkVersion();
  const validateForm = localStorage.getItem('validateForm');
  if (validateForm) {
    return JSON.parse(validateForm);
  } else {
    return {};
  }
}
