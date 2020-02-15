// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enzyme from 'enzyme';
import { Icon, Link } from 'office-ui-fabric-react';
import { AdHocToolsPanel, AdHocToolsPanelProps } from 'popup/components/ad-hoc-tools-panel';
import { DiagnosticViewToggleFactory } from 'popup/components/diagnostic-view-toggle-factory';
import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import { Mock, Times } from 'typemoq';
import { UIFactory } from 'packages/accessibility-insights-ui/ui-factory';

describe('accessibility-insights-ui', () => {
    describe('UIFactory', () => {

        test('Constructs', () => {
            const options = {}
            const ui = UIFactory();
        });
    });
});
