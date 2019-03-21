// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { link } from '../content/link';
import { DictionaryStringTo } from '../types/common-types';
import { HyperlinkDefinition } from '../views/content/content-page';

const BestPractice: HyperlinkDefinition = {
    text: 'Best Practice',
    href: '',
};

export const ruleToLinkConfiguration: DictionaryStringTo<HyperlinkDefinition[]> = {
    'area-alt': [link.WCAG_1_1_1],
    'image-alt': [link.WCAG_1_1_1],
    'image-redundant-alt': [BestPractice],
    'input-image-alt': [link.WCAG_1_1_1],
    'object-alt': [link.WCAG_1_1_1],
    'link-name': [link.WCAG_2_4_4, link.WCAG_4_1_2],
    'audio-caption': [link.WCAG_1_2_1],
    'video-caption': [link.WCAG_1_2_2],
    'video-description': [link.WCAG_1_2_5],
    'aria-required-children': [link.WCAG_1_3_1],
    'aria-required-parent': [link.WCAG_1_3_1],
    checkboxgroup: [BestPractice],
    'definition-list': [link.WCAG_1_3_1],
    dlitem: [link.WCAG_1_3_1],
    'empty-heading': [BestPractice],
    'layout-table': [link.WCAG_1_3_1],
    list: [link.WCAG_1_3_1],
    listitem: [link.WCAG_1_3_1],
    'p-as-heading': [BestPractice],
    radiogroup: [BestPractice],
    'table-duplicate-name': [BestPractice],
    'table-fake-caption': [BestPractice],
    'td-has-header': [BestPractice],
    'td-headers-attr': [link.WCAG_1_3_1],
    'th-has-data-cells': [link.WCAG_1_3_1],
    'aria-roles': [link.WCAG_1_3_1, link.WCAG_4_1_1, link.WCAG_4_1_2],
    'aria-valid-attr-value': [link.WCAG_4_1_1, link.WCAG_4_1_2],
    'link-in-text-block': [BestPractice],
    'color-contrast': [link.WCAG_1_4_3],
    'meta-viewport-large': [BestPractice],
    'meta-viewport': [link.WCAG_1_4_4],
    accesskeys: [link.WCAG_2_1_1],
    'server-side-image-map': [link.WCAG_2_1_1],
    'meta-refresh': [link.WCAG_2_2_1],
    blink: [link.WCAG_2_2_2],
    marquee: [link.WCAG_2_2_2],
    bypass: [link.WCAG_2_4_1],
    'frame-title': [link.WCAG_2_4_1],
    'document-title': [link.WCAG_2_4_2],
    tabindex: [BestPractice],
    'html-has-lang': [link.WCAG_3_1_1],
    'html-lang-valid': [link.WCAG_3_1_1],
    'valid-lang': [link.WCAG_3_1_2],
    label: [link.WCAG_1_3_1, link.WCAG_3_3_2],
    'aria-valid-attr': [link.WCAG_4_1_1],
    'duplicate-id': [link.WCAG_4_1_1],
    'scope-attr-valid': [BestPractice],
    'aria-allowed-attr': [link.WCAG_4_1_1, link.WCAG_4_1_2],
    'aria-required-attr': [link.WCAG_4_1_1, link.WCAG_4_1_2],
    'aria-hidden-body': [link.WCAG_4_1_2],
    'button-name': [link.WCAG_4_1_2],
    'frame-title-unique': [BestPractice],
    'heading-order': [BestPractice],
    'hidden-content': [BestPractice],
    'href-no-hash': [BestPractice],
    'label-title-only': [BestPractice],
    region: [BestPractice],
    'skip-link': [BestPractice],
    'unique-landmark': [link.WCAG_2_4_1, BestPractice],
    'landmark-main-is-top-level': [link.WCAG_1_3_1, BestPractice],
    'landmark-one-main': [BestPractice],
    'aria-dpub-role-fallback': [BestPractice],
    'focus-order-semantics': [BestPractice],
    'frame-tested': [BestPractice],
    'landmark-banner-is-top-level': [link.WCAG_1_3_1, BestPractice],
    'landmark-contentinfo-is-top-level': [link.WCAG_1_3_1, BestPractice],
    'landmark-no-duplicate-banner': [link.WCAG_1_3_1],
    'landmark-no-duplicate-contentinfo': [link.WCAG_1_3_1],
    'page-has-heading-one': [BestPractice],
    'duplicate-id-active': [link.WCAG_4_1_1],
    'duplicate-id-aria': [link.WCAG_4_1_1],
    'html-xml-lang-mismatch': [link.WCAG_3_1_1],
    'get-frame-title': [link.WCAG_4_1_2],
    'page-title': [link.WCAG_2_4_2],
    'aria-allowed-role': [BestPractice],
    'autocomplete-valid': [BestPractice],
    'css-orientation-lock': [BestPractice],
    'aria-hidden-focus': [link.WCAG_4_1_2],
    'form-field-multiple-labels': [BestPractice],
    'label-content-name-mismatch': [BestPractice],
    'landmark-complementary-is-top-level': [link.WCAG_1_3_1, BestPractice],
};
