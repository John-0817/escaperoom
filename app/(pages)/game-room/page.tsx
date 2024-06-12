import { FakeItems,  RealItems, PrerequisiteItems } from '@/app/lib/asset';
import RenderMainPage from '@/app/components/game-room/GameRoom';

export default function page() {
  const fakeItems = FakeItems;
  const realItems = RealItems;
  const prerequisiteItems = PrerequisiteItems;

  return(
    <main className='grow flex flex-col'>
      <RenderMainPage fakeItems={fakeItems} realItems={realItems} prerequisiteItems={prerequisiteItems}/>
    </main>
  )
}