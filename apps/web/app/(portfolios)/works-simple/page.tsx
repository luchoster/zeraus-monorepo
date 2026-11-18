import { redirect } from "next/navigation";

/** Legacy Rayo path — Our work now lives at /our-work. */
export default function WorksSimpleRedirect() {
  redirect("/our-work");
}
