import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LanguageDto } from '../../@AppService/models/common/language-dto';

@Injectable({ providedIn: 'root' })
export class LanguageHandler {
    private langName: string = 'Mahamma-currentLanguage';
    constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    }
    public GetLanguageId(): number {
        let langId: number = 1;
        const langObj = this.getLanguageModel();

        if (langObj !== null && langObj !== undefined) {
            langId = langObj.id;
        }

        return langId;
    }


    getLanguageAlias(): string {
        let langDto = this.getLanguageModel();
        if (langDto) {
            return langDto.alias.toUpperCase();
        } else {
            return 'EN';
        }
    }

    private getLanguageModel(): LanguageDto {

        let currentLanguage = localStorage.getItem(this.langName)
        let langObj: LanguageDto = {
            alias: '',
            id: 0,
            isRtl: false,
            isDefault: false,
            name: ''
        };
        if (currentLanguage) {
            const langStorage = JSON.parse(currentLanguage);

            if (langStorage !== null && langStorage !== undefined) {
                langObj = (langStorage as unknown) as LanguageDto;
            }
        }
        return langObj;
    }

    public Setlanguage(lang: LanguageDto): void {
        lang.alias = lang.alias.toUpperCase();
        localStorage.setItem(this.langName, JSON.stringify(lang));
    }
    changeLanguge(lang: LanguageDto) {

        let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
        let body = this.document.getElementsByTagName("body")[0] as HTMLBodyElement;
        if (lang.isRtl) {
          htmlTag.dir = "rtl"
          body.classList.toggle('rtl')
        } else {
          htmlTag.dir = "ltr"
          body.classList.toggle('rtl')
        }
        htmlTag.lang = lang.alias.toLowerCase() === "ar" ? "ar" : "en";
        this.translate.setDefaultLang(lang.alias.toUpperCase());
        this.translate.use(lang.alias.toUpperCase());
        //this.changeCssFile(lang.alias.toLowerCase());
    }
    changeCssFile(lang: string) {
        let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
        let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
        let bundleName = lang === "ar" ? "arStyle.scss" : "enStyle.scss";
        if (existingLink) {
            existingLink.href = bundleName;
        } else {
            let newLink = this.document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.type = "text/css";
            newLink.id = "langCss";
            newLink.href = bundleName;
            headTag.appendChild(newLink);
        }
    }
}
