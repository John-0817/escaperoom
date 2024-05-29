import { FakeItems,  RealItems, PrerequisiteItems } from '../lib/asset'
import RenderMainPage from '../render/escape-room/main-page'

export default function page() {
  const fakeItems = FakeItems;
  const realItems = RealItems;
  const prerequisiteItems = PrerequisiteItems;

  return(
    <main className='grow flex flex-col'>
      <RenderMainPage fakeItems={fakeItems} initialRealItems={realItems} initialPrerequisiteItems={prerequisiteItems}/>
    </main>
  )
}