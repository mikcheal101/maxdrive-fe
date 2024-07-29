
const UseMouse = () => {

    const setCursorToEnd = (element: HTMLElement) => {

        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);


        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);

        element.focus();
    };


    return { setCursorToEnd };
};

export default UseMouse;