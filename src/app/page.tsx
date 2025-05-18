import IconGameNation from '@/assets/images/icon_game_nation.svg'

export default async function Home() {
  return (
    <main id="main">        
      <div className="p-8">
        <ul className="flex gap-2">
          <li className="w-[25%]">
            <button type="button">
              <img src={IconGameNation.src} alt="IconGameNation" />
              <span className="block mt-2">
                나라 맞추기
              </span>
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
