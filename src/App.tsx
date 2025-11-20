import CardModal from "./components/CardModal";
import Form from "./components/Form";
import Header from "./components/Header";

export default function App() {
  return (
    <section className="mx-auto max-w-[504px] space-y-6 py-10">
      <Header />
      <Form />
      <CardModal />
    </section>
  );
}
