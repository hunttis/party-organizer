export interface Question {
  orderNumber: string;
  text: { [key:string ]:string};
  choices: { [key: string]: Choice};
  shouldHaveFreeTextField: boolean;
}

interface Choice {
  fi: string;
  en: string;
}
