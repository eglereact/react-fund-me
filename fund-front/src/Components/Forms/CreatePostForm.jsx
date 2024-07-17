const categories = [
  { id: 1, category: "Animals" },
  { id: 2, category: "Business" },
  { id: 3, category: "Community" },
  { id: 4, category: "Competitions" },
  { id: 5, category: "Creative" },
  { id: 6, category: "Education" },
  { id: 7, category: "Emergencies" },
  { id: 8, category: "Environment" },
  { id: 9, category: "Events" },
  { id: 10, category: "Faith" },
  { id: 11, category: "Family" },
  { id: 12, category: "Funerals & Memorials" },
  { id: 13, category: "Medical" },
  { id: 14, category: "Monthly Bills" },
  { id: 15, category: "Newlyweds" },
  { id: 16, category: "Other" },
  { id: 17, category: "Sports" },
  { id: 18, category: "Travel" },
  { id: 19, category: "Ukraine Relief" },
  { id: 20, category: "Volunteer" },
  { id: 21, category: "Wishes" },
];

const CreatePostForm = () => {
  return (
    <div className="bg-light-grey w-full  h-[100vh]">
      <div className="max-w-[1920px] flex">
        <div className="h-[100vh] w-1/3 text-dark flex justify-center ml-32 flex-col gap-10">
          <h1 className="font-bold text-5xl max-w-[500px]">
            Let's begin your fundraising journey
          </h1>
          <p className="text-lg">Please fill the form with all the details!</p>
        </div>
        <div className="bg-white h-[100vh] w-2/3 rounded-l-[50px]">
          <div className="bg-gray-100 p-20 flex flex-col gap-4">
            <input type="text" placeholder="title" />
            <textarea placeholder="your story"></textarea>
            <input type="file" />
            <input type="text" placeholder="amount" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="category"
                    id={`category-${cat.id}`}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label
                    htmlFor={`category-${cat.id}`}
                    className="text-gray-700"
                  >
                    {cat.category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostForm;
