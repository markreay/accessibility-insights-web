// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BrowserAdapter } from '../common/browser-adapters/browser-adapter';
import { Tab } from '../common/itab';
import { UrlParser } from '../common/url-parser';
import { UrlValidator } from '../common/url-validator';

export interface TargetTabInfo {
    tab: Tab;
    hasAccess: boolean;
}

export class TargetTabFinder {
    constructor(
        private readonly win: Window,
        private readonly browserAdapter: BrowserAdapter,
        private readonly urlValidator: UrlValidator,
        private readonly urlParser: UrlParser,
    ) {}

    public async getTargetTab(): Promise<TargetTabInfo> {
        const tabInfo = await this.getTabInfo();
        return await this.createTargetTabInfo(tabInfo);
    }

    private getTabInfo = (): Promise<Tab> => {
        return new Promise((resolve, reject) => {
            const tabIdInUrl = this.urlParser.getIntParam(this.win.location.href, 'tabId');

            if (isNaN(tabIdInUrl)) {
                this.browserAdapter.tabsQuery(
                    {
                        active: true,
                        currentWindow: true,
                    },
                    (tabs: Tab[]): void => {
                        resolve(tabs.pop());
                    },
                );
            } else {
                this.browserAdapter.getTab(
                    tabIdInUrl,
                    (tab: Tab) => {
                        resolve(tab);
                    },
                    () => {
                        reject(`Tab with Id ${tabIdInUrl} not found`);
                    },
                );
            }
        });
    };

    private createTargetTabInfo = async (tab: Tab): Promise<TargetTabInfo> => {
        const hasAccess = await this.urlValidator.isSupportedUrl(tab.url);
        const targetTab: TargetTabInfo = {
            tab: tab,
            hasAccess,
        };
        return targetTab;
    };
}
