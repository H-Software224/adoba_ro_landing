'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const FIELD_KEYS = ['company', 'contactName', 'email', 'phone'] as const
const FIELD_NAME: Record<(typeof FIELD_KEYS)[number], string> = {
  company: 'company',
  contactName: 'name',
  email: 'email',
  phone: 'phone',
}

export function ContactForm() {
  const t = useTranslations('enterprise.contact')
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <form
        id="ccForm"
        action="https://formsubmit.co/sjpark@adoba.net"
        method="POST"
        target="ccHiddenFrame"
        onSubmit={() => setSubmitted(true)}
        className="flex w-full max-w-[744px] flex-col gap-8"
      >
        <input type="hidden" name="_subject" value="adobaRo Enterprise 문의" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <div className="grid gap-8 sm:grid-cols-2">
          {FIELD_KEYS.map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <label htmlFor={key} className="text-b3 text-white">
                {t(`fields.${key}.label`)}
              </label>
              <input
                id={key}
                name={FIELD_NAME[key]}
                type={key === 'email' ? 'email' : 'text'}
                required
                placeholder={t(`fields.${key}.placeholder`)}
                className="h-14 border-b border-white/60 bg-transparent px-2 py-2.5 text-b2 text-white placeholder:text-white/60 focus:border-white focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-b3 text-white">
            {t('fields.message.label')}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={3}
            placeholder={t('fields.message.placeholder')}
            className="resize-none border-b border-white/60 bg-transparent px-2 py-2.5 text-b2 text-white placeholder:text-white/60 focus:border-white focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="h-14 w-60 rounded-full bg-enterprise-accent-deep text-b3 font-semibold text-white transition-colors hover:bg-enterprise-indigo-700"
        >
          {t('submit')}
        </button>

        {submitted && <p className="text-b3 text-white">{t('success')}</p>}
      </form>
      <iframe name="ccHiddenFrame" title="" className="hidden" />
    </>
  )
}
