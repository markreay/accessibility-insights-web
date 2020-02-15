import * as React from 'react';

import { CheckIcon } from 'common/icons/check-icon';
import { CrossIcon } from 'common/icons/cross-icon';
import { NamedFC } from 'common/react/named-fc';
import { GuidanceTitle } from 'views/content/guidance-title';
import { createMarkup, MarkupDeps } from 'views/content/markup';
import { Page, PageDeps } from 'views/page/page';

type UIOptions = {
    applicationTitle: string,
    setPageTitle: boolean,
};

export const UIFactory = (options: UIOptions) => {

    const { applicationTitle } = options;

    const nullCreator = () => { };

    const markCool = () => <p>Mark Is Cool</p>;

    const pageDeps: PageDeps = {
        applicationTitle,
        storeActionMessageCreator: {
            getAllStates: nullCreator,
        },
        storesHub: null,
        storesActionCreator: null,
    };
    const ContentPage = NamedFC('ContentPage', props => (
        <Page deps={pageDeps}>
            <div className="content-container" >
                <div className="content-left" />
                <div className="content">
                    {props.children}
                </div>
                <div className="content-right" />
            </div>
        </Page>));

    const markupDeps: MarkupDeps = {
        contentActionMessageCreator: {
            openContentHyperLink: nullCreator,
        },
    };
    const Markup = createMarkup(markupDeps, options);

    return {
        ContentPage,
        GuidanceTitle,
        Markup,
        CheckIcon,
        CrossIcon,
    };
};
