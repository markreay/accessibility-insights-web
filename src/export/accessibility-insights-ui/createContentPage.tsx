import * as React from 'react';

import { link } from 'content/link';
import { ContentCreator } from 'views/content/content-page';
import { Page } from 'views/page/page';

const createOriginal = ContentCreator(link);

type SingleParameter<T> = T extends (props: infer P) => any ? P : never;
type ContentRenderer = SingleParameter<typeof createOriginal>;
type Options = { applicationTitle: string };

export const create = (options: Options, props: ContentRenderer) => {
    const ContentPage = createOriginal(props);

    const { applicationTitle } = options;

    const deps = {
        applicationTitle,
        contentActionMessageCreator: () => { },
    };

    const page = <Page deps={deps as any}>
        <div className="content-container" >
            <div className="content-left" />
            <div className="content" >
                <ContentPage deps={deps as any} options={{ setPageTitle: true }} />
            </div>
            < div className="content-right" />
        </div>
    </Page>;

    return () => page;
};
