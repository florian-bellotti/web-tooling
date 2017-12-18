// vendors
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Location } from '@angular/common';

// imports
import {AppState } from '../app.state';

@Component({
  selector: 'app-template',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  providers: [AppState]
})
export class TemplateComponent implements OnInit {
    public isMenuCollapsed = false;

    constructor(private _state: AppState, private _location: Location) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    ngOnInit() {
        this.getCurrentPageName();
    }

    public getCurrentPageName() {
        const url = this._location.path();
        const hash = (window.location.hash) ? '#' : '';
        setTimeout(function(){
            const subMenu = jQuery('a[href="' + hash + url + '"]').closest('li').closest('ul');
            window.scrollTo(0, 0);
            subMenu.closest('li').addClass('sidebar-item-expanded');
            subMenu.slideDown(250);
        });
    }

    public hideMenu() {
        this._state.notifyDataChanged('menu.isCollapsed', true);
    }
}
