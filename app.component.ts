import { ThemeCustomizerService } from '../app/components/common/theme-customizer/theme-customizer.service';
import { Location, LocationStrategy, NgIf, PathLocationStrategy } from '@angular/common';
import { Router, NavigationCancel, NavigationEnd, RouterOutlet } from '@angular/router';
import { Component, ElementRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ThemeCustomizerComponent } from './components/common/theme-customizer/theme-customizer.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ApiserviceService } from './services/apiservice.service';
import { HeaderStyleOneComponent } from './components/common/header-style-one/header-style-one.component';
declare let $: any;

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ThemeCustomizerComponent, RouterOutlet, NgIf, AppComponent, FooterComponent, HeaderStyleOneComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent {

    title: any;
    location: any;
    isToggled = false;
    routerSubscription: any;

    constructor(private router: Router, public themeService: ThemeCustomizerService, private elRef: ElementRef, private Api: ApiserviceService) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    ngOnInit() {
        this.recallJsFuntions();
        this.Api.initialize().then((res: any) => {
            var colorcodes = res[0];

            this.elRef.nativeElement.style.setProperty('--mainColor', colorcodes?.themecolor);
            this.elRef.nativeElement.style.setProperty('--paragraphColor', colorcodes?.paragraphcolor);
            this.elRef.nativeElement.style.setProperty('--black', colorcodes?.headercolor);
            this.elRef.nativeElement.style.setProperty('--sidebg', colorcodes?.sidebar_color);
        }).catch((err: any) => {
      
            this.elRef.nativeElement.style.setProperty('--mainColor', '#3389e6');
            this.elRef.nativeElement.style.setProperty('--paragraphColor', '#000000');
            this.elRef.nativeElement.style.setProperty('--black', '#ffffff');
            this.elRef.nativeElement.style.setProperty('--sidebg', '#f7fffd');
        });
    }
    recallJsFuntions() {
        this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
                this.location = this.router.url;
  

                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }

}