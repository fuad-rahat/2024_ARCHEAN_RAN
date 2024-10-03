import Link from 'next/link';

// Function to fetch the data
async function fetchData() {
  const res = await fetch('http://localhost:3000/data.json');
  return res.json();
}

// Component to display the data details
export default async function DataDetails({ params }) {
  const data = await fetchData(); // Fetch data from the JSON
  const currentId = parseInt(params.id); // Get the ID from params

  const currentItem = data.find((item) => item.id === currentId); // Find the current item based on ID
  const prevId = currentId === 1 ? data.length : currentId - 1; // Calculate the previous ID
  const nextId = currentId === data.length ? 1 : currentId + 1; // Calculate the next ID

  return (
    <div>
      <h1>{currentItem.name}</h1>
      <p>{currentItem.description}</p>
      <img src={`/${currentItem.image}`} alt={currentItem.name} width="200" />

      <div className="flex justify-between mt-4">
        {/* Link to the previous item */}
        <Link href={`/live-world/all/${prevId}`}>
          <button className="p-2 bg-gray-300">Previous</button>
        </Link>

        {/* Link to the next item */}
        <Link href={`/live-world/all/${nextId}`}>
          <button className="p-2 bg-gray-300">Next</button>
        </Link>
      </div>
    </div>
  );
}
