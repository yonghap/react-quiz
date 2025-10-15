import React from "react";
import ResultPage from "@/components/Result";
import { Suspense } from "react";

export default async function Quiz() {
  return (
    <Suspense
      fallback={<div className="text-center py-5">결과를 불러오는 중...</div>}
    >
      <div>
        <ResultPage></ResultPage>
      </div>
    </Suspense>
  );
}
