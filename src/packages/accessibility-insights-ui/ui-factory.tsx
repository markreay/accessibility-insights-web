import * as React from 'react';

import { CheckIcon } from 'common/icons/check-icon';
import { CrossIcon } from 'common/icons/cross-icon';
import { NamedFC } from 'common/react/named-fc';
import { GuidanceTitle } from 'views/content/guidance-title';
import { createMarkup, MarkupDeps } from 'views/content/markup';
import { ContentPage } from './content-page';

type UIOptions = {
    applicationTitle: string,
    setPageTitle: boolean,
};

const nullCreator = () => { };

export const UIFactory = (options: UIOptions) => {

    const getContentPage = () => {
        return NamedFC('ContentPage', props => (
            <ContentPage deps={options}>
                {props.children}
            </ContentPage>));
    };

    const getMarkup = () => {
        const markupDeps: MarkupDeps = {
            contentActionMessageCreator: {
                openContentHyperLink: nullCreator,
            },
        };
        return createMarkup(markupDeps, options);
    };

    return {
        ContentPage: getContentPage(),
        GuidanceTitle,
        Markup: getMarkup(),
        CheckIcon,
        CrossIcon,
    };
};
