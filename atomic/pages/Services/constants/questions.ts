import { QuestionInterface } from 'atomic'

const questions: readonly [number, string, string, string][] = [
  [
    1,
    'What does it mean that Data Manager is open-source?',
    'It means that the source code is publicly available, and you can modify it to suit your needs.',
    'services',
  ],
  [
    2,
    "Can I use Data Manager's source code in my project?",
    'Yes, under the MIT license, you can use, modify, and distribute the code, provided you retain the original license information.',
    'services',
  ],
  [
    3,
    'What types of data can I store in Data Manager?',
    'We support various data formats, from CSV files to complex databases.',
    'services',
  ],
  [
    4,
    'Can I set storage limits in Data Manager?',
    'Yes, you can configure storage limits for users or projects through the admin panel.',
    'services',
  ],
  [
    5,
    'Does Data Manager support migration between systems?',
    'Yes, the tool facilitates migration across multiple platforms while maintaining data integrity.',
    'services',
  ],
  [
    6,
    'How does Data Manager handle large data during migration?',
    'The tool is optimized to handle large datasets using parallel processing techniques.',
    'services',
  ],
  [
    7,
    'What integrations are available?',
    'We offer pre-built integrations with popular systems such as SQL, REST APIs, and more.',
    'services',
  ],
  [
    8,
    'Do integrations require additional software?',
    'In most cases, integrations work natively without the need for additional tools.',
    'services',
  ],
  [
    9,
    'Can I visualize data in Data Manager?',
    'Yes, the tool includes advanced visualization options like charts and reports',
    'services',
  ],
  [
    10,
    'Can analyses be automated?',
    'Yes, Data Manager supports creating automated reports and alerts based on input data.',
    'services',
  ],
  [
    11,
    'How does the Page Builder in Data Manager work?',
    'The Page Builder enables easy creation of interactive pages for presenting data, without the need for coding.',
    'services',
  ],
  [
    12,
    'Can I customize Page Builder pages?',
    'Yes, we offer extensive customization options, including templates, custom CSS styles, and a WYSIWYG editor.',
    'services',
  ],
] as const

export const servicesQuestions: readonly QuestionInterface[] = questions.map(
  ([value, header, content, category]): QuestionInterface => ({
    value,
    header,
    content,
    category,
  })
)
