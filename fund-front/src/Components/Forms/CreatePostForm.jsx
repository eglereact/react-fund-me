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

const defaultValues = {
  name: "",
};

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
        <div className="bg-white h-[100vh] w-2/3 rounded-l-[50px] flex flex-col justify-between">
          <div className=" p-20 flex flex-col gap-10">
            <input
              type="text"
              placeholder="Title"
              className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg"
            />
            <textarea
              placeholder="Your story"
              className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg "
            ></textarea>

            <input
              type="file"
              className="block w-full text-sm text-gray-900
              file:mr-4 file:py-2 file:px-4 file:rounded-md
              file:border-0 file:text-sm file:font-semibold
              file:bg-light file:text-white
              hover:file:cursor-pointer"
            />

            <input
              type="text"
              placeholder="Amount"
              className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg "
            />
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <div className="flex">
                    <input
                      type="checkbox"
                      id={`category-${cat.id}`}
                      className="peer hidden"
                    />
                    <label
                      for={`category-${cat.id}`}
                      class="select-none cursor-pointer rounded-full border-2 border-gray-300 py-2 px-4 font-bold text-gray-300 transition-colors 
                      duration-200 ease-in-out peer-checked:bg-green-50 peer-checked:text-light peer-checked:border-[#6DAC4F] "
                    >
                      {cat.category}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 p-20 border-t-2 border-t-gray-100  ">
            <button className="button-light">Create</button>
            <a href="#" className="button-empty cursor-pointer">
              Back home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostForm;
