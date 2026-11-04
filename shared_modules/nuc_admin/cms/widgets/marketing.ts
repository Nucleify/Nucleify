import {
  sectionLayoutFields,
  stringRowFields,
  tabsFields,
} from './layout_fields'
import type { WidgetDefinition } from '../registry'

import { defaultPropsForWidget } from '../defaults/marketing_props'

const railOnly: WidgetDefinition['propsSchema'] = {
  railLabel: { type: 'string' },
}

export const homeCloneWidget: WidgetDefinition = {
  type: 'section.clone',
  label: 'Clone',
  webComponentKey: 'sections/clone',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.clone'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'cloneEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'cloneTitleLead', label: 'Title lead' },
      { type: 'text', name: 'cloneTitleTrail', label: 'Title trail' },
      { type: 'textarea', name: 'cloneSupport', label: 'Support' },
      { type: 'text', name: 'cloneCta', label: 'Primary CTA' },
      { type: 'text', name: 'cloneCtaNext', label: 'Next CTA' },
      { type: 'text', name: 'heroInstallLabel', label: 'Terminal label' },
    ],
    [
      {
        type: 'array',
        name: 'installSteps',
        label: 'Install commands',
        fields: stringRowFields,
      },
    ]
  ),
}

export const homeStackWidget: WidgetDefinition = {
  type: 'section.stack',
  label: 'Stack',
  webComponentKey: 'sections/stack',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.stack'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'stackEyebrow', label: 'Eyebrow' },
      { type: 'textarea', name: 'stackTitle', label: 'Title' },
      { type: 'textarea', name: 'stackSupport', label: 'Support' },
      { type: 'text', name: 'stackCta', label: 'CTA' },
      { type: 'text', name: 'stackStageLabel', label: 'Stage label' },
    ],
    [
      {
        type: 'array',
        name: 'items',
        label: 'Frameworks',
        fields: [
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'detail', label: 'Detail' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'color', label: 'Color' },
          { type: 'text', name: 'command', label: 'Command' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showStage',
        label: 'Show stage',
        defaultValue: true,
      },
    ]
  ),
}

export const homeCompilerDemoWidget: WidgetDefinition = {
  type: 'section.compiler_demo',
  label: 'Compiler demo',
  webComponentKey: 'sections/compiler_demo',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.compiler_demo'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'compilerEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'compilerTitleLead', label: 'Title lead' },
      { type: 'text', name: 'compilerTitleTrail', label: 'Title trail' },
      { type: 'textarea', name: 'compilerSupport', label: 'Support' },
      { type: 'text', name: 'compilerCta', label: 'CTA' },
      { type: 'text', name: 'compilerHub', label: 'Hub label' },
      { type: 'text', name: 'compilerHubLabel', label: 'Hub caption' },
      { type: 'text', name: 'compilerEmitLabel', label: 'Emit label' },
      { type: 'text', name: 'sourceFile', label: 'Source file' },
      { type: 'textarea', name: 'sourceSnippet', label: 'Source snippet' },
    ],
    [
      {
        type: 'array',
        name: 'nodes',
        label: 'Emit targets',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'color', label: 'Color' },
          { type: 'text', name: 'command', label: 'Command' },
          { type: 'text', name: 'file', label: 'Emit file' },
          { type: 'textarea', name: 'snippet', label: 'Snippet' },
          { type: 'number', name: 'x', label: 'X %' },
          { type: 'number', name: 'y', label: 'Y %' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showBoard',
        label: 'Show emit board',
        defaultValue: true,
      },
    ]
  ),
}

export const homePulseWidget: WidgetDefinition = {
  type: 'section.pulse',
  label: 'Pulse',
  webComponentKey: 'sections/pulse',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.pulse'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'pulseEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'pulseTitleLead', label: 'Title lead' },
      { type: 'text', name: 'pulseTitleTrail', label: 'Title trail' },
      { type: 'textarea', name: 'pulseSupport', label: 'Support' },
      { type: 'textarea', name: 'pulseCompare', label: 'Compare note' },
      { type: 'text', name: 'pulseCta', label: 'CTA' },
      { type: 'text', name: 'pulseShellsAxis', label: 'Shells axis' },
      {
        type: 'text',
        name: 'pulseTraditionalLabel',
        label: 'Traditional label',
      },
      { type: 'text', name: 'pulseNucleifyLabel', label: 'Nucleify label' },
      { type: 'text', name: 'pulseCostSuffix', label: 'Cost suffix' },
      { type: 'text', name: 'pulseUnitLabel', label: 'Unit label' },
      { type: 'text', name: 'pulseStatus', label: 'Status' },
      { type: 'text', name: 'pulseScaling', label: 'Scaling label' },
    ],
    [
      {
        type: 'array',
        name: 'shells',
        label: 'Framework shells',
        fields: stringRowFields,
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showChart',
        label: 'Show cost chart',
        defaultValue: true,
      },
    ]
  ),
}

export const homeCloseWidget: WidgetDefinition = {
  type: 'section.close',
  label: 'Close / contact',
  webComponentKey: 'sections/close',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.close'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'closeTitle', label: 'Title' },
      { type: 'textarea', name: 'closeSupport', label: 'Support' },
      { type: 'text', name: 'closeCta', label: 'CTA' },
      { type: 'text', name: 'closeModalTitle', label: 'Modal title' },
      { type: 'textarea', name: 'closeModalSupport', label: 'Modal support' },
      { type: 'text', name: 'closeNameLabel', label: 'Name label' },
      { type: 'text', name: 'closeNamePlaceholder', label: 'Name placeholder' },
      { type: 'text', name: 'closeEmailLabel', label: 'Email label' },
      {
        type: 'text',
        name: 'closeEmailPlaceholder',
        label: 'Email placeholder',
      },
      { type: 'text', name: 'closeTypeLabel', label: 'Type label' },
      {
        type: 'text',
        name: 'closeTypePlaceholder',
        label: 'Type placeholder',
      },
      { type: 'text', name: 'closeNoteLabel', label: 'Note label' },
      {
        type: 'text',
        name: 'closeNotePlaceholder',
        label: 'Note placeholder',
      },
      { type: 'text', name: 'closeSubmit', label: 'Submit' },
      { type: 'text', name: 'closeCancel', label: 'Cancel' },
      { type: 'text', name: 'closeSending', label: 'Sending' },
      { type: 'text', name: 'closeSuccess', label: 'Success' },
      { type: 'text', name: 'closeErrorGeneric', label: 'Error generic' },
      { type: 'text', name: 'closeErrorEmail', label: 'Error email' },
      { type: 'text', name: 'closeErrorType', label: 'Error type' },
      { type: 'text', name: 'closeErrorMessage', label: 'Error message' },
    ],
    [
      {
        type: 'array',
        name: 'contactTypes',
        label: 'Contact types',
        fields: [
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'value', label: 'Value' },
        ],
      },
    ]
  ),
}

export const investorIntroWidget: WidgetDefinition = {
  type: 'section.intro',
  label: 'Intro',
  webComponentKey: 'sections/intro',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.intro'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'brand', label: 'Brand' },
      { type: 'text', name: 'heroEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'headline', label: 'Headline' },
      { type: 'textarea', name: 'support', label: 'Support' },
      { type: 'text', name: 'ctaPrimary', label: 'Primary CTA' },
      { type: 'text', name: 'ctaSecondary', label: 'Secondary CTA' },
      { type: 'text', name: 'ctaTertiary', label: 'Tertiary CTA' },
      { type: 'text', name: 'githubHref', label: 'GitHub URL' },
    ],
    [
      {
        type: 'group',
        name: 'glance',
        label: 'Glance plate',
        fields: [
          { type: 'text', name: 'eyebrow', label: 'Eyebrow' },
          { type: 'text', name: 'from', label: 'From' },
          { type: 'text', name: 'to', label: 'To' },
          { type: 'text', name: 'fromLabel', label: 'From label' },
          { type: 'text', name: 'toLabel', label: 'To label' },
          { type: 'text', name: 'figure', label: 'Figure' },
          { type: 'text', name: 'figureLead', label: 'Figure lead' },
          { type: 'text', name: 'figureTrail', label: 'Figure trail' },
          { type: 'text', name: 'figureUnit', label: 'Figure unit' },
          { type: 'text', name: 'line', label: 'Line' },
          { type: 'text', name: 'note', label: 'Note' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showGlance',
        label: 'Show glance plate',
        defaultValue: true,
      },
    ]
  ),
}

export const investorThesisWidget: WidgetDefinition = {
  type: 'section.thesis',
  label: 'Thesis',
  webComponentKey: 'sections/thesis',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.thesis'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'thesisEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'thesisTitle', label: 'Title' },
      { type: 'textarea', name: 'thesisSupport', label: 'Support' },
      { type: 'text', name: 'thesisCta', label: 'CTA' },
    ],
    [
      {
        type: 'array',
        name: 'items',
        label: 'Thesis cards',
        fields: [
          { type: 'text', name: 'index', label: 'Index' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'textarea', name: 'body', label: 'Body' },
          { type: 'text', name: 'outcome', label: 'Outcome' },
          { type: 'text', name: 'proof', label: 'Proof' },
        ],
      },
      {
        type: 'array',
        name: 'shells',
        label: 'Shells (donut)',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'detail', label: 'Detail' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'color', label: 'Color' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showChart',
        label: 'Show chart',
        defaultValue: true,
      },
    ]
  ),
}

export const investorSavingsWidget: WidgetDefinition = {
  type: 'section.savings',
  label: 'Savings',
  webComponentKey: 'sections/savings',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.savings'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'savingsEyebrow', label: 'Eyebrow' },
      { type: 'textarea', name: 'savingsTitle', label: 'Title' },
      { type: 'textarea', name: 'savingsSupport', label: 'Support' },
      { type: 'text', name: 'savingsCta', label: 'CTA' },
      { type: 'text', name: 'savingsNote', label: 'Note' },
    ],
    [
      {
        type: 'array',
        name: 'items',
        label: 'Savings metrics',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'value', label: 'Value' },
          { type: 'text', name: 'unit', label: 'Unit' },
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'textarea', name: 'detail', label: 'Detail' },
        ],
      },
    ]
  ),
}

export const investorWedgeWidget: WidgetDefinition = {
  type: 'section.wedge',
  label: 'Wedge',
  webComponentKey: 'sections/wedge',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.wedge'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'wedgeEyebrow', label: 'Eyebrow' },
      { type: 'textarea', name: 'wedgeTitle', label: 'Title' },
      { type: 'textarea', name: 'wedgeSupport', label: 'Support' },
    ],
    [
      {
        type: 'array',
        name: 'items',
        label: 'Phases',
        fields: [
          { type: 'text', name: 'phase', label: 'Phase' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'textarea', name: 'body', label: 'Body' },
          { type: 'text', name: 'signal', label: 'Signal' },
        ],
      },
    ]
  ),
}

export const investorSurfaceWidget: WidgetDefinition = {
  type: 'section.surface',
  label: 'Surface',
  webComponentKey: 'sections/surface',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.surface'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'surfaceEyebrow', label: 'Eyebrow' },
      { type: 'text', name: 'surfaceTitle', label: 'Title' },
      { type: 'textarea', name: 'surfaceSupport', label: 'Support' },
      { type: 'text', name: 'surfaceTabsLabel', label: 'Tabs label' },
      { type: 'text', name: 'surfaceStageLabel', label: 'Stage label' },
    ],
    [
      {
        type: 'array',
        name: 'items',
        label: 'Reach surfaces',
        fields: [
          { type: 'text', name: 'id', label: 'Id' },
          { type: 'text', name: 'index', label: 'Index' },
          { type: 'text', name: 'icon', label: 'Icon' },
          { type: 'text', name: 'color', label: 'Color' },
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'textarea', name: 'description', label: 'Description' },
          { type: 'text', name: 'outcome', label: 'Outcome' },
          { type: 'text', name: 'proof', label: 'Proof' },
          { type: 'text', name: 'metric', label: 'Metric' },
        ],
      },
    ],
    [
      ...sectionLayoutFields,
      {
        type: 'checkbox',
        name: 'showStage',
        label: 'Show stage',
        defaultValue: true,
      },
    ]
  ),
}

export const investorAskWidget: WidgetDefinition = {
  type: 'section.ask',
  label: 'Ask',
  webComponentKey: 'sections/ask',
  propsSchema: railOnly,
  defaultProps: () => defaultPropsForWidget('section.ask'),
  adminFields: tabsFields(
    [
      { type: 'text', name: 'askTitle', label: 'Title' },
      { type: 'textarea', name: 'askSupport', label: 'Support' },
      { type: 'text', name: 'askCta', label: 'CTA' },
      { type: 'text', name: 'askModalTitle', label: 'Modal title' },
      { type: 'textarea', name: 'askModalSupport', label: 'Modal support' },
      { type: 'text', name: 'askNameLabel', label: 'Name label' },
      { type: 'text', name: 'askNamePlaceholder', label: 'Name placeholder' },
      { type: 'text', name: 'askEmailLabel', label: 'Email label' },
      { type: 'text', name: 'askEmailPlaceholder', label: 'Email placeholder' },
      { type: 'text', name: 'askTypeLabel', label: 'Type label' },
      { type: 'text', name: 'askTypePlaceholder', label: 'Type placeholder' },
      { type: 'text', name: 'askNoteLabel', label: 'Note label' },
      { type: 'text', name: 'askNotePlaceholder', label: 'Note placeholder' },
      { type: 'text', name: 'askSubmit', label: 'Submit' },
      { type: 'text', name: 'askCancel', label: 'Cancel' },
    ],
    [
      {
        type: 'array',
        name: 'contactTypes',
        label: 'Contact types',
        fields: [
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'value', label: 'Value' },
        ],
      },
    ]
  ),
}
