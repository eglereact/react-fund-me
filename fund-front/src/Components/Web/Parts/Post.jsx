import { BiHappyBeaming } from "react-icons/bi";

const Post = ({ post }) => {
  const progress = Math.min((post.amountRaised / post.moneyGoal) * 100, 100);

  if (post.amountRaised === post.moneyGoal) {
    return (
      <div
        className="p-6 bg-white shadow-md rounded-md mb-4 border-4
       border-[#6DAC4FFF] relative"
      >
        <div className="bg-light absolute top-0 px-5 py-2 left-0 text-white font-bold rounded-br-lg ">
          <p className="center-all gap-2 text-lg">
            Thank You <BiHappyBeaming size={30} />
          </p>
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-xl font-bold mt-4 text-dark">{post.title}</h2>
        <p className="text-gray-900 mt-2 pb-4">{post.shortText}</p>
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2 relative">
            <div
              className="absolute top-2 -m-10 flex flex-col items-center "
              style={{ left: `${progress + 2}%` }}
            >
              <div className="bg-light rounded text-white  p-1 text-xs ">
                {progress}%
              </div>
              <div class="w-0 h-0 border-l-[5px] border-l-transparent border-t-[7px] border-t-[#6DAC4FFF] border-r-[5px] border-r-transparent"></div>
            </div>
            <div
              className="bg-light h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-900 mt-2 text-lg">
            Goal:{" "}
            <span className="text-dark font-bold">${post.moneyGoal} </span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="p-6 bg-white shadow-md rounded-md mb-4 border-2 w-full
       border-white flex gap-10"
      >
        <div className="w-2/3 flex flex-col gap-3">
          <h2 className="text-2xl font-bold mt-4 text-dark">{post.title}</h2>
          <p className="text-gray-900 mt-2 pb-4">{post.shortText}</p>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2 relative">
              <div
                className="absolute top-2 -m-10 flex flex-col items-center "
                style={{ left: `${progress + 3}%` }}
              >
                <div className="bg-light rounded text-white  p-1 text-xs ">
                  {progress}%
                </div>
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[7px] border-t-[#6DAC4FFF] border-r-[5px] border-r-transparent"></div>
              </div>
              <div
                className="bg-light h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-900 mt-2 text-lg">
              Goal:{" "}
              <span className="text-dark font-bold">${post.moneyGoal} </span>
            </p>
          </div>
          <div className="py-2 flex gap-2">
            <a href="/#login" className="button-light rounded-full">
              Donate
            </a>
            <a href="/#" className="button-empty rounded-full">
              More
            </a>
          </div>
        </div>
        <div className="w-1/3">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover rounded-md"
          />
        </div>
      </div>
    );
  }
};
export default Post;
