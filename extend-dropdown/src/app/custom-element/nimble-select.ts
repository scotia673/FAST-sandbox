import { FASTOption, FASTSelect, FASTTextField } from '@microsoft/fast-components';
import { attr, customElement, FASTElement, html, observable, ref, repeat, when } from '@microsoft/fast-element';
import { Select, SelectTemplate as selectTemplate } from "@microsoft/fast-foundation";

const nimbleSelectTemplate = html<NimbleSelect>`
    <fast-select
        ${ref('selectDropDown')}
        id="${x => x.id}"
        @change="${(x, c) => x.selectionChanged(c.event)}"
    >
        ${when(x => x.typeAhead, html<NimbleSelect>`
            <fast-text-field
                ${ref('typeAheadInput')}
                slot="selected-value"
                @input="${(x, c) => x.inputChanged(c.event as InputEvent)}"
                @change="${(x, c) => x.inputChangeCommitted()}"
                @onfocusin="${x => x.inputFocused()}"
            ></fast-text-field>
        `)}
        
        ${repeat(x => x.filteredOptions, html<any>`
            <fast-option value="${option => option.value}">${option => option.text}</fast-option>
        `)}
    </fast-select>
`;

@customElement({
    name: "nimble-select",
    template: nimbleSelectTemplate
})
export class NimbleSelect extends FASTElement {
    @attr options: any[] = [];
    @attr typeAhead: boolean = true;

    @observable filteredOptions: any[] = [];

    selectDropDown: FASTSelect;
    typeAheadInput: FASTTextField;

    connectedCallback() {
        super.connectedCallback();
        this.typeAheadInput.addEventListener('focus', event => {
            console.log(event);
        });
        this.typeAheadInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                console.log('input entered');
                // this.typeAheadInput.blur();
            }
        });
        this.selectDropDown.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                console.log('drop down entered');
                this.typeAheadInput
            }
        });
    }

    optionsChanged() {
        this.filteredOptions = this.options;
        // this.typeAheadInput.value = this.selectDropDown?.firstSelectedOption.text;
    }

    selectionChanged(event) {
        console.log('selection changed', event.target.selectedOptions ? event.target.selectedOptions[0].text : 'NOTHING');
        // this.typeAheadInput.blur();
        // this.typeAheadInput.value = event.target.selectedOptions ? event.target.selectedOptions[0].text : '';

        if (event.target.selectedOptions) {
            this.typeAheadInput.value = event.target.selectedOptions[0].text;
        } else {
            this.typeAheadInput.value = 'Nothing selected.'
        }
    }

    inputChanged(inputEvent: InputEvent) {
        this.selectDropDown.open = true;
        const textFieldValue = (inputEvent.target as FASTTextField).value;
        const filterResult = this.options.filter(option => option.text.toLowerCase().includes(textFieldValue.toLowerCase()));
        this.filteredOptions = filterResult.length > 0 ? filterResult : this.options;
    }

    inputChangeCommitted() {
        console.log('change committed');
        // this.typeAheadInput.blur();
        this.selectDropDown.value = this.typeAheadInput.value;
        this.filteredOptions = this.options;
    }

    inputFocused() {
        console.log('focused');
    }
}