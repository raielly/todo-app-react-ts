import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TodoCard from "./components/TodoCard";

function App() {
  return (
    <>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <TodoCard />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
