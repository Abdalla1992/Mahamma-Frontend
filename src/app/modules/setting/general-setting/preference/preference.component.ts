import { LanguageService } from './../../../../@AppService/services/language.service';
import { LanguageDto } from './../../../../@AppService/models/common/language-dto';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
})
export class PreferenceComponent implements OnInit {
  languages: LanguageDto[];
  constructor(
    public translate: TranslateService,
    private languageService: LanguageService
  ) {
    // translate.addLangs(['EN', 'AR']);
    // translate.setDefaultLang('EN');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/EN|AR/) ? browserLang : 'EN');
  }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  getAllLanguages() {
    this.languageService.getAllLanguages().subscribe((response) => {
      if (response.isValidResponse) {
        this.languages = response.result.responseData;
      }
    });
  }

  // option1:string='12 Hours';
  // option2:string='24 Hours';
  // option3:string='Sunday';
  // option4:string='Monday';
  // option5:string='MM/DD/YYYY';
  // option6:string="DD/MM/YYYY";
}
