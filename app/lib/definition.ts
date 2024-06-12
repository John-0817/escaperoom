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
  hint: string;
  isVisible: boolean;
  inInventory: boolean;
}


interface RenderMainPageProps {
  fakeItems: FakeItem[];
  realItems: RealItem[];
  prerequisiteItems: PrerequisiteItem[];
}

interface RenderComponentProps {
  fakeItems: FakeItem[];
  initialRealItems: RealItem[];
  initialPrerequisiteItems: PrerequisiteItem[];
}
  // Custom Timer State
interface TimerContextProps {
  time: number;
  sirenOn: boolean;
  formatTime: (time:number) => string;
  startTimer: () => void;
  timerSwitch: () => void;
}
  // Custom Inventory State
interface InventoryContextProps {
  inventory: (Partial<PrerequisiteItem> | null)[];
  itemOnHand: string;
  addToInventory: (item: Partial<PrerequisiteItem>) => void;
  removeItemFromInventory: (name: string) => void;
  selectItem: (item: string) => void;
}
  // Custom Modal State
interface ModalContextProps {
  isModalVisible: boolean;
  modalContent: React.ReactNode;
  showModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}
  // Modal Content - Real Item (Quiz)
interface QuizModalProps { 
  item: Quiz;
  isLast: boolean;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>
  setRealItems: React.Dispatch<React.SetStateAction<RealItem[]>>;
  setPrerequisiteItems: React.Dispatch<React.SetStateAction<PrerequisiteItem[]>>;
}
// Modal Content - Real Item (Click)
interface ClickModalProps { 
  item: Click;
  isLast: boolean;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>
  setRealItems: React.Dispatch<React.SetStateAction<RealItem[]>>;
  setPrerequisiteItems: React.Dispatch<React.SetStateAction<PrerequisiteItem[]>>;
}
// Modal Content - Real Item (Prerequisite)
interface PrerequisiteModalProps { 
  item: Prerequisite;
  isLast: boolean;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>
  setRealItems: React.Dispatch<React.SetStateAction<RealItem[]>>;
  setPrerequisiteItems: React.Dispatch<React.SetStateAction<PrerequisiteItem[]>>;
}
// Modal Content - Prerequisite Item
interface PrerequisiteItemProps {
  item: PrerequisiteItem;
  setPrerequisiteItems: React.Dispatch<React.SetStateAction<PrerequisiteItem[]>>;
}



// Create Room Interface

interface CreateRoomProps {
  
}