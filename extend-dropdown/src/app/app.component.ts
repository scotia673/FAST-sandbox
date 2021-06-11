import { Component } from '@angular/core';
import { FASTOption } from '@microsoft/fast-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'extend-dropdown';
    options = [
        { value: 's', text: 'Small' },
        { value: 'm', text: 'Medium' },
        { value: 'l', text: 'Large' },
        { value: 'xl', text: 'Extra Large' },
        { value: 'ss', text: 'Super sized' }
    ] as FASTOption[];

    onClick() {
        console.log('clicked!');
    }
}
