import { FakeItems, RealItems } from '../lib/asset'
import RenderMainPage from '../render/main-page'

export default function page() {
  const fakeItems = FakeItems;
  const realItems = RealItems;

  return(
    <main className='grow flex flex-col'>
      <RenderMainPage fakeItems={fakeItems} initialRealItems={realItems}/>
    </main>
  )
}