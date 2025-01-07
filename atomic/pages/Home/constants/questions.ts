import { QuestionInterface } from 'atomic'

const questions: readonly [number, string, string, string][] = [
  [
    1,
    'What is Data Manager?',
    'Data Manager is a versatile tool for managing data, supporting migration, integration, and analysis across various environments.',
    'home',
  ],
  [
    2,
    'Is Data Manager free?',
    'Yes, Data Manager is an open-source project available to everyone.',
    'home',
  ],
  [
    3,
    'Can I use Data Manager without technical knowledge?',
    'Absolutely! The interface is designed to be simple and intuitive, and the available resources will help you get started.',
    'home',
  ],
  [
    4,
    'Is Data Manager safe to use?',
    'Yes, Data Manager is designed with data security in mind and includes encryption mechanisms and access control features.',
    'home',
  ],
  [
    5,
    'Does Data Manager work on different platforms?',
    'Yes, the application is compatible with Windows, macOS, and Linux, and also offers a web version.',
    'home',
  ],
  [
    6,
    'Can I use Data Manager in business environments?',
    'Of course! The tool is well-suited for both small and large enterprises.',
    'home',
  ],
] as const

export const homeQuestions: readonly QuestionInterface[] = questions.map(
  ([value, header, content, category]): QuestionInterface => ({
    value,
    header,
    content,
    category,
  })
)
