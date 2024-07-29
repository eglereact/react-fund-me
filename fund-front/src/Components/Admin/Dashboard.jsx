import { useContext } from "react";
import { StatsContext } from "../../Contexts/Stats";
import Loading from "../Common/Loading";
import { FaUsers, FaFile, FaDonate, FaMoneyBillWave } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";

const Dashboard = () => {
  const { stats } = useContext(StatsContext);
  return (
    <>
      {stats === null && <Loading />}
      {stats !== null && (
        <section>
          <h1 className="text-4xl mb-10">Dashboard</h1>
          <div className="flex gap-10">
            <div className="bg-white shadow-sm center-all gap-4 p-10 rounded-lg">
              <FaUsers className="text-light text-5xl" />
              <div>
                <h3 className="text-xl">Users</h3>
                <h2 className="text-2xl font-bold">{stats.countUsers}</h2>
              </div>
            </div>
            <div className="bg-white shadow-sm center-all gap-4 p-10 rounded-lg">
              <FaFile className="text-light text-5xl" />
              <div>
                <h3 className="text-xl">Posts</h3>
                <h2 className="text-2xl font-bold">{stats.countPosts}</h2>
              </div>
            </div>
            <div className="bg-white shadow-sm center-all gap-4 p-10 rounded-lg">
              <FaDonate className="text-light text-5xl" />
              <div>
                <h3 className="text-xl">Donations</h3>
                <h2 className="text-2xl font-bold">{stats.countDonations}</h2>
              </div>
            </div>
            <div className="bg-white shadow-sm center-all gap-4 p-10 rounded-lg">
              <FaMoneyBillWave className="text-light text-5xl" />
              <div>
                <h3 className="text-xl">Donations collected</h3>
                <h2 className="text-2xl font-bold">
                  ${stats.totalMoneyCollected}
                </h2>
              </div>
            </div>
            <div className="bg-white shadow-sm center-all gap-4 p-10 rounded-lg">
              <GiStairsGoal className="text-light text-5xl" />
              <div>
                <h3 className="text-xl">Goal reached</h3>
                <h2 className="text-2xl font-bold">
                  {stats.countPostsGoalReached}
                </h2>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Dashboard;
