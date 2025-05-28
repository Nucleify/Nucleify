export interface CardBoxItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface AdCardBoxesProps {
  items: CardBoxItem[];
  className?: string;
}
