export default function QuizCountry() {
  return (
      <div>
        <div className="p-4 text-center text-gray-500">
          <div className="mb-2 text-xs">
            <strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
          </div>
          <div className="mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200" style={{ backgroundImage: `url(${quizData.selected.download_url})` }} />
          <ul>
            {quizData.shuffled.map((i, idx) => {
              return (
                <div key={i.country_eng_nm}>
                  <button type="button" className={`block w-full my-4 text-2xl text-center`} onClick={() => handleClick(i.country_eng_nm)}>
                    {i.country_nm}
                  </button>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    )
}