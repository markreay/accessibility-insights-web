// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BaseStore } from 'common/base-store';
import { BrowserAdapter } from 'common/browser-adapters/browser-adapter';
import { EnvironmentInfo } from 'common/environment-info-provider';
import { CreateIssueDetailsTextData } from 'common/types/create-issue-details-text-data';
import { IssueFilingServicePropertiesMap, UserConfigurationStoreData } from 'common/types/store-data/user-configuration-store';
import { IssueFilingControllerImpl } from 'issue-filing/common/issue-filing-controller-impl';
import { IssueFilingServiceProvider } from 'issue-filing/issue-filing-service-provider';
import { IssueFilingService } from 'issue-filing/types/issue-filing-service';
import { Mock } from 'typemoq';

describe('IssueFilingControllerImpl', () => {
    it('fileIssue', async () => {
        const serviceKey = 'test-service';
        const issueData = {
            targetApp: {},
        } as CreateIssueDetailsTextData;
        const environmentInfoStub: EnvironmentInfo = {
            axeCoreVersion: 'test axe version',
            browserSpec: 'test browser spec',
            extensionVersion: 'test extension version',
        };
        const testUrl = 'test-url';
        const map: IssueFilingServicePropertiesMap = {
            [serviceKey]: {
                repository: testUrl,
            },
        };
        const serviceConfig = { bugServicePropertiesMap: map } as UserConfigurationStoreData;

        const browserAdapterMock = Mock.ofType<BrowserAdapter>();
        const issueFilingServiceMock = Mock.ofType<IssueFilingService>();
        issueFilingServiceMock
            .setup(service => service.fileIssue(browserAdapterMock.object, map, issueData, environmentInfoStub))
            .returns(() => Promise.resolve());

        const providerMock = Mock.ofType<IssueFilingServiceProvider>();
        providerMock.setup(provider => provider.forKey(serviceKey)).returns(() => issueFilingServiceMock.object);

        const storeMock = Mock.ofType<BaseStore<UserConfigurationStoreData>>();
        storeMock.setup(store => store.getState()).returns(() => serviceConfig);

        const testSubject = new IssueFilingControllerImpl(
            providerMock.object,
            browserAdapterMock.object,
            environmentInfoStub,
            storeMock.object,
        );

        await expect(testSubject.fileIssue(serviceKey, issueData)).resolves.toBe(undefined);

        browserAdapterMock.verifyAll();
    });
});
