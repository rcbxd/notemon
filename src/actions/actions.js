export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE';
export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';

export function logIn(firstName, lastName) {
    return { type: LOG_IN, firstName: firstName, lastName: lastName };
}

export function logOut() {
    return { type: LOG_OUT, }
}

export function loadHomePage(firstName, lastName, pageTitle) {
    return { type: LOAD_HOME_PAGE, firstName: firstName, lastName: lastName, pageTitle: pageTitle };
}

export function changePageTitle(title) {
    return { type: CHANGE_PAGE_TITLE, title: title };
}