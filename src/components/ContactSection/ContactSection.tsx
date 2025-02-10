import React from 'react';
import { Mail, Github, Linkedin, ArrowRight, Rocket, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm } from '#components/ContactSection/useForm.ts';
import { SocialLink } from '#types/common.ts';
import {
  sectionStyles,
  containerStyles,
  formInputStyles,
  socialLinkStyles,
  submitButtonStyles
} from './ContactSection.styles';

const ContactSection: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors
  } = useForm();

  return (
    <section id="contact-section" className={sectionStyles()}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={containerStyles()}>
            <div className="grid md:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo: React.FC = () => {
  const { t } = useTranslation();
  
  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Radio, href: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="text-neon-green w-6 h-6" />
        <h2 className="text-4xl font-bold">{t('contact:title')}</h2>
      </div>
      <p className="text-xl text-gray-400 mb-8">
        {t('contact:subtitle')}
      </p>
      
      <div className="space-y-6">
        <a
          href={`mailto:${t('contact:contact.email')}`}
          className="flex items-center text-gray-400 hover:text-neon-green transition-colors group"
        >
          <Mail className="mr-3 group-hover:animate-pulse" size={20} />
          {t('contact:contact.email')}
        </a>
        <div className="flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkStyles()}
              aria-label={link.label}
            >
              <link.icon size={20}/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  errors
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-green/50 to-tech-gray/50 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
      
      <div className="relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="name"
            label={t('contact:form.name.label')}
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name ? t('contact:form.name.error') : undefined}
            placeholder={t('contact:form.name.placeholder')}
          />
          <FormField
            id="email"
            label={t('contact:form.email.label')}
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email ? t('contact:form.email.error') : undefined}
            placeholder={t('contact:form.email.placeholder')}
          />
          <FormField
            id="message"
            label={t('contact:form.message.label')}
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            error={errors.message ? t('contact:form.message.error') : undefined}
            placeholder={t('contact:form.message.placeholder')}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={submitButtonStyles()}
          >
            {isSubmitting ? t('contact:form.submit.sending') : t('contact:form.submit.default')}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`${formInputStyles({ hasError: !!error })} h-32`}
        placeholder={placeholder}
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className={formInputStyles({ hasError: !!error })}
        placeholder={placeholder}
      />
    )}
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

export default React.memo(ContactSection);