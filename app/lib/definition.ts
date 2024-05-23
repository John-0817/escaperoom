interface FakeItem {
  className: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  description: string;
}

interface RealItem {
  id: number;
  name: string;
  className: string;
  scr: string;
  width: number;
  height: number;
  alt: string;
  isVisible: boolean;
  isCorrect: boolean;
  description: string;
  conditionalDescription: string;
  type: 'quiz' | 'click' | 'prerequisite';
  ans: string;
  prerequisiteName: string | null;
  realTarget: number | null;
  prerequisiteTarget: number | null;
}

interface PrerequisiteItem {
  id: number;
  name: string;
  className: string;
  scr: string;
  width: number;
  height: number;
  alt: string;
  isVisible: boolean;
  inInventory: boolean;
  description: string;
}

interface FakeItemProps{
  src: string;
  width: number;
  height: number;
  alt: string;
  handleShowModalFake: () => void;
}

interface RealItemProps{
  src: string;
  width: number;
  height: number;
  alt: string;
  handleShowModalReal: () => void;
}

interface PrerequisiteItemProps{
  src: string;
  width: number;
  height: number;
  alt: string;
  handleShowModalPrerequisite: () => void;
}

interface RenderModalProps {
  isModalVisible: boolean;
  modalContent: React.ReactNode;
  closeModal: () => void;
}

interface RenderMainPageProps {
  fakeItems: FakeItem[];
  initialRealItems: RealItem[];
  initialPrerequisiteItems: PrerequisiteItem[];
}

interface RenderInventoryProps {
  inventory: (Partial<PrerequisiteItem> | null)[];
  itemOnHand: string;
  selectItem: (item: string) => void;
}

interface RenderComponentProps {
  fakeItems: FakeItem[];
  realItems: RealItem[];
  prerequisiteItems: PrerequisiteItem[];
  showModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  updateRealItem: (id: number, update: Partial<RealItem>) => void;
  updatePrerequisiteItem: (id: number, update: Partial<PrerequisiteItem>) => void;
  itemOnHand: string;
  addToInventory: (item: Partial<PrerequisiteItem>) => void;
  removeItemFromInventory: (name: string) => void;
}

interface QuizModalProps {
  content: string;
  isCorrect: boolean;
  userAnswer: React.RefObject<HTMLInputElement>;
  checkAnswer: () => void;
}

interface ClickModalProps {
  content: string;
  showNextItem: () => void;
}

interface PrerequisiteModalProps {
  content: string;
  checkPrerequisite: () => void;
}