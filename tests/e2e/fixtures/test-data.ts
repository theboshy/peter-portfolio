import type { TestData } from '../types';

export const testData: TestData = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Test message'
  },
  languages: {
    english: 'English',
    spanish: 'Español (CO)'
  },
  sections: {
    contact: '#contact-section',
    expertise: '#expertise',
    projects: '#projects'
  },
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 }
  }
};