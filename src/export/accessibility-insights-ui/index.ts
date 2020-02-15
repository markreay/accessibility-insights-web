import * as react from 'react';
export const React = react;

export { GuidanceTitle } from 'views/content/guidance-title';
export { Page } from 'views/page/page';
export { Content } from 'views/content/content';

import common from 'common/styles/common.scss';
import content from 'views/content/content.scss';
import page from 'views/page/page.scss';
export const css = [common, page, content];

export { create } from './createContentPage';

export { UIFactory } from './ui';
