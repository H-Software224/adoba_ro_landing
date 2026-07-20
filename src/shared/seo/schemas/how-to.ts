export interface HowToStepInput {
  name: string
  text: string
}

export function howToSchema(params: { name: string; description?: string; steps: HowToStepInput[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  }
}
