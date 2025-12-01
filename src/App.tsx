import Form from "./components/Form";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <section className="mx-auto max-w-[504px] space-y-6 py-10">
      <Header />
      <Form />
      <Toaster position="top-center" richColors />
    </section>
  );
}
