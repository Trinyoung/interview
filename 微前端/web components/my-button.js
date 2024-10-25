class MyButton extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.handleClick);
        const shadow = this.attachShadow({ mode: 'open'})
    }
    handleClick() {

    }
    render() {
        this.innerHTML = `<button>click me</button>`
    }
}

customElements.define('my-button', MyButton)