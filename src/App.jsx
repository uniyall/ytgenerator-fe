import { useState } from "react";
import Modal from "./Modal";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const initdata = await fetch(
      "https://ytgenerator.onrender.com/generate_title_and_description",
      {
        method: "POST",
        body: JSON.stringify({
          keyword: keyword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await initdata.json();
    setTitle(data["title"]);
    setDesc(data["description"]);
    setIsLoading(false);
    setShowDialog(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
          ytGenerator
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            name="keyword"
            placeholder="Enter Keyword"
            onChange={handleChange}
            value={keyword}
            className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-full max-w-md"
          />
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition duration-300 hover:bg-red-700"
          >
            {isLoading ? "Generating..." : "Generate!"}
          </button>
        </form>
        {isLoading && <div className="text-center mt-4">Loading...</div>}
      </div>
      {showDialog && (
        <Modal open={showDialog} onClose={() => setShowDialog(false)}>
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Title Options:</h2>
            <p className="mb-4">{title}</p>
            <h2 className="font-bold text-lg mb-2">Description:</h2>
            <p>{desc}</p>
          </div>
        </Modal>
      )}
      <a
        className="fixed bottom-5 left-0 right-0 text-center"
        href="https://github.com/Jeet-beep"
        target="_blank"
      >
        <p className="text-black text-[14px]">
          Made with ❤️ by Charanjeet Singh
        </p>
      </a>
    </div>
  );
}

export default App;
