import Navigation from "../components/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <div>
      <h1>페이지가 없습니다.</h1>
    </div>
  );
}
