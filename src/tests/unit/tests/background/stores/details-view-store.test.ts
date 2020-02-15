// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { ContentActions } from 'background/actions/content-actions';
import { DetailsViewActions } from 'background/actions/details-view-actions';
import { PreviewFeaturesActions } from 'background/actions/preview-features-actions';
import { ScopingActions } from 'background/actions/scoping-actions';
import { DetailsViewStore } from 'background/stores/details-view-store';
import { StoreNames } from 'common/stores/store-names';
import { DetailsViewStoreData } from 'common/types/store-data/details-view-store-data';
import { DetailsViewStoreDataBuilder } from '../../../common/details-view-store-data-builder';
import { StoreTester } from '../../../common/store-tester';

describe('DetailsViewStoreTest', () => {
    test('getId', () => {
        const testObject = new DetailsViewStore(null, null, null, null);
        expect(testObject.getId()).toBe(StoreNames[StoreNames.DetailsViewStore]);
    });

    test('onSetSelectedDetailsViewRightContentPanel', () => {
        const initialState = new DetailsViewStoreDataBuilder()
            .withDetailsViewRightContentPanel('Overview')
            .build();

        const expectedState = new DetailsViewStoreDataBuilder()
            .withDetailsViewRightContentPanel('TestView')
            .build();

        createStoreTesterForDetailsViewActions('setSelectedDetailsViewRightContentPanel')
            .withActionParam('TestView')
            .testListenerToBeCalledOnce(initialState, expectedState);
    });

    test('onOpenPreviewFeatures', () => {
        const initialState = new DetailsViewStoreDataBuilder()
            .withPreviewFeaturesOpen(false)
            .build();

        const expectedState = new DetailsViewStoreDataBuilder()
            .withPreviewFeaturesOpen(true)
            .build();

        createStoreTesterForPreviewFeatureActions('openPreviewFeatures').testListenerToBeCalledOnce(
            initialState,
            expectedState,
        );
    });

    test('onClosePreviewFeatures', () => {
        const initialState = new DetailsViewStoreDataBuilder()
            .withPreviewFeaturesOpen(true)
            .build();

        const expectedState = new DetailsViewStoreDataBuilder()
            .withPreviewFeaturesOpen(false)
            .build();

        createStoreTesterForPreviewFeatureActions(
            'closePreviewFeatures',
        ).testListenerToBeCalledOnce(initialState, expectedState);
    });

    test('onOpenScoping', () => {
        const initialState = new DetailsViewStoreDataBuilder().withScopingOpen(false).build();

        const expectedState = new DetailsViewStoreDataBuilder().withScopingOpen(true).build();

        createStoreTesterForScopingActions('openScopingPanel').testListenerToBeCalledOnce(
            initialState,
            expectedState,
        );
    });

    test('onCloseScoping', () => {
        const initialState = new DetailsViewStoreDataBuilder().withScopingOpen(true).build();

        const expectedState = new DetailsViewStoreDataBuilder().withScopingOpen(false).build();

        createStoreTesterForScopingActions('closeScopingPanel').testListenerToBeCalledOnce(
            initialState,
            expectedState,
        );
    });

    test('onOpenSettings', () => {
        const initialState = new DetailsViewStoreDataBuilder().withSettingPanelState(false).build();

        const expectedState = new DetailsViewStoreDataBuilder().withSettingPanelState(true).build();

        createStoreTesterForDetailsViewActions('openSettingsPanel').testListenerToBeCalledOnce(
            initialState,
            expectedState,
        );
    });

    test('onCloseSettings', () => {
        const initialState = new DetailsViewStoreDataBuilder().withSettingPanelState(true).build();

        const expectedState = new DetailsViewStoreDataBuilder()
            .withSettingPanelState(false)
            .build();

        createStoreTesterForDetailsViewActions('closeSettingsPanel').testListenerToBeCalledOnce(
            initialState,
            expectedState,
        );
    });

    test('onOpenContent', () => {
        const initialState = new DetailsViewStoreDataBuilder().withContentOpen(false).build();

        const expectedState = new DetailsViewStoreDataBuilder()
            .withContentOpen(true, 'content/path')
            .build();

        createStoreTesterForContentActions('openContentPanel')
            .withActionParam({ contentPath: 'content/path' })
            .testListenerToBeCalledOnce(initialState, expectedState);
    });

    test('onCloseContent', () => {
        const initialState = new DetailsViewStoreDataBuilder()
            .withContentOpen(true, 'content/path')
            .build();

        const expectedState = new DetailsViewStoreDataBuilder().withContentOpen(false).build();

        createStoreTesterForContentActions('closeContentPanel').testListenerToBeCalledOnce(
            initialState,
            expectedState,
        );
    });

    function createStoreTesterForPreviewFeatureActions(
        actionName: keyof PreviewFeaturesActions,
    ): StoreTester<DetailsViewStoreData, PreviewFeaturesActions> {
        const factory = (actions: PreviewFeaturesActions) =>
            new DetailsViewStore(
                actions,
                new ScopingActions(),
                new ContentActions(),
                new DetailsViewActions(),
            );
        return new StoreTester(PreviewFeaturesActions, actionName, factory);
    }

    function createStoreTesterForScopingActions(
        actionName: keyof ScopingActions,
    ): StoreTester<DetailsViewStoreData, ScopingActions> {
        const factory = (actions: ScopingActions) =>
            new DetailsViewStore(
                new PreviewFeaturesActions(),
                actions,
                new ContentActions(),
                new DetailsViewActions(),
            );

        return new StoreTester(ScopingActions, actionName, factory);
    }

    function createStoreTesterForContentActions(
        actionName: keyof ContentActions,
    ): StoreTester<DetailsViewStoreData, ContentActions> {
        const factory = (actions: ContentActions) =>
            new DetailsViewStore(
                new PreviewFeaturesActions(),
                new ScopingActions(),
                actions,
                new DetailsViewActions(),
            );

        return new StoreTester(ContentActions, actionName, factory);
    }

    function createStoreTesterForDetailsViewActions(
        actionName: keyof DetailsViewActions,
    ): StoreTester<DetailsViewStoreData, DetailsViewActions> {
        const factory = (actions: DetailsViewActions) =>
            new DetailsViewStore(
                new PreviewFeaturesActions(),
                new ScopingActions(),
                new ContentActions(),
                actions,
            );

        return new StoreTester(DetailsViewActions, actionName, factory);
    }
});
