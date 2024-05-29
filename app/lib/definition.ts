// Escape Room Interface

  // Fake Item
interface FakeItem {
  src: string;
  dx: number;
  dy: number;
  width: number;
  height: number;
  description: string;
}

  // Real Item (Base Case)
interface BaseItem {
  id: number;
  name: string;
  src: string;
  dx: number;
  dy: number;
  width: number;
  height: number;
  isVisible: boolean;
  isCorrect: boolean;
  hint: string;
  completionMessage: string;
  unlockedPrerequisite: number | null;
}
  // Real Item (Type: Quiz)
interface Quiz extends BaseItem {
  type: 'quiz';
  answer: string;
}
  // Real Item (Type: Click)
interface Click extends BaseItem {
  type: 'click';
}
  // Real Item (Type: Prerequisite)
interface Prerequisite extends BaseItem {
  type: 'prerequisite';
  prerequisiteItem: string;
}
  // Real Item (Integrate)
type RealItem = Quiz | Click | Prerequisite;

  // Prerequisite Item
interface PrerequisiteItem {
  id: number;
  name: string;
  src: string;
  dx: number;
  dy: number;
  width: number;
  height: number;
  description: string;
  isVisible: boolean;
  inInventory: boolean;
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

// Create Room Interface

interface CreateRoomProps {
  
}