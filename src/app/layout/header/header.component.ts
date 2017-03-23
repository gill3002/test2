import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ng2-webstorage';

import { AuthService, UserService } from '../../auth/services/';
import { LocaleInterface } from '../../shared/translation/';
import { HeaderComponentResolveInterface } from './interfaces/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public user: any;
  public locales: Array<LocaleInterface>;

  /**
   * Constructor of the class.
   *
   * @param {AuthService}         authService
   * @param {ActivatedRoute} activatedRoute
   * @param {LocalStorageService} localStorage
   * @param {UserService}         userService
   * @param {TranslateService}    translateService
   */
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private userService: UserService,
    private translateService: TranslateService
  ) { }

  /**
   * On component init we need to store current user and make a subscription for token changes so that we
   * get user value to update within login / logout states.
   */
  public ngOnInit(): void {
    this.initializeUser();

    this.localStorage
      .observe('token')
      .subscribe(() => { this.initializeUser(); });

    // Store locales from route resolve
    this.activatedRoute.data.subscribe((data: HeaderComponentResolveInterface) => {
      this.locales = data.locales;
    });
  }

  /**
   * Method to change current language.
   *
   * @param {LocaleInterface} locale
   */
  public changeLocale(locale: LocaleInterface): void {
    this.translateService.use(locale.code);
  }

  /**
   * Helper method to fetch user profile data.
   */
  private initializeUser(): void {
    this.user = this.userService.profile();
  }
}
