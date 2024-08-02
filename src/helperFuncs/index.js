export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export const selectStyles = {
    control: (base) => ({
        ...base,
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '0px',
        padding: '6px 0px',
        border: "none",
        borderBottom: '1px solid #50bf97',
        boxShadow: 'none',
        '&:focus': {
            border: '0 !important',
        },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#50bf97',
        color: 'white',
    }),
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "white",
        fontStyle: "Lato",
        fontWeight: 400,
        letterSpacing: "0.75px"
    }),
}