import * as React from 'react';

import { NamedFC } from 'common/react/named-fc';
import { Page, PageDeps } from 'views/page/page';

type ContentPageDeps = Pick<PageDeps, 'applicationTitle'>;
type ContentPageProps = { deps: ContentPageDeps };

const nullCreator = () => { };

export const ContentPage = NamedFC<ContentPageProps>('ContentPage', props => {

    const { deps, children } = props;

    const pageDeps: PageDeps = {
        ...deps,
        storeActionMessageCreator: {
            getAllStates: nullCreator,
        },
        storesHub: null,
        storesActionCreator: null,
    };

    return (<Page deps={pageDeps}>
        <div className="content-container">
            <div className="content-left" />
            <div className="content">
                {children}
            </div>
            <div className="content-right" />
        </div>
    </Page>);
});
