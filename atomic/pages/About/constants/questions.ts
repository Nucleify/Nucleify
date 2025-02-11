import { QuestionInterface } from 'atomic'

const questions: readonly [number, string, string, string][] = [
  [
    1,
    'Why was Data Manager created?',
    'Our goal was to create a tool that simplifies data management for both experts and beginners.',
    'about',
  ],
  [
    2,
    'What are the future plans for Data Manager?',
    'We plan to introduce new features, such as AI integration and enhanced reporting capabilities',
    'about',
  ],
  [
    3,
    'What problems does Data Manager solve?',
    'It enables efficient data migration, integration, and analysis, eliminating technical barriers.',
    'about',
  ],
  [
    4,
    'What industries can benefit from using Data Manager?',
    'The tool is versatile and can be used in industries such as finance, education, logistics, healthcare, and many others.',
    'about',
  ],
  [
    5,
    'Can I contribute to the development of Data Manager?',
    'Absolutely! We welcome developers, designers, and testers. Any contribution is appreciated.',
    'about',
  ],
  [
    6,
    'Can I suggest new features?',
    'Yes, we encourage you to submit suggestions via our GitHub repository or through the contact form.',
    'about',
  ],
  [
    7,
    'How can I support the project?',
    'You can support us through donations, reporting bugs, or actively participating in the development of the project.',
    'about',
  ],
  [
    8,
    'Under which license does Data Manager operate?',
    'The project is available under the MIT license, offering flexibility in its use.',
    'about',
  ],
  [
    9,
    'Does the MIT license mean I can use the tool commercially?',
    'Yes, the MIT license allows for commercial use without additional fees or licenses.',
    'about',
  ],
  [
    10,
    'Do you offer technical support?',
    'Yes, we offer technical support via email, online documentation, and a user community.',
    'about',
  ],
  [
    11,
    'Is Data Manager available in multiple languages?',
    'Yes, we plan to expand support to multiple languages to make the tool accessible to users worldwide.',
    'about',
  ],
  [
    12,
    'How can I contact the team?',
    'You can reach us via the contact form on the website or by email at support@datamanager.com',
    'about',
  ],
] as const

export const aboutQuestions: readonly QuestionInterface[] = questions.map(
  ([index, content, answer, category]): QuestionInterface => ({
    index,
    content,
    answer,
    category,
  })
)
