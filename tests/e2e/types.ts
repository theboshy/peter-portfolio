export interface TestData {
  user: {
    name: string;
    email: string;
    message: string;
  };
  languages: {
    english: string;
    spanish: string;
  };
  sections: {
    contact: string;
    expertise: string;
    projects: string;
  };
  viewports: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
}
