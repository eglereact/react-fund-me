import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { useEffect, useState } from "react";

const DonationsList = () => {
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_GET_DONATIONS
  );

  const [donations, setDonations] = useState(null);

  useEffect(() => {
    doGet();
  }, [doGet]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setDonations(serverGetResponse.data.donations ?? null);
  }, [serverGetResponse]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format: Month DD, YYYY HH:mm:ss
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} ${("0" + date.getHours()).slice(
      -2
    )}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(
      -2
    )}`;

    return formattedDate;
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-10">Donations</h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Donor Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Post name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {donations === null && (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
                {donations !== null &&
                  donations.map((don) => (
                    <tr key={don.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize">
                        {don.sponsorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {don.donationAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {don.postTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium gap-2 flex justify-end">
                        {formatDate(don.created_at)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DonationsList;
