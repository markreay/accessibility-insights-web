// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IToggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { ContentLink, ContentLinkDeps } from 'views/content/content-link';
import { VisualizationToggle } from '../../common/components/visualization-toggle';
import { VisualizationConfiguration } from '../../common/configs/visualization-configuration';
import { VisualizationConfigurationFactory } from '../../common/configs/visualization-configuration-factory';
import { KeyCodeConstants } from '../../common/constants/keycode-constants';
import { TelemetryEventSource } from '../../common/extension-telemetry-events';
import { DetailsViewPivotType } from '../../common/types/details-view-pivot-type';
import { VisualizationStoreData } from '../../common/types/store-data/visualization-store-data';
import { VisualizationType } from '../../common/types/visualization-type';
import { DictionaryStringTo } from '../../types/common-types';
import { PopupActionMessageCreator } from '../actions/popup-action-message-creator';
import { DiagnosticViewClickHandler } from '../handlers/diagnostic-view-toggle-click-handler';

export interface DiagnosticViewToggleProps {
    deps: DiagnosticViewToggleDeps;
    featureFlags: DictionaryStringTo<boolean>;
    visualizationType: VisualizationType;
    visualizationConfigurationFactory: VisualizationConfigurationFactory;
    visualizationStoreData: VisualizationStoreData;
    actionMessageCreator: PopupActionMessageCreator;
    clickHandler: DiagnosticViewClickHandler;
    shortcutCommands: chrome.commands.Command[];
    telemetrySource: TelemetryEventSource;
    dom: Document;
}

export type DiagnosticViewToggleDeps = ContentLinkDeps;

export interface DiagnosticViewToggleState {
    isFocused: boolean;
}

export class DiagnosticViewToggle extends React.Component<
    DiagnosticViewToggleProps,
    DiagnosticViewToggleState
> {
    private configuration: VisualizationConfiguration;
    private toggle: React.RefObject<IToggle> = React.createRef<IToggle>();
    private dom: Document;
    private userEventListenerAdded: boolean;

    // Must be consistent with internal react naming for same property to work
    // tslint:disable-next-line: variable-name
    private _isMounted: boolean;

    constructor(props: DiagnosticViewToggleProps) {
        super(props);
        this.configuration = this.props.visualizationConfigurationFactory.getConfiguration(
            this.props.visualizationType,
        );
        this.dom = this.props.dom;
        this._isMounted = false;
        this.userEventListenerAdded = false;
        this.state = {
            isFocused: false,
        };
    }

    public render(): JSX.Element {
        const displayableData = this.configuration.displayableData;
        const shortcut = this.getCommandShortcut();
        return (
            <div>
                <div className="ms-Grid-row view-toggle-row">
                    <div className="ms-Grid-col ms-sm7">
                        <div className="ms-fontColor-neutralPrimary ms-fontWeight-semibold ms-fontSize-mPlus">
                            {displayableData.title}
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm5 view-toggle-col" style={{ float: 'right' }}>
                        {this.renderToggleOrSpinner()}
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8">
                        {this.renderLink(displayableData.linkToDetailsViewText)}
                    </div>
                    <div className="ms-Grid-col ms-sm4 shortcut-label" style={{ float: 'right' }}>
                        <div className="ms-font-xs">{shortcut}</div>
                    </div>
                </div>
            </div>
        );
    }

    private renderToggleOrSpinner(): JSX.Element {
        const scanning = this.props.visualizationStoreData.scanning;
        const id = this.configuration.getIdentifier();
        const scanData = this.configuration.getStoreData(this.props.visualizationStoreData.tests);

        if (scanning === id) {
            return <Spinner size={SpinnerSize.small} componentRef={this.addUserEventListener} />;
        } else {
            const disabled = scanning != null;
            return (
                <VisualizationToggle
                    checked={scanData.enabled}
                    disabled={disabled}
                    onClick={ev =>
                        this.props.clickHandler.toggleVisualization(
                            this.props.visualizationStoreData,
                            this.props.visualizationType,
                            ev,
                        )
                    }
                    visualizationName={this.configuration.displayableData.title}
                    componentRef={this.toggle}
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                />
            );
        }
    }

    public componentDidMount(): void {
        this._isMounted = true;
        this.setFocus();
    }

    public componentDidUpdate(): void {
        this.setFocus();
    }

    private setFocus(): void {
        if (this._isMounted && this.state.isFocused && this.toggle.current) {
            this.toggle.current.focus();
        }
    }

    private onFocusHandler = (): void => {
        if (this._isMounted) {
            this.setState({
                isFocused: true,
            });
        }
    };

    private onBlurHandler = (): void => {
        if (this._isMounted) {
            this.setState({
                isFocused: false,
            });
        }
    };

    private addUserEventListener = (): void => {
        if (!this.userEventListenerAdded) {
            this.dom.addEventListener('keydown', (event: any) => {
                if (event.keyCode === KeyCodeConstants.TAB) {
                    this.onBlurHandler();
                }
            });

            const hamburgerButton = this.dom.querySelector('.feedback-collapse-menu-button');
            if (hamburgerButton != null) {
                hamburgerButton.addEventListener('click', event => {
                    this.onBlurHandler();
                });
            }

            this.userEventListenerAdded = true;
        }
    };

    private renderLink(linkText: string): JSX.Element {
        if (this.configuration.guidance) {
            return (
                <ContentLink
                    deps={this.props.deps}
                    reference={this.configuration.guidance}
                    linkText={linkText}
                />
            );
        }

        return (
            <Link
                className="insights-link"
                href="#"
                onClick={ev =>
                    this.props.actionMessageCreator.openDetailsView(
                        ev,
                        this.props.visualizationType,
                        this.props.telemetrySource,
                        DetailsViewPivotType.fastPass,
                    )
                }
            >
                {linkText}
            </Link>
        );
    }

    private getCommandShortcut(): string {
        const commandName: string = this.configuration.chromeCommand;

        for (const command of this.props.shortcutCommands) {
            if (command.name === commandName) {
                return command.shortcut;
            }
        }

        throw new Error(`Cannot find command for name: ${commandName}`);
    }
}
