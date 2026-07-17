import { redirect } from "next/navigation";

// Concepts (lessons) are the core loop — translation lives at /translate.
export default function Home() {
  redirect("/concepts");
}
