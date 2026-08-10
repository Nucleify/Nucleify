import { z } from 'zod'
import type { IrDocument } from './types'

const irBinaryOpSchema = z.enum([
  '==',
  '!=',
  '===',
  '!==',
  '&&',
  '||',
  '+',
  '-',
  '*',
  '/',
  '<',
  '<=',
  '>',
  '>=',
])

const irExprSchema: z.ZodType<import('./types').IrExpr> = z.lazy(() =>
  z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('literal'),
      value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
    }),
    z.object({
      kind: z.literal('ident'),
      name: z.string().min(1),
    }),
    z.object({
      kind: z.literal('member'),
      object: irExprSchema,
      property: z.string().min(1),
    }),
    z.object({
      kind: z.literal('binary'),
      op: irBinaryOpSchema,
      left: irExprSchema,
      right: irExprSchema,
    }),
    z.object({
      kind: z.literal('call'),
      callee: irExprSchema,
      args: z.array(irExprSchema),
    }),
    z.object({
      kind: z.literal('object'),
      properties: z.array(
        z.object({
          key: z.string().min(1),
          value: irExprSchema,
        }),
      ),
    }),
  ]),
)

const irStmtSchema: z.ZodType<import('./types').IrStmt> = z.lazy(() =>
  z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('expr'),
      value: irExprSchema,
    }),
    z.object({
      kind: z.literal('assign'),
      target: irExprSchema,
      value: irExprSchema,
    }),
    z.object({
      kind: z.literal('return'),
      value: irExprSchema.optional(),
    }),
  ]),
)

const irPropSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['string', 'number', 'boolean', 'unknown']),
  optional: z.boolean().optional(),
  default: z.unknown().optional(),
})

const irStateSchema = z.object({
  name: z.string().min(1),
  initial: irExprSchema,
})

const irDerivedSchema = z.object({
  name: z.string().min(1),
  from: irExprSchema,
})

const irHandlerSchema = z.object({
  name: z.string().min(1),
  params: z.array(z.string()),
  body: z.array(irStmtSchema),
})

const irAttrSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('static'),
    name: z.string().min(1),
    value: z.union([z.string(), z.boolean(), z.number()]),
  }),
  z.object({
    kind: z.literal('bind'),
    name: z.string().min(1),
    value: irExprSchema,
  }),
  z.object({
    kind: z.literal('event'),
    name: z.string().min(1),
    handler: z.string().min(1),
  }),
])

const irNodeSchema: z.ZodType<import('./types').IrNode> = z.lazy(() =>
  z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('element'),
      tag: z.string().min(1),
      props: z.array(irAttrSchema),
      children: z.array(irNodeSchema),
    }),
    z.object({
      kind: z.literal('text'),
      value: z.string(),
    }),
    z.object({
      kind: z.literal('expr'),
      value: irExprSchema,
    }),
    z.object({
      kind: z.literal('if'),
      test: irExprSchema,
      then: z.array(irNodeSchema),
      else: z.array(irNodeSchema).optional(),
    }),
    z.object({
      kind: z.literal('for'),
      source: irExprSchema,
      item: z.string().min(1),
      index: z.string().min(1).optional(),
      body: z.array(irNodeSchema),
    }),
    z.object({
      kind: z.literal('slot'),
      children: z.array(irNodeSchema).optional(),
    }),
    z.object({
      kind: z.literal('component'),
      name: z.string().min(1),
      props: z.array(irAttrSchema),
      children: z.array(irNodeSchema),
    }),
  ]),
)

export const irDocumentSchema: z.ZodType<IrDocument> = z.object({
  irVersion: z.literal('0.1.0'),
  name: z.string().min(1),
  portable: z.literal(true),
  props: z.array(irPropSchema),
  state: z.array(irStateSchema),
  derived: z.array(irDerivedSchema),
  handlers: z.array(irHandlerSchema),
  template: irNodeSchema,
  styles: z
    .object({
      css: z.string().optional(),
    })
    .optional(),
  meta: z
    .object({
      sourcePath: z.string().optional(),
    })
    .optional(),
})

export function parseIrDocument(data: unknown): IrDocument {
  return irDocumentSchema.parse(data)
}

export {
  irAttrSchema,
  irExprSchema,
  irHandlerSchema,
  irNodeSchema,
  irPropSchema,
  irStmtSchema,
}
